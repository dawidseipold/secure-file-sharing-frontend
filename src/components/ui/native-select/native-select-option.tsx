"use client"

import React, { type FC } from "react"

type NativeSelectOptionProps = React.ComponentProps<"option">

export const NativeSelectOption: FC<NativeSelectOptionProps> = (props) => {
    return <option data-slot="native-select-option" {...props} />
}
