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
   
    date: string;
    status: string;
    employee: {
        full_name: string;
        email: string;
        department: string;
    }
}
