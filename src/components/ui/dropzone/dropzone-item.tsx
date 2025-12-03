import { Button } from "@/components/ui/button"
import {
    File as FileIcon,
    FileArchive,
    FileAudio,
    FileCode,
    FileSpreadsheet,
    FileText,
    FileVideo,
    Trash2,
} from "lucide-react"
import { type FC, useEffect } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/utils/styles"

const dropzoneItemVariants = tv({
    slots: {
        root: "border border-border rounded-lg p-2 flex flex-col",
        mainRow: "flex items-center gap-2",
        previewWrapper:
            "w-18 h-14 bg-muted rounded-sm flex items-center justify-center self-start row-span-2 overflow-hidden",
        previewImage: "w-full h-full object-cover",
        content: "flex-1 pr-1",
        headerRow: "flex justify-between items-center",
        fileMeta: "flex items-center gap-2",
        fileName: "text-sm text-foreground truncate max-w-[250px]",
        fileSize: "text-sm text-muted-foreground whitespace-nowrap",
        progressRow: "flex items-center gap-2",
        progressTrack: "h-2 bg-muted rounded-full overflow-hidden flex-1",
        progressBar: "h-full bg-primary",
        progressText: "text-xs text-muted-foreground whitespace-nowrap",
    },
})

interface DropzoneItemProps extends VariantProps<typeof dropzoneItemVariants> {
    file: File
    progress: number
    onRemove: (filename: string) => void
}

const renderFileIcon = (mimeType: string) => {
    const iconClass = "h-8 w-8 text-muted-foreground"

    if (mimeType.startsWith("video/")) return <FileVideo className={iconClass} />
    if (mimeType.startsWith("audio/")) return <FileAudio className={iconClass} />
    if (mimeType.startsWith("text/")) return <FileText className={iconClass} />
    if (mimeType.includes("pdf")) return <FileText className={iconClass} />
    if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("7z"))
        return <FileArchive className={iconClass} />
    if (mimeType.includes("sheet") || mimeType.includes("excel") || mimeType.includes("csv"))
        return <FileSpreadsheet className={iconClass} />
    if (
        mimeType.includes("javascript") ||
        mimeType.includes("json") ||
        mimeType.includes("html") ||
        mimeType.includes("css")
    )
        return <FileCode className={iconClass} />

    return <FileIcon className={iconClass} />
}

export const DropzoneItem: FC<DropzoneItemProps> = ({ file, progress, onRemove }) => {
    const imageUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : null

    useEffect(() => {
        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl)
        }
    }, [imageUrl])

    const safeProgress = progress || 0

    const {
        root,
        mainRow,
        previewWrapper,
        previewImage,
        content,
        headerRow,
        fileMeta,
        fileName,
        fileSize,
        progressRow,
        progressTrack,
        progressBar,
        progressText,
    } = dropzoneItemVariants()

    return (
        <div className={cn(root())}>
            <div className={cn(mainRow())}>
                <div className={cn(previewWrapper())}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={file.name} className={cn(previewImage())} />
                    ) : (
                        renderFileIcon(file.type)
                    )}
                </div>

                <div className={cn(content())}>
                    <div className={cn(headerRow())}>
                        <div className={cn(fileMeta())}>
                            <span className={cn(fileName())}>{file.name}</span>
                            <span className={cn(fileSize())}>
                                {Math.round(file.size / 1024)} KB
                            </span>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("h-8 w-8 bg-transparent hover:text-red-500")}
                            onClick={() => onRemove(file.name)}
                        >
                            <Trash2 className={cn("h-4 w-4")} />
                        </Button>
                    </div>

                    <div className={cn(progressRow())}>
                        <div className={cn(progressTrack())}>
                            <div
                                className={cn(progressBar())}
                                style={{ width: `${safeProgress}%` }}
                            />
                        </div>

                        <span className={cn(progressText())}>{Math.round(safeProgress)}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
