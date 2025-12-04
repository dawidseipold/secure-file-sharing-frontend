import { create } from "zustand"

export type ActionsLayoutState = {
    title: string
    subtitle: string
    tooltip: string
}

type DashboardModulesLayoutStore = ActionsLayoutState & {
    setLayout: (data: Partial<ActionsLayoutState>) => void
}

export const useDashboardModulesLayoutStore = create<DashboardModulesLayoutStore>((set) => ({
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

export function setDashboardModulesLayout(data: Partial<ActionsLayoutState>): void {
    useDashboardModulesLayoutStore.getState().setLayout(data)
}
