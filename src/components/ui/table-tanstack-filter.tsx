import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOption, FilterType } from "@/zustand/types/apiT";
import { DateSinglePicker } from "./date-single-picker";
import { DateRangePicker } from "./date-range-picker";
import { Input } from "./input";

type FilterValue = string | number | [string, string];

interface TableTanstackFilterProps {
    keyName: string;
    config: FilterOption;
    value?: FilterValue;
    onChange: (key: string, value: FilterValue | undefined) => void;
}

export function TableTanstackFilter({
    keyName,
    config,
    value,
    onChange,
}: TableTanstackFilterProps) {
    switch (config.type) {
        case FilterType.SELECT:
            return (
                <Select
                    value={typeof value === "string" || typeof value === "number" ? String(value) : ""}
                    onValueChange={(val) => onChange(keyName, val === "all" ? undefined : val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={config.label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {config.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

        case FilterType.DATE:
            return (
                <Input type="date"
                    value={value}
                    onChange={(e) => {
                        const dateValue = e.target.value ? e.target.value : undefined;
                        onChange(keyName, dateValue);
                    }}
                    placeholder={config.placeholder}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
            );

        case FilterType.DATE_RANGE:
            {
                const [startStr, endStr] = (value ?? []) as [string?, string?];
                return (
                    <DateRangePicker
                        label={config.label}
                        value={[
                            startStr ? new Date(startStr) : null,
                            endStr ? new Date(endStr) : null
                        ]}
                        onChange={(range) => {
                            if (range && range[0] && range[1]) {
                                onChange(keyName, [range[0].toISOString(), range[1].toISOString()]);
                            } else {
                                onChange(keyName, undefined);
                            }
                        }}
                    />
                );
            }

        default:
            return null;
    }
}