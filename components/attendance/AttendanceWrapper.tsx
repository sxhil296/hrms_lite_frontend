"use client";

import { useEffect, useState } from "react";
import { Attendance } from "@/interfaces";
import { getAllAttendance } from "@/services";
import { format } from "date-fns";

import { AttendanceForm } from "./AttendanceForm";
import { AttendanceTable } from "./AttendanceTable";

export const     AttendanceWrapper = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAllAttendance(
        page,
        limit,
        date ? format(date, "yyyy-MM-dd") : "",
        debouncedSearch,
        status
      );

      if (!res.success) {
        setError(res.message);
        return;
      }

      setAttendance(res?.data);
      setTotalPages(res?.meta?.totalPages);
    } catch {
      setError("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // fetch attendance
  useEffect(() => {
    fetchAttendance();
  }, [page, limit, debouncedSearch, status, date]);



  return (
    <div className="space-y-8">

      <AttendanceForm refreshAttendance={fetchAttendance} />

      <AttendanceTable
        attendance={attendance}
        loading={loading}
        error={error}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        status={status}
        setStatus={setStatus}
        date={date}
        setDate={setDate}
      />

    </div>
  );
}