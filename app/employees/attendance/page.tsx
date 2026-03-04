
import { AttendanceForm } from "@/components/attendance/AttendanceForm";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AttendancePage() {
    return (
        <div className="p-6 space-y-10">
            <Breadcrumb >
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/employees">Employees</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Attendance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <AttendanceForm />
            <AttendanceTable />
        </div>
    );
}