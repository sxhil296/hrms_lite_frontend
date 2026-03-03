import EmployeeTable from "@/components/employee/EmployeeTable";

export default function EmployeePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>
      <EmployeeTable />
    </div>
  );
}
