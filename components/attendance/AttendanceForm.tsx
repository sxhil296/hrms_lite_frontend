"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { markAttendance } from "@/services";
import { AttendanceStatus } from "@/constants";
import { Dropdown } from "../general/Dropdown";
import { DatePicker } from "../general/DatePicker";

export const AttendanceForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const validateEmployeeId = (value: string) => {
    if (!value) return "Employee ID is required";
    if (!/^EMP\d{5}$/.test(value))
      return "Employee ID must be like EMP00001 (8 characters)";
    return "";
  };

  const handleSubmit = async () => {
    const error = validateEmployeeId(employeeId);

    if (error) {
      toast.info(error);
      return;
    }

    if (!date) {
      toast.info("Please select a date");
      return;
    }

    if (!status) {
      toast.info("Please select attendance status");
      return;
    }

    try {
      setLoading(true);

      const res = await markAttendance({
        employee_id: employeeId,
        date: format(date, "yyyy-MM-dd"),
        status,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Attendance marked successfully");

      setEmployeeId("");
      setDate(undefined);
      setStatus("");
    } catch {
      toast.error("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 w-full">
      <h2 className="text-2xl font-bold">Mark Attendance</h2>

      <div className="flex justify-between w-full items-center gap-4 ">
      <div className="flex justify-start items-center gap-4">
             {/* Date Picker */}
    
      <DatePicker date={date} setDate={setDate} triggerClassName="w-[200px] justify-start text-left"/>
      
      {/* Employee ID */}
      <Input
        placeholder="Employee ID (e.g. EMP00001)"
        value={employeeId}
        maxLength={8}
        className="min-w-[220px]"
        onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
      />

     

      {/* Attendance Status dropdown */}
      <div className="flex gap-3">
       <Dropdown value={status} setValue={setStatus} options={AttendanceStatus} placeholder="Status" showAllOption={false}/>
      </div>
      </div>
      <Button
        type="button"
        variant="default"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Mark Attendance"}
      </Button>
      </div>
    </div>
  );
}