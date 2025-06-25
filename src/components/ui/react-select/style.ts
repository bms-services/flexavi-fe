import { GroupBase, StylesConfig } from "react-select";


export interface Option {
    readonly label: string;
    readonly value: string;
}

export const selectStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
    control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--input))",
        borderRadius: "6px",
        outline: "none",
        backgroundColor: "hsl(210 50% 98%)",
        boxShadow: "none",
        "&:hover": {
            border: "1px solid hsl(var(--input))",
        },
    }),
    menu: (provided, state) => ({
        ...provided,
        borderRadius: "6px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "hsl(var(--primary))" : "white",
        color: state.isSelected ? "white" : "black",
        "&:hover": {
            backgroundColor: "hsl(var(--primary))",
            color: "white",
        },
    }),
    input: (provided) => ({
        ...provided,
        padding: "6px 0px",
    }),
}
