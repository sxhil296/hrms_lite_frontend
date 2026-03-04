import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface DatePickerProps {
    date: Date | undefined | string;
    setDate: (date: Date | undefined) => void;
    triggerClassName?: string;
   disabled?: { after: Date };
}

    export const DatePicker = ({date, setDate, triggerClassName, disabled }: DatePickerProps) => {
    return (
        <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={triggerClassName}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select Date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={setDate}
            initialFocus
            disabled={disabled}
        
          />
        </PopoverContent>
      </Popover>
    );
};