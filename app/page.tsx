import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 sm:px-6 lg:px-8">

  
      <h1 className="max-w-4xl bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        Streamline Your{" "}
        <span className="font-serif italic font-light text-foreground">
          Workforce
        </span>{" "}
        with a{" "}
        <span className="relative inline-block">
          <span className="absolute -inset-1 rounded-lg bg-primary/10 blur-xl opacity-50"></span>
          <span className="relative text-primary inline-flex items-center gap-2">
            Smart HRMS
          </span>
        </span>
      </h1>


      <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
        Manage employees, payroll, attendance, and performance — all in one
        powerful dashboard.
      </p>

  
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">

        <Button
          className="rounded-full w-full sm:w-auto px-8"
          asChild
          size="lg"
        >
          <Link href="/employees" className="font-medium text-lg">
            View Employees
          </Link>
        </Button>

        <Button
          className="rounded-full w-full sm:w-auto px-8"
          variant="outline"
          asChild
          size="lg"
        >
          <Link href="/employees/attendance" className="font-medium text-lg">
            View Attendance
          </Link>
        </Button>

      </div>
    </div>
  );
}