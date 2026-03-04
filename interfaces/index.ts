export interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
} 

export interface Attendance {
    id: string;
    employee_id: string;
    employee_name: string;
    employee_department: string;
    date: string;
    status: string;
}
