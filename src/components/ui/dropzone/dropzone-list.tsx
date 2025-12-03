import { type FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { DropzoneItem } from "@/components/ui/dropzone/dropzone-item"

const dropzoneListVariants = tv({
    slots: {
        root: "px-6 pb-5 space-y-3 mt-4",
    },
})

interface DropzoneListProps extends VariantProps<typeof dropzoneListVariants> {
    uploadedFiles: File[]
    fileProgresses: Record<string, number>
    removeFile: (filename: string) => void
}

export const DropzoneList: FC<DropzoneListProps> = ({
    uploadedFiles,
    fileProgresses,
    removeFile,
    ...variantProps
}) => {
    if (uploadedFiles.length === 0) {
        return null
    }

    const { root } = dropzoneListVariants(variantProps)

    return (
        <div className={cn(root())}>
            {uploadedFiles.map((file, index) => (
                <DropzoneItem
                    key={file.name + index}
                    file={file}
                    progress={fileProgresses[file.name] || 0}
                    onRemove={removeFile}
                />
            ))}
        </div>
    )
}
