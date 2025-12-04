import { useForm } from "@tanstack/react-form"
import { sendFileFormSchema, type SendFileFormValues } from "@/utils/schemas/send"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/forms"
import { Dropzone } from "@/components/ui/dropzone"
import { useState } from "react"
import { MultiSelectCombobox } from "@/components/ui/multiselect-combobox"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const EXPIRATION_OPTIONS = {
    "1_hour": "1 Hour",
    "1_day": "1 Day",
    "7_days": "7 Days",
    "1_month": "1 Month",
    burn_on_read: "Burn on Read",
    never: "Never",
}

const SEND_AS_OPTIONS = {
    primary_key_placeholder: "Primary Key (Placeholder)",
    secondary_key_placeholder: "Secondary Key (Placeholder)",
}

export const SendFileForm = () => {
    const [existingRecipients] = useState([
        { value: "550e8400-e29b-41d4-a716-446655440000", label: "John Doe" },
        { value: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", label: "Jane Smith" },
    ])

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
        onSubmit: async ({ value }) => {
            console.log("success", value)
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
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field>
                                <FieldLabel>Files</FieldLabel>
                                <Dropzone
                                    value={field.state.value}
                                    onChange={(files) => field.handleChange(files)}
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
                                        {Object.entries(SEND_AS_OPTIONS).map(([value, label]) => (
                                            <NativeSelectOption key={value} value={value}>
                                                {label}
                                            </NativeSelectOption>
                                        ))}
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

                <Button type="submit">
                    <Lock />
                    Encrypt & Send
                </Button>
            </FieldGroup>
        </form>
    )
}
