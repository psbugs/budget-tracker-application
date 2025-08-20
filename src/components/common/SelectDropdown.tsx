import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectDropdownProps<T extends string> {
    label?: string;
    placeholder?: string;
    value: T | undefined;
    options: { label: string; value: T; icon?: React.ReactNode }[];
    onChange: (value: T) => void;
    required?: boolean;
}

export const SelectDropdown = <T extends string>({
    label,
    placeholder = "Select an option",
    value,
    options,
    onChange,
    required = false,
}: SelectDropdownProps<T>) => {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Select value={value} onValueChange={onChange} required={required}>
                <SelectTrigger className="h-10 border rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="z-50 max-h-60 overflow-auto">
                    {options.map((opt) => (
                        <SelectItem
                            key={opt.value}
                            value={opt.value}

                            className="!hover:text-inherit !hover:cursor-default"
                        >
                            <div className="flex items-center gap-2">
                                {opt.icon && <span className="text-lg">{opt.icon}</span>}
                                <span>{opt.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
