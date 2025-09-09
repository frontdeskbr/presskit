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
        "h-screen bg-sidebar-primary text-sidebar-primary-foreground border-r border-sidebar-border transition-all duration-200 flex flex-col",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <span className={cn("font-bold text-lg transition-all", collapsed && "hidden")}>
          Presskit.cc
        </span>
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
      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded transition-colors hover:bg-sidebar-accent",
              location.pathname.startsWith(item.to) && "bg-sidebar-accent"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className={cn("transition-all", collapsed && "hidden")}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:underline">
          <LogOut className="w-4 h-4" />
          <span className={cn(collapsed && "hidden")}>Sair</span>
        </button>
      </div>
    </aside>
  );
};