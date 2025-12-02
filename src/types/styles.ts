import type { COLORS_MAP } from "@/constants/styles.ts"

export type TailwindColor = keyof typeof COLORS_MAP

export interface ColorSet {
    bg: string
    text: string
    border: string
}
