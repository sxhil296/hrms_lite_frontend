const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

// GET ALL EMPLOYEES
export const getAllEmployees = async (
  search?: string,
  page?: number,
  limit?: number,
  department?: string,
) => {
  try {
    let url = `${API_BASE_URL}/employees`;
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page !== undefined) params.append("page", page.toString());
    if (limit !== undefined) params.append("limit", limit.toString());
    if (department) params.append("department", department);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json();
        return errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// ADD NEW EMPLOYEE
export const createEmployee = async (data: {
  full_name: string;
  email: string;
  department: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}


// DELETE EMPLOYEES
export const deleteEmployees = async (employee_ids: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee_ids }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting employees:", error);
    throw error;
  }
}

// MARK ATTENDANCE
export const markAttendance = async (data: {
  employee_id: string;
  date: string;
  status: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return result;
    }

    return result;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
};
// GET ALL ATTENDANCE
export const getAllAttendance = async (page?: number, limit?: number, date?: string, search?: string, status?: string) => {
  try {
    let url = `${API_BASE_URL}/attendance`;
    const params = new URLSearchParams();
    if (page !== undefined) params.append("page", page.toString());
    if (limit !== undefined) params.append("limit", limit.toString());
    if (date !== undefined) params.append("date", date);
    if (search !== undefined) params.append("search", search);
    if (status !== undefined) params.append("status", status);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
}

// GET EMPLOYEE BY EMPLOYEE ID
export const getEmployeeById = async (employee_id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${employee_id}`);
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
}