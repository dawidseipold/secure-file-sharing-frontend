import { useQuery } from "@tanstack/react-query"
import { useIdentity } from "@/hooks/useIdentity"
import { listUserFiles } from "@/utils/api/endpoints"
import { type FC } from "react"
import { listVariants } from "./variants"
import type { FileListItem } from "./types"
import { SkeletonItem } from "./skeleton"
import { DownloadFilesState } from "./state"
import { DownloadFilesItem } from "./item"

export const DownloadFilesList: FC = () => {
    const { userId } = useIdentity()

    const { data: files, isLoading, isError } = useQuery({
        queryKey: ["files", userId],
        queryFn: async () => (await listUserFiles(userId!)) as unknown as FileListItem[],
        enabled: !!userId,
    })

    if (!userId) return <DownloadFilesState state="unauthenticated" />
    if (isLoading) return <div className={listVariants()}><SkeletonItem /><SkeletonItem /><SkeletonItem /></div>
    if (isError) return <DownloadFilesState state="error" />
    if (!files || files.length === 0) return <DownloadFilesState state="empty" />

    return (
        <div className={listVariants()}>
            {files.map((file) => (
                <DownloadFilesItem key={String(file.id)} file={file} />
            ))}
        </div>
    )
}
