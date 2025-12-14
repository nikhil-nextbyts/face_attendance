import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const addStudent = () => {
    alert("Add Students button clicked!");
  }

  return (
    <div>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 left-0 border-b border-default">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-2">
          <div className="flex items-center left-2">
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              FaceApp
            </span>
          </div>

          {/* Mobile toggle button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-controls="navbar-default"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="inline-flex items-center p-2 text-sm rounded-lg hover:bg-neutral-tertiary focus:outline-none focus:ring-2 focus:ring-fg-brand"
            >
              <span className="sr-only">Toggle navigation</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          <div
            className={`${
              open ? "block" : "hidden"
            } w-full md:block md:w-auto transition-all`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary items-center">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Students
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <div>
                  <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-3xl text-center ml-2"
                  onClick={addStudent}
                  >
                    Add Students
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
