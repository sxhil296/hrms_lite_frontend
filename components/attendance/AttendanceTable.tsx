"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Attendance } from "@/interfaces";
import { getAllAttendance } from "@/services";
import { Input } from "../ui/input";
import { Dropdown } from "../general/Dropdown";
import { AttendanceStatus } from "@/constants";
import { Skeleton } from "../ui/skeleton";
import { DatePicker } from "../general/DatePicker";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export const AttendanceTable = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAllAttendance(
        page,
        limit,
        date ? format(date, "yyyy-MM-dd") : "",
        debouncedSearch,
        status
      );

      if (!res.success) {
        setError(res.message);
        return;
      }

      setAttendance(res.data);
    } catch (error) {
      setError("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  ///Debounce Search 

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  //Fetch Data 

  useEffect(() => {
    fetchAttendance();
  }, [page, limit, debouncedSearch, status, date]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Attendance Table</h2>

      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
         

          <Input
            placeholder="Search employees..."
            className="max-w-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

      
      <DatePicker date={date} setDate={setDate } triggerClassName="w-[200px] justify-start text-left"/>

          



          <Dropdown value={status} setValue={setStatus} options={AttendanceStatus} />
        </div>
      </div>

  

     

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Attendance</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Skeleton className="h-10 w-full" />
              </TableCell>
            </TableRow>
          ) : attendance.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No attendance found.
              </TableCell>
            </TableRow>
          ) : (
            attendance.map((attend) => (
              <TableRow key={`${attend.employee_id}-${attend.date}`}>
                <TableCell>{attend.employee_id}</TableCell>
                <TableCell>{attend.employee_name}</TableCell>
                <TableCell>{attend.date}</TableCell>
                <TableCell>
                  <Badge
                  className={cn(
"capitalize",
                    attend.status === "present" && "bg-green-500",
                    attend.status === "absent" && "bg-red-500",
                    attend.status === "half_day" && "bg-yellow-500",
                    attend.status === "leave" && "bg-blue-500"
                  )}
                  >
                    {attend.status === "half_day" ? "Half Day" : attend.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};