const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

// GET ALL EMPLOYEES
export const getAllEmployees = async (
  search?: string,
  page?: number,
  limit?: number,
) => {
  try {
    let url = `${API_BASE_URL}/employees`;
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page !== undefined) params.append("page", page.toString());
    if (limit !== undefined) params.append("limit", limit.toString());
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
