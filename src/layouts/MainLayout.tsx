import { Sidebar } from "@/components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/me");

  return (
    <div className="flex min-h-screen bg-background">
      {isDashboard && <Sidebar />}
      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}