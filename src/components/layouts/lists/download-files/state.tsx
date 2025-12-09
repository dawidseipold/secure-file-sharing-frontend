import { type FC } from "react"
import { AlertTriangle, Inbox } from "lucide-react"
import { stateVariants } from "./variants"

interface DownloadFilesStateProps {
    state: "error" | "empty" | "unauthenticated"
}

export const DownloadFilesState: FC<DownloadFilesStateProps> = ({ state }) => {
    const { base, icon, message } = stateVariants()
    const content = {
        error: { icon: AlertTriangle, message: "Failed to load files." },
        empty: { icon: Inbox, message: "You have no files." },
        unauthenticated: { icon: AlertTriangle, message: "Create an identity to see your files." },
    }
    const { icon: Icon, message: text } = content[state]

    return (
        <div className={base()}>
            <Icon className={icon()} />
            <p className={message()}>{text}</p>
        </div>
    )
}
