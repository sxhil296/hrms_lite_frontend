

import { AttendanceWrapper } from "@/components/attendance/AttendanceWrapper";
import { BreadCrumbCustom } from "@/components/general/BreadCrumbCustom";

export default function AttendancePage() {
    return (
        <div className="p-6 space-y-10">
           <BreadCrumbCustom title="Employees" href="/employees" currentTitle="Attendance" />
            <AttendanceWrapper />
        </div>
    );
}