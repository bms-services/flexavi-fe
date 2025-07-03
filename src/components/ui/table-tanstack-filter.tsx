import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOption, FilterType } from "@/zustand/types/apiT";
import { DateRangePicker } from "./date-range-picker";
import { Input } from "./input";
import { format } from "date-fns";

type FilterValue = string | number | [string, string];
type DateRangeValue = [Date | null, Date | null] | null;

interface TableTanstackFilterProps {
    keyName: string;
    config: FilterOption;
    value?: FilterValue | DateRangeValue;
    onChange: (key: string, value: FilterValue | DateRangeValue | undefined) => void;
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
                    value={value !== undefined ? String(value) : "all"}
                    onValueChange={(val) => onChange(keyName, val === "all" ? undefined : val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={config.label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {config.options.map((opt) => (
                            <SelectItem key={opt.value} value={String(opt.value)}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

        case FilterType.DATE:
            return (
                <Input
                    type="date"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => {
                        const dateValue = e.target.value || undefined;
                        onChange(keyName, dateValue);
                    }}
                    placeholder={config.placeholder}
                />
            );

        case FilterType.DATE_RANGE:
            return (
                <DateRangePicker
                    label={config.label}
                    containerClassName="w-full"
                    value={
                        Array.isArray(value) && value.length === 2
                            ? [value[0] ? new Date(value[0]) : null, value[1] ? new Date(value[1]) : null]
                            : [null, null]
                    }
                    dateFormat="dd/MM/yyyy"
                    onChange={(range) => {
                        if (!range || (range[0] === null && range[1] === null)) {
                            onChange(keyName, undefined);
                        } else {
                            const startDate = range[0] ? format(range[0], "yyyy-MM-dd") : "";
                            const endDate = range[1] ? format(range[1], "yyyy-MM-dd") : "";
                            onChange(keyName, [startDate, endDate]);
                        }
                    }}
                />
            );

        default:
            return null;
    }
}