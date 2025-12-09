import type { SurrealId } from "./types"

export const getCleanId = (rawId: SurrealId): string => {
    if (typeof rawId === "string") return rawId.replace("files:", "")
    if (typeof rawId === "object" && rawId?.id) {
        const innerId = rawId.id
        if (typeof innerId === "string") return innerId
        if (typeof innerId === "object" && "String" in innerId)
            return (innerId as { String: string }).String
    }
    return String(rawId)
}
