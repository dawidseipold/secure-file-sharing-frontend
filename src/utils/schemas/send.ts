import * as v from "valibot"
import { MAX_TOTAL_BYTES } from "@/constants/files.ts"

export const recipientsSchema = v.pipe(
    v.array(v.string()),
    v.minLength(1, "You must send to at least one person"),
    v.maxLength(2, "You can only send to two people at a time"),
)

export const filesSchema = v.pipe(
    v.array(
        v.pipe(
            v.file("Invalid file"),
            v.maxSize(MAX_TOTAL_BYTES, "Each file must be smaller than 10MB"),
        ),
        "Files must be an array of File objects",
    ),
    v.minLength(1, "You must upload at least one file"),
    v.maxLength(1, "You can only upload one file at a time"),
)

export const expirationSchema = v.picklist(
    ["1_hour", "1_day", "7_days", "1_month", "burn_on_read", "never"],
    "Invalid expiration option selected",
)

export const sendAsSchema = v.picklist(
    ["primary_key_placeholder", "secondary_key_placeholder"],
    "You must select a key to send with",
)

export const noteSchema = v.pipe(
    v.string(),
    v.maxLength(256, "The note cannot exceed 256 characters"),
)

export const sendFileFormSchema = v.object({
    recipients: recipientsSchema,
    files: filesSchema,
    expiration: expirationSchema,
    sendAs: sendAsSchema,
    note: v.optional(noteSchema),
})

export type SendFileFormValues = v.InferInput<typeof sendFileFormSchema>
