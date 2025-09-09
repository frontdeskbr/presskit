import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Minha Página", icon: User, to: "/me" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-gradient-to-b from-sidebar-primary to-sidebar-accent text-sidebar-primary-foreground border-r border-sidebar-border transition-all duration-200 flex flex-col shadow-lg z-20",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <img
            src="/favicon.ico"
            alt="Logo"
            className={cn("w-8 h-8", collapsed && "mx-auto")}
          />
          <span className={cn("font-extrabold text-xl tracking-tight transition-all", collapsed && "hidden")}>
            Presskit.cc
          </span>
        </div>
        <button
          className="p-2 rounded hover:bg-sidebar-accent"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Alternar sidebar"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d={collapsed
                ? "M9 6l6 6-6 6"
                : "M15 6l-6 6 6 6"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center py-6 border-b border-sidebar-border">
        <img
          src="https://placehold.co/64x64"
          alt="Avatar"
          className="rounded-full border-2 border-primary shadow w-12 h-12"
        />
        {!collapsed && (
          <>
            <span className="mt-2 font-semibold text-base">Usuário</span>
            <span className="text-xs text-gray-400">user@email.com</span>
          </>
        )}
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                  location.pathname.startsWith(item.to) && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className={cn("transition-all", collapsed && "hidden")}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 mt-auto border-t border-sidebar-border">
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:underline">
          <LogOut className="w-4 h-4" />
          <span className={cn(collapsed && "hidden")}>Sair</span>
        </button>
      </div>
    </aside>
  );
};