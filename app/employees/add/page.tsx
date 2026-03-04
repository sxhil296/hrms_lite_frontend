import AddEmployeeForm from "@/components/employee/AddEmployeeForm";
import { BreadCrumbCustom } from "@/components/general/BreadCrumbCustom";

export default function AddEmployeePage() {
  return (
    <div className="p-6 space-y-10">

      <BreadCrumbCustom title="Employees" href="/employees" currentTitle="Add Employee" />
      <AddEmployeeForm />
    </div>
  );
}
