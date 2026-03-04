"use client";

import { navItems } from "@/constants";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-10 border-b bg-background">
      <nav className="px-5 py-4 flex justify-between items-center max-w-7xl mx-auto">
        

        <Link href="/" className="text-2xl font-semibold">
          HRMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background px-5 py-4 flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};