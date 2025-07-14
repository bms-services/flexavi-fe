import { RegisterOptions, useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";

interface SelectListProps<T> {
    name: string;
    label?: string;
    placeholder?: string;
    items: T[];
    selectedIdsField: string;
    renderItem: (item: T, selected: boolean) => React.ReactNode;
    onSearchChange?: (value: string) => void;
    onLoadMore?: () => void;
    rules?: RegisterOptions;

}

export function SelectList<T extends { id: string }>({
    name,
    label,
    placeholder,
    items,
    selectedIdsField,
    renderItem,
    onSearchChange,
    onLoadMore,
    rules,
}: SelectListProps<T>) {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const selected: string[] = watch(name) ?? [];

    const handleSelect = (id: string) => {
        const isMultiple = Array.isArray(selected);
        const alreadySelected = selected.includes(id);

        if (!isMultiple) {
            setValue(name, [id], { shouldValidate: true });
        } else if (alreadySelected) {
            setValue(name, selected.filter((i) => i !== id), { shouldValidate: true });
        } else {
            setValue(name, [...selected, id], { shouldValidate: true });
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            onLoadMore?.();
        }
    };

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <Input
                placeholder={placeholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
            />

            <div
                className="h-96 overflow-y-auto space-y-2 p-2 bg-muted rounded-md border"
                onScroll={handleScroll}
            >
                {items.length === 0 ? (
                    <div className="p-1 text-center text-muted-foreground">
                        Geen data gevonden
                    </div>
                ) : (
                    items.map((item) => {
                        const isSelected = selected.includes(item.id);
                        return (
                            <div key={item.id} onClick={() => handleSelect(item.id)}>
                                {renderItem(item, isSelected)}
                            </div>
                        );
                    })
                )}
            </div>

            <input type="hidden" {...register(name, rules)} />

            {errors[name] && (
                <p className="text-sm text-red-500">
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
}