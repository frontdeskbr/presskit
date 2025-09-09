import { Sidebar } from "@/components/Sidebar";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/me");

  return (
    <div className="flex min-h-screen bg-background">
      {isDashboard && <Sidebar />}
      <main className="flex-1 min-h-screen flex flex-col">
        {isDashboard && (
          <header className="h-16 flex items-center justify-between px-8 border-b bg-white/80 shadow-sm sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-bold text-primary">Bem-vindo ao seu painel</h1>
              <span className="text-sm text-gray-500">Gerencie seu presskit facilmente</span>
            </div>
            <Link to="/me" target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> Visualizar página pública
              </Button>
            </Link>
          </header>
        )}
        <div className="flex-1 bg-muted/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}