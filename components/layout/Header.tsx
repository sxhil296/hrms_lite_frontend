import Link from "next/link";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Employees",
    href: "/employees",
  },
  {
    name: "Add Employee",
    href: "/add-employee",
  },
  {
    name: "Attendance",
    href: "/attendance",
  },
];

export const Header = () => {
  return (
    <header className="w-full sticky top-0 z-10 border-b bg-background">
      <nav className="px-5 py-4 flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-semibold">
          HRMS
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
