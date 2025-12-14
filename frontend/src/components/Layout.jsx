import Navbar from "./Navbar";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";

function Layout() {
  return (
    <>
      <div className="min-h-screen bg-background-light font-sans text-text-primary pb-10">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
          < About />
        </main>
      </div>
    </>
  );
}

export default Layout;
