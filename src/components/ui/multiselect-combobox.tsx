import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface MultiSelectComboboxProps {
    options: { value: string; label: string }[]
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
}

export const MultiSelectCombobox = ({
    options,
    value,
    onChange,
    placeholder = "Select items...",
}: MultiSelectComboboxProps) => {
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const customValues = value.filter((v) => !options.some((opt) => opt.value === v))

    const allOptions = [...options, ...customValues.map((v) => ({ value: v, label: v }))]

    const filtered = allOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchValue.toLowerCase()),
    )

    const isNew =
        searchValue.trim() &&
        !allOptions.some((opt) => opt.label.toLowerCase() === searchValue.toLowerCase())

    const handleSelect = (selectedValue: string) => {
        onChange(
            value.includes(selectedValue)
                ? value.filter((v) => v !== selectedValue)
                : [...value, selectedValue],
        )
        setSearchValue("")
    }

    const handleAddNew = () => {
        if (searchValue.trim() && !value.includes(searchValue)) {
            onChange([...value, searchValue])
            setSearchValue("")
        }
    }

    const selectedLabels = value.map((v) => allOptions.find((opt) => opt.value === v)?.label || v)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox">
                    {selectedLabels.length > 0 ? `${selectedLabels.length} selected` : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput
                        placeholder="Search or type new..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {isNew ? (
                                <div className="p-2">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        onClick={handleAddNew}
                                    >
                                        + Add "{searchValue}"
                                    </Button>
                                </div>
                            ) : (
                                "No results found."
                            )}
                        </CommandEmpty>
                        {filtered.length > 0 && (
                            <CommandGroup>
                                {filtered.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={value.includes(option.value)}
                                            className="mr-2"
                                            readOnly
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
