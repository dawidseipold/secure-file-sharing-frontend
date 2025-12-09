import { tv } from "tailwind-variants"

export const listVariants = tv({
    base: "space-y-3",
})

export const itemVariants = tv({
    slots: {
        base: "flex flex-col p-4 border rounded-lg bg-card text-card-foreground shadow-sm transition-all duration-300",
        mainRow: "flex items-center justify-between w-full",
        content: "space-y-1.5",
        header: "font-medium flex items-center gap-2 text-base",
        icon: "h-5 w-5 text-primary",
        meta: "text-xs text-muted-foreground",
        sender: "font-mono bg-muted px-1.5 py-0.5 rounded",
        decryptedContent: "mt-4 pt-4 border-t border-dashed",
        noteWrapper: "space-y-2",
        noteHeader: "text-sm font-semibold flex items-center gap-2",
        noteText: "text-sm text-muted-foreground bg-muted/50 p-3 rounded-md whitespace-pre-wrap",
        actions: "flex items-center gap-2 mt-4",
    },
})

export const stateVariants = tv({
    slots: {
        base: "flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12 text-center",
        icon: "h-12 w-12 text-muted-foreground",
        message: "text-lg font-medium text-muted-foreground",
    },
})

export const skeletonVariants = tv({
    slots: {
        base: "flex items-center justify-between p-4 border rounded-lg",
        content: "flex-1 space-y-2",
        line1: "h-5 w-1/3 rounded bg-muted",
        line2: "h-4 w-1/2 rounded bg-muted",
        button: "h-9 w-24 rounded-md bg-muted",
    },
})
