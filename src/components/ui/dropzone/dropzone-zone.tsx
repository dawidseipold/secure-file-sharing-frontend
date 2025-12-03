import { Upload } from "lucide-react"
import React, { type FC, type RefObject } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { MEGABYTES_MULTIPLIER } from "@/constants/files.ts"

const dropzoneZoneVariants = tv({
    slots: {
        root: "px-6",
        box: "border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer",
        iconWrapper: "mb-2 bg-muted rounded-full p-3",
        icon: "h-5 w-5 text-muted-foreground",
        title: "text-sm font-medium text-foreground",
        subtitle: "text-sm text-muted-foreground mt-1",
        browseLabel: "text-primary hover:text-primary/90 font-medium cursor-pointer",
        fileInput: "hidden",
    },
})

interface DropzoneZoneProps extends VariantProps<typeof dropzoneZoneVariants> {
    fileInputRef: RefObject<HTMLInputElement | null>
    handleBoxClick: () => void
    handleDragOver: (e: React.DragEvent) => void
    handleDrop: (e: React.DragEvent) => void
    handleFileSelect: (files: FileList | null) => void
}

export const DropzoneZone: FC<DropzoneZoneProps> = ({
    fileInputRef,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    ...variantProps
}) => {
    const { root, box, iconWrapper, icon, title, subtitle, browseLabel, fileInput } =
        dropzoneZoneVariants(variantProps)

    return (
        <div className={cn(root())}>
            <div
                className={cn(box())}
                onClick={handleBoxClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className={cn(iconWrapper())}>
                    <Upload className={cn(icon())} />
                </div>

                <p className={cn(title())}>Upload a project image</p>
                <p className={cn(subtitle())}>
                    <span>or,</span>

                    <label
                        htmlFor="fileUpload"
                        className={cn(browseLabel())}
                        onClick={(e) => e.stopPropagation()}
                    >
                        click to browse
                    </label>

                    <span>({MEGABYTES_MULTIPLIER}MB max)</span>
                </p>

                <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    className={cn(fileInput())}
                    accept="*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
            </div>
        </div>
    )
}
