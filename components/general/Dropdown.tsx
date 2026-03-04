import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface DropdownProps {
    value: string;
    setValue: (value: string) => void;
    options: { value: string; name: string }[];
    placeholder?: string;
    allOptionText?:  string;
    showAllOption?: boolean;
}

export const Dropdown = ({
    value,
    setValue,
    options,
    placeholder = "Filter by Department",
    allOptionText = "All Departments",
    showAllOption = true

}: DropdownProps) => {
    return (
         <Select
                    onValueChange={(value) => {
                      setValue(value);
                    }}  
                    value={value}
                 
                  >
                    <SelectTrigger >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {showAllOption && <SelectItem value="all">{allOptionText}</SelectItem>}
                      {options.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
    );
};