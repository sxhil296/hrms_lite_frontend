"use client";

import Loading from "@/app/loading";
import StatCard from "@/components/employee/statCard";
import { BreadCrumbCustom } from "@/components/general/BreadCrumbCustom";
import { getEmployeeById } from "@/services";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmployeePage() {
  const params = useParams();
  const employeeIdString = params.employeeId as string;

  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<any>(null);
  const [attendanceSummary, setAttendanceSummary] = useState<any>(null);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(employeeIdString);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setEmployee(res?.data);
      setAttendanceSummary(res?.attendance_summary);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeIdString) {
      fetchEmployee();
    }
  }, [employeeIdString]);

  if (loading) return <Loading />;

  

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <BreadCrumbCustom
        title="Employees"
        href="/employees"
        currentTitle={employee?.full_name}
      />

      <div className=" space-y-2 ">
        <p className="text-gray-500">Employee Name: <span className="font-semibold text-primary">{employee?.full_name}</span></p>    

        <p className="text-gray-500 mt-1">
           ID: <span className="font-semibold text-primary">{employee?.employee_id}</span>
        </p>
    
        <p className="text-gray-500">
           Email: <span className="font-semibold text-primary">{employee?.email}</span>
        </p>
      </div>
      <div className="flex gap-4 flex-col sm:flex-row justify-between items-center">
     <StatCard title="Total Present" value={attendanceSummary?.total_present} titleClassName="text-green-500"/>
     <StatCard title="Total Absent" value={attendanceSummary?.total_absent} titleClassName="text-red-500"/>
     <StatCard title="Total Leave" value={attendanceSummary?.total_leaves} titleClassName="text-blue-500"/>
     <StatCard title="Total Half Day" value={attendanceSummary?.total_half_day} titleClassName="text-yellow-500"/>

      </div>
    </div>
  );
}