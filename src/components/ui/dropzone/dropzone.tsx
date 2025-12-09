"use client"

import { type FC, useRef } from "react"
import { cn } from "@/utils/styles"
import { DropzoneZone } from "@/components/ui/dropzone/dropzone-zone.tsx"
import { DropzoneList } from "@/components/ui/dropzone/dropzone-list.tsx"

export interface DropzoneProps {
    value: File[]
    onChange: (files: File[]) => void
    error?: string
    name?: string
    className?: string
    progressMap?: Record<string, number>
}

export const Dropzone: FC<DropzoneProps> = ({
    value,
    onChange,
    error,
    className,
    progressMap = {},
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return

        const newFiles = Array.from(files)
        // const nextFiles = [...value, ...newFiles]

        onChange(newFiles)
    }

    const handleBoxClick = () => {
        fileInputRef.current?.click()
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        handleFileSelect(e.dataTransfer.files)
    }

    const removeFile = (filename: string) => {
        const nextFiles = value.filter((file) => file.name !== filename)
        onChange(nextFiles)
    }

    return (
        <div className={cn("w-full", className)}>
            <DropzoneZone
                fileInputRef={fileInputRef}
                handleBoxClick={handleBoxClick}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleFileSelect={handleFileSelect}
            />

            <DropzoneList
                uploadedFiles={value}
                fileProgresses={progressMap}
                removeFile={removeFile}
            />

            {error ? <p className="mt-1 px-6 text-sm text-red-500">{error}</p> : null}
        </div>
    )
}
