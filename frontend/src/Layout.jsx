import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

function Layout() {

 
  return (
    <div
      className="min-h-screen bg-zinc-100 
                    text-zinc-800"
    >
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 py-6 ">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
