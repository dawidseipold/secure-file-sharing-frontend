"use client"

import { type FC, useRef, useState } from "react"
import { cn } from "@/utils/styles"
import { DropzoneZone } from "@/components/ui/dropzone/dropzone-zone.tsx"
import { DropzoneList } from "@/components/ui/dropzone/dropzone-list.tsx"

export interface DropzoneProps {
    value: File[]
    onChange: (files: File[]) => void
    error?: string
    name?: string
    className?: string
}

export const Dropzone: FC<DropzoneProps> = ({ value, onChange, error, className }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileProgresses, setFileProgresses] = useState<Record<string, number>>({})

    const simulateProgress = (files: File[]) => {
        files.forEach((file) => {
            let progress = 0

            const interval = setInterval(() => {
                progress += Math.random() * 10

                setFileProgresses((prev) => ({
                    ...prev,
                    [file.name]: Math.min(progress, 100),
                }))

                if (progress >= 100) {
                    clearInterval(interval)
                }
            }, 300)
        })
    }

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return

        const newFiles = Array.from(files)
        const nextFiles = [...value, ...newFiles]

        onChange(nextFiles)
        simulateProgress(newFiles)
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

        setFileProgresses((prev) => {
            const next = { ...prev }
            delete next[filename]
            return next
        })
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
                fileProgresses={fileProgresses}
                removeFile={removeFile}
            />

            {error ? <p className="mt-1 px-6 text-sm text-red-500">{error}</p> : null}
        </div>
    )
}
