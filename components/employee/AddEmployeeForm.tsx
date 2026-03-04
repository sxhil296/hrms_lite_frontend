"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createEmployee } from "@/services";
import { Loader2 } from "lucide-react";
import { Departments } from "@/constants";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function AddEmployeeForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    department?: string;
  }>({});

  const validateFullName = (value: string) => {
    if (!value) return "Full name is required";
    if (value.length < 3) return "Minimum 3 characters required";
    if (value.length > 50) return "Maximum 50 characters allowed";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (value.length > 100) return "Maximum 100 characters allowed";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  };

  const validateDepartment = (value: string) => {
    if (!value) return "Department is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const departmentError = validateDepartment(department);

    if (fullNameError || emailError || departmentError) {
      setErrors({
        fullName: fullNameError,
        email: emailError,
        department: departmentError,
      });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const res = await createEmployee({
        full_name: fullName,
        email,
        department,
      });
   

      if (!res.success) {
        toast.dismiss();
        toast.error(res.message || "Failed to add employee. Please try again.");
        return;
      } else {
        setFullName("");
        setEmail("");
        setDepartment("");
        toast.dismiss();
        toast.success("Employee added successfully");
        // router.push("/employees");
      }
    } catch {
      toast.dismiss();
      toast.error("Failed to add employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1">
        <Label htmlFor="fullName" className="text-base font-medium">
          Full Name
        </Label>
        <Input
          placeholder="Full Name"
          value={fullName}
          maxLength={50}
          onChange={(e) => {
            const value = e.target.value;
            setFullName(value);
            setErrors((prev) => ({
              ...prev,
              fullName: validateFullName(value),
            }));
          }}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-base font-medium">
          Email Address
        </Label>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          maxLength={100}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            setErrors((prev) => ({
              ...prev,
              email: validateEmail(value),
            }));
          }}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Department */}
      <div className="space-y-1">
        <Label htmlFor="department" className="text-base font-medium">
          Department
        </Label>
        <Select
          onValueChange={(value) => {
            setDepartment(value);
            setErrors((prev) => ({
              ...prev,
              department: validateDepartment(value),
            }));
          }}
          value={department}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {Departments.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <p className="text-sm text-red-500">{errors.department}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add Employee
      </Button>
    </form>
  );
}
