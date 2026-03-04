
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Attendance } from "@/interfaces";

import { Input } from "../ui/input";
import { Dropdown } from "../general/Dropdown";
import { AttendanceStatus } from "@/constants";
import { Skeleton } from "../ui/skeleton";
import { DatePicker } from "../general/DatePicker";
import { Badge } from "../ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";


interface AttendanceTableProps {
  attendance: Attendance[];
  loading: boolean;
  error: string | null;

  page: number;
  setPage: (page: number) => void;
  totalPages: number;

  limit: number;
  setLimit: (limit: number) => void;

  searchInput: string;
  setSearchInput: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const AttendanceTable = ({
  attendance,
  loading,
  error,

  page,
  setPage,

  totalPages,

  searchInput,
  setSearchInput,

  status,
  setStatus,

  date,
  setDate,
}: AttendanceTableProps ) => {
const router = useRouter();
 

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

          



          <Dropdown value={status} setValue={setStatus} options={AttendanceStatus} placeholder="Filter By Status" />
        </div>
      </div>

  

     <div className="border rounded-xl overflow-hidden bg-white">
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
              <TableRow key={`${attend.employee_id}-${attend.date}`} className="cursor-pointer hover:bg-amber-100" onClick={() => router.push(`/employees/${attend.employee_id}`)}>
                <TableCell>{attend.employee_id}</TableCell>
                <TableCell>{attend.employee.full_name}</TableCell>
                <TableCell>{formatDate(attend.date)}</TableCell>
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
        {/* Pagination */}
           <div className="flex justify-end items-center gap-4">
             <Button
               variant="outline"
               size="sm"
               disabled={page === 1 || loading}
               onClick={() => setPage(page - 1)}
             >
               Previous
             </Button>
     
             <span className="text-sm text-muted-foreground">
               Page {page} of {totalPages || 1}
             </span>
     
             <Button
               variant="outline"
               size="sm"
               disabled={page === totalPages || loading}
               onClick={() => setPage(page + 1  )}
             >
               Next
             </Button>
           </div>

   
    </div>
  );
};