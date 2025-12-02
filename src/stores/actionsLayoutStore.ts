import { create } from "zustand"

export type ActionsLayoutState = {
    title: string
    subtitle: string
    tooltip: string
}

type ActionsLayoutStore = ActionsLayoutState & {
    setLayout: (data: Partial<ActionsLayoutState>) => void
}

export const useActionsLayoutStore = create<ActionsLayoutStore>((set) => ({
    title: "Title",
    subtitle: "Subtitle",
    tooltip: "Tooltip",
    setLayout: (data) => {
        set((state) => ({
            ...state,
            ...data,
        }))
    },
}))

export function setActionsLayout(data: Partial<ActionsLayoutState>): void {
    useActionsLayoutStore.getState().setLayout(data)
}
