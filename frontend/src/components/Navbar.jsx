import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScanFace } from "lucide-react";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const addStudent = () => navigate("/add");

  return (
    <nav
      className="fixed top-0 left-0 z-20 w-full
                    bg-white dark:bg-zinc-900
                    border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2 text-white shadow">
            <ScanFace />
          </div>
          <span className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Edutrack
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg
                     text-zinc-700 dark:text-zinc-200
                     hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${open ? "block" : "hidden"} md:flex items-center gap-8
             absolute md:static top-full left-0 w-full md:w-auto
             bg-white dark:bg-zinc-900
             border-t md:border-0 border-zinc-200 dark:border-zinc-800
             px-6 py-4 md:p-0`}
        >
          {[
            { to: "/", label: "Dashboard" },
            { to: "/recognize", label: "Recognize" },
            { to: "/students", label: "Students" },
            { to: "/about", label: "About" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium transition
                 ${
                   isActive
                     ? "text-blue-600"
                     : "text-zinc-700 dark:text-zinc-300"
                 }
                 hover:text-blue-600`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            onClick={addStudent}
            className="mt-2 md:mt-0 md:ml-4
                       px-4 py-2 rounded-full text-sm font-medium
                       bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Student
          </button>
        </div>

       
      </div>
    </nav>
  );
}
