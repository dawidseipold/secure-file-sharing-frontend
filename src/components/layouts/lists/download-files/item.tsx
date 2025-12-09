import { type FC, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useIdentity } from "@/hooks/useIdentity"
import { Button } from "@/components/ui/button"
import { Download, FileText, KeyRound, Loader, MessageSquareQuote } from "lucide-react"
import { H3, Muted, P } from "@/components/typography"
import { itemVariants } from "./variants"
import { getCleanId } from "./utils"
import { downloadFile } from "@/utils/api/endpoints"
import { importPrivateKeyFromPEM } from "@/utils/crypto/keys"
import { decryptFilePackage } from "@/utils/crypto/hybrid"
import type { DecryptedData, FileListItem } from "./types"

interface DownloadFilesItemProps {
    file: FileListItem
}

export const DownloadFilesItem: FC<DownloadFilesItemProps> = ({ file }) => {
    const { userId } = useIdentity()
    const [decryptedData, setDecryptedData] = useState<DecryptedData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const {
        base,
        mainRow,
        content,
        header,
        icon,
        meta,
        sender,
        decryptedContent,
        noteWrapper,
        noteHeader,
        noteText,
        actions,
    } = itemVariants()
    const cleanId = getCleanId(file.id)

    const decryptMutation = useMutation({
        mutationFn: async (): Promise<DecryptedData> => {
            setError(null)
            const packageData = await downloadFile(cleanId)
            const pem = localStorage.getItem("private_key")
            if (!pem) throw new Error("Missing private key")
            const privateKey = await importPrivateKeyFromPEM(pem)
            if (!userId) throw new Error("User ID missing")

            const decryptedResult = await decryptFilePackage(
                packageData.file_content,
                packageData.metadata,
                privateKey,
                userId,
            )

            return {
                blob: decryptedResult.blob,
                note: decryptedResult.note ?? undefined,
                filename: packageData.metadata.filename,
            }
        },
        onSuccess: (data) => setDecryptedData(data),
        onError: (err) => setError((err as Error).message),
    })

    const handleDownload = () => {
        if (!decryptedData) return
        const url = URL.createObjectURL(decryptedData.blob)
        const a = document.createElement("a")
        a.href = url
        a.download = decryptedData.filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className={base()}>
            <div className={mainRow()}>
                <div className={content()}>
                    <H3 className={header()}>
                        <FileText className={icon()} />
                        {decryptedData ? decryptedData.filename : "Secure File"}
                    </H3>
                    <Muted className={meta()}>
                        From: <span className={sender()}>{file.sender_id.slice(0, 8)}...</span>
                    </Muted>
                    <Muted className={meta()}>
                        Date: {new Date(file.created_at).toLocaleString()}
                    </Muted>
                </div>

                {!decryptedData && (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={decryptMutation.isPending}
                        onClick={() => decryptMutation.mutate()}
                    >
                        {decryptMutation.isPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <KeyRound className="h-4 w-4 mr-2" /> Decrypt
                            </>
                        )}
                    </Button>
                )}
            </div>

            {error && <P className="text-destructive mt-2 text-sm">{error}</P>}

            {decryptedData && (
                <div className={decryptedContent()}>
                    {decryptedData.note && (
                        <div className={noteWrapper()}>
                            <h4 className={noteHeader()}>
                                <MessageSquareQuote className="h-4 w-4" />
                                Secret Note
                            </h4>
                            <P className={noteText()}>{decryptedData.note}</P>
                        </div>
                    )}
                    <div className={actions()}>
                        <Button size="sm" onClick={handleDownload}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
