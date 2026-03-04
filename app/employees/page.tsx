import EmployeeTable from "@/components/employee/EmployeeTable";
import { BreadCrumbCustom } from "@/components/general/BreadCrumbCustom";

export default function EmployeePage() {
  return (
    <div className="p-6 space-y-10">
    <BreadCrumbCustom title="Employees" href="/employees" currentTitle="Employee Directory"    />
      <EmployeeTable />
    </div>
  );
}
