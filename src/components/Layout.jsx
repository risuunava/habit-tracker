import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 w-full">
        <Outlet />
      </div>

      {/* Mobile Bottom Navbar */}
      <Navbar />
    </div>
  );
}
