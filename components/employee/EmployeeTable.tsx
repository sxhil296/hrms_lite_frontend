"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllEmployees, deleteEmployees } from "@/services";
import { Employee } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Plus, Trash2 } from "lucide-react";
import { Departments } from "@/constants";
import { toast } from "sonner";
import Link from "next/link";
import { AlertPopup } from "../general/AlertPopup";
import { Dropdown } from "../general/Dropdown";
import { useRouter } from "next/navigation";

const LIMIT = 10;

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter(); 

  // Debounce Search (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  //Fetch Employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      if(department === "all") {
        setDepartment("");
        setPage(1);
      }
      const res = await getAllEmployees(search, page, LIMIT, department);

if(res.success) {
  setEmployees(res.data);
  setTotalPages(res?.meta?.totalPages);
} else {
  setEmployees([]);
  setTotalPages(1);
  toast.dismiss();
  toast.error(res.message || "Failed to fetch employees");
}
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  // handle  delete
  const handleDelete = async (ids?: string[]) => {
    try {
      setLoading(true);
      const res = await deleteEmployees(ids || selected);
      if(res.success) {
        toast.dismiss();
        toast.success(res.message);
        setSelected([]);
        fetchEmployees();
        toast.dismiss();
        toast.success("Deleted successfully!");
      } else {
        toast.dismiss();
        toast.error(res.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to delete employees");
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchEmployees();
  }, [page, search, department]);

  const toggleSelect = (employee_id: string) => {
    setSelected((prev) =>
      prev.includes(employee_id) ? prev.filter((item) => item !== employee_id) : [...prev, employee_id],
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === employees.length) {
      setSelected([]);
    } else {
      setSelected(employees.map((emp) => emp.employee_id));
    }
  };




  return (
  <div className="space-y-4">


  <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">

  
    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

      <Input
        placeholder="Search employees by ID or name"
        className="w-full sm:max-w-sm"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <Dropdown
        value={department}
        setValue={setDepartment}
        options={Departments}
        placeholder="Filter by Department"
        allOptionText="All Departments"
      />

    </div>

  
    <div className="flex flex-wrap items-center gap-3">

      {selected.length > 0 && (
        <AlertPopup
          onConfirm={() => {
            handleDelete();
            setSelected([]);
          }}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete employee details from the database."
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}

      <Button variant="outline" size="icon" asChild className="cursor-pointer">
        <Link href="/employees/add">
          <Plus className="h-4 w-4" />
        </Link>
      </Button>

      <Button variant="outline" asChild className="cursor-pointer">
        <Link href="/employees/attendance">
          Mark Attendance
        </Link>
      </Button>

    </div>

  </div>


  <div className="border rounded-xl overflow-hidden bg-white">
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[700px]">

        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={
                  employees.length > 0 && selected.length === employees.length
                }
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right w-10"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            [...Array(LIMIT)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton className="h-6 w-full rounded-md" />
                </TableCell>
              </TableRow>
            ))
          ) : employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No employees found.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow
                key={emp.id}
                className="cursor-pointer hover:bg-amber-100"
              >
                <TableCell
                  onClick={() =>
                    router.push(`/employees/${emp.employee_id}`)
                  }
                >
                  <Checkbox
                    className="cursor-pointer ring-0 focus:ring-0"
                    checked={selected.includes(emp.employee_id)}
                    onCheckedChange={() =>
                      toggleSelect(emp.employee_id)
                    }
                  />
                </TableCell>

                <TableCell
                  onClick={() =>
                    router.push(`/employees/${emp.employee_id}`)
                  }
                >
                  {emp.employee_id}
                </TableCell>

                <TableCell
                  onClick={() =>
                    router.push(`/employees/${emp.employee_id}`)
                  }
                >
                  {emp.full_name}
                </TableCell>

                <TableCell
                  onClick={() =>
                    router.push(`/employees/${emp.employee_id}`)
                  }
                >
                  {emp.email}
                </TableCell>

                <TableCell
                  onClick={() =>
                    router.push(`/employees/${emp.employee_id}`)
                  }
                >
                  {emp.department}
                </TableCell>

                <TableCell className="text-right">
                  <AlertDialog>

                    <AlertDialogTrigger asChild>
                      <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete employee details from the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          variant="destructive"
                          onClick={() =>
                            handleDelete([emp.employee_id])
                          }
                          className="cursor-pointer"
                        >
                          Delete
                        </AlertDialogAction>

                      </AlertDialogFooter>
                    </AlertDialogContent>

                  </AlertDialog>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  </div>


  <div className="flex  justify-between sm:justify-end items-center gap-3">

    <Button
      variant="outline"
      size="sm"
      disabled={page === 1 || loading}
      onClick={() => setPage((prev) => prev - 1)}
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
      onClick={() => setPage((prev) => prev + 1)}
    >
      Next
    </Button>

  </div>

</div>
  );
}
