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
      throw new Error("Failed to fetch employees");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// DELETE EMPLOYEE BY ID
export const deleteEmployee = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }
    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
