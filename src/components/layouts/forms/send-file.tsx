import { useForm } from "@tanstack/react-form"
import { sendFileFormSchema, type SendFileFormValues } from "@/utils/schemas/send"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/forms"
import { Dropzone } from "@/components/ui/dropzone"
import { useState } from "react"
import { MultiSelectCombobox } from "@/components/ui/multiselect-combobox"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Loader, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getKey, uploadFile } from "@/utils/api/endpoints.ts"
import { useMutation } from "@tanstack/react-query"
import { useIdentity } from "@/hooks/useIdentity.ts"
import { encryptFileForMultipleRecipients } from "@/utils/crypto/hybrid.ts"

const EXPIRATION_OPTIONS = {
    "1_hour": "1 Hour",
    "1_day": "1 Day",
    "7_days": "7 Days",
    "1_month": "1 Month",
    burn_on_read: "Burn on Read",
    never: "Never",
}

type RecipientOption = { value: string; label: string }

export const SendFileForm = () => {
    const { userId } = useIdentity()
    const [uploadProgress, setUploadProgress] = useState(0)

    const [existingRecipients] = useState<RecipientOption[]>(() => {
        const initialRecipients: RecipientOption[] = [
            { value: "592b461a-f9ec-4480-8585-9b9fcd2a6849", label: "Test" },
        ]
        if (userId) {
            initialRecipients.unshift({ value: userId, label: "Me (Self-Test)" })
        }
        return initialRecipients
    })

    const uploadMutation = useMutation({
        mutationFn: async (values: SendFileFormValues) => {
            setUploadProgress(0)

            if (!userId) throw new Error("You need to create your identity before sending a file")
            if (values.files.length === 0) throw new Error("Select at least one file")
            if (values.recipients.length === 0) throw new Error("Select at least one recipient")

            const recipientKeys = await Promise.all(
                values.recipients.map(async (id) => {
                    try {
                        const response = await getKey(id)
                        return { userId: id, publicKeyPEM: response.key }
                    } catch (error) {
                        console.log(error)
                        throw new Error(`Recipient with ID: ${id} doesn't exist`)
                    }
                }),
            )

            const { encryptedBlob, metadata } = await encryptFileForMultipleRecipients(
                values.files[0],
                recipientKeys,
                userId,
                values.expiration,
                values.note,
            )

            const formData = new FormData()
            formData.append("file", encryptedBlob)
            formData.append("metadata", JSON.stringify(metadata))

            const response = await uploadFile(formData, (percent) => {
                setUploadProgress(percent)
            })

            return response.file_id
        },
        onError: (error) => {
            console.error("Upload error: ", error)
            alert("Error occurred: " + (error as Error).message)
            setUploadProgress(0)
        },
    })

    const defaultValues: SendFileFormValues = {
        recipients: [],
        files: [],
        expiration: "7_days",
        sendAs: "primary_key_placeholder",
        note: "",
    }

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: sendFileFormSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            uploadMutation.mutate(value, {
                onSuccess: (fileId) => {
                    console.log("Upload success! File ID: ", fileId)
                    formApi.reset()
                    setUploadProgress(0)
                },
            })
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit().then(() => {})
            }}
        >
            <FieldGroup>
                <form.Field
                    name="recipients"
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field>
                                <FieldLabel>Recipients</FieldLabel>
                                <MultiSelectCombobox
                                    options={existingRecipients}
                                    value={field.state.value}
                                    onChange={(recipients) => field.handleChange(recipients)}
                                    placeholder="Search or add recipients..."
                                />
                                <FieldDescription>
                                    Choose who you want to send the file to.
                                </FieldDescription>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                />

                <form.Field
                    name="files"
                    children={(field) => {
                        const currentFile = field.state.value[0]
                        const showProgress =
                            uploadMutation.isPending && currentFile && uploadProgress > 0
                        const progressMap = showProgress
                            ? { [currentFile.name]: uploadProgress }
                            : {}

                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                        return (
                            <Field>
                                <FieldLabel>Files</FieldLabel>
                                <Dropzone
                                    value={field.state.value}
                                    onChange={(files) => field.handleChange(files)}
                                    progressMap={progressMap}
                                />
                                <FieldDescription>Add the files you want to send.</FieldDescription>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                />

                <div className="flex w-full flex-col gap-6 sm:flex-row">
                    <form.Field
                        name="expiration"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field className="w-full">
                                    <FieldLabel>Expiration Time</FieldLabel>
                                    <NativeSelect
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(
                                                e.target.value as SendFileFormValues["expiration"],
                                            )
                                        }
                                    >
                                        {Object.entries(EXPIRATION_OPTIONS).map(
                                            ([value, label]) => (
                                                <NativeSelectOption key={value} value={value}>
                                                    {label}
                                                </NativeSelectOption>
                                            ),
                                        )}
                                    </NativeSelect>
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />

                    <form.Field
                        name="sendAs"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field className="w-full">
                                    <FieldLabel>Send As</FieldLabel>
                                    <NativeSelect
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(
                                                e.target.value as SendFileFormValues["sendAs"],
                                            )
                                        }
                                    >
                                        {existingRecipients.map(({ value, label }) => {
                                            return (
                                                <NativeSelectOption key={value} value={value}>
                                                    {label}
                                                </NativeSelectOption>
                                            )
                                        })}
                                    </NativeSelect>
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />
                </div>

                <form.Field
                    name="note"
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field>
                                <FieldLabel>Encrypted Note (Optional)</FieldLabel>
                                <Textarea
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Include a secure message..."
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                />

                <Button type="submit" disabled={uploadMutation.isPending}>
                    <Lock className="mr-2 h-4 w-4" />
                    {uploadMutation.isPending ? (
                        <Loader className="animate-spin" />
                    ) : (
                        "Encrypt & Send"
                    )}
                </Button>
            </FieldGroup>
        </form>
    )
}
