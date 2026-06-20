import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEmployees } from "../contexts/EmployeeContext";
import {
  LayoutDashboard, Users, UserCircle, TrendingUp, CheckSquare,
  ChevronLeft, ChevronRight, ChevronDown, Zap, Layers, Briefcase, Cog, ListTodo, LogOut, Settings, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navGroups = [
  {
    label: "Overview",
    icon: Layers,
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    ],
  },
  {
    label: "About Employee",
    icon: Briefcase,
    items: [
      { label: "Employee Details", icon: Users, path: "/leads" },
      { label: "Tasks", icon: CheckSquare, path: "/tasks" },
      { label: "Salary Details", icon: TrendingUp, path: "/salary" },
    ],
  },
  {
    label: "Employee Workspace",
    icon: CheckSquare,
    items: [
      { label: "Employee Attendance", icon: UserCircle, path: "/attendance" },
      { label: "Task Status", icon: ListTodo, path: "/task-status" },
    ],
  },
  {
    label: "Admin",
    icon: Cog,
    items: [
      { label: "Settings", icon: Settings, path: "/settings" },
      { label: "Roles", icon: Shield, path: "/roles" },
    ],
  },
];

function SidebarGroup({ group, collapsed, isOpen, onToggle }) {
  const location = useLocation();
  const { currentRole } = useEmployees(); 

  const visibleItems = group.items.filter((item) => {
    if (currentRole !== "admin") {
      if (item.path === "/task-status" || item.path === "/roles") {
        return false; 
      }
    }
    return true;
  });

  if (visibleItems.length === 0) {
    return null;
  }

  const hasActiveChild = visibleItems.some((item) => location.pathname === item.path);

  // ✅ FIXED: Dynamically renames the text string label to "Employee" for general workspace portal views
  const displayLabel = (group.label === "Admin" && currentRole !== "admin") ? "Employee" : group.label;

  return (
    <div className="mb-1">
      {!collapsed ? (
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            hasActiveChild
              ? "text-sidebar-primary-foreground bg-sidebar-accent/50"
              : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
          }`}
        >
          <group.icon className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">{displayLabel}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>
      ) : (
        <div className="flex justify-center py-2">
          <div className={`w-6 h-0.5 rounded-full ${hasActiveChild ? "bg-primary" : "bg-sidebar-border"}`} />
        </div>
      )}

      <AnimatePresence initial={false}>
        {(isOpen || collapsed) && (
          <motion.div
            initial={collapsed ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`space-y-0.5 ${!collapsed ? "mt-1 ml-3 pl-3 border-l border-sidebar-border/50" : "mt-1"}`}>
              {visibleItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    {!collapsed && <span>{item.label}</span>}

                    {collapsed && isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}

                    {collapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg pointer-events-none">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45 rounded-[1px]" />
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { currentUser, currentRole, logoutUser } = useEmployees();

  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    navGroups.forEach((group) => {
      initial[group.label] = group.items.some((item) => {
        if (currentRole !== "admin" && (item.path === "/task-status" || item.path === "/roles")) return false;
        return item.path === location.pathname;
      });
    });
    return initial;
  });

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-heading font-bold text-lg text-sidebar-primary-foreground tracking-tight">
            Heigths IT Solutions
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin">
        {navGroups.map((group) => (
          <SidebarGroup
            key={group.label}
            group={group}
            collapsed={collapsed}
            isOpen={openGroups[group.label] ?? false}
            onToggle={() => toggleGroup(group.label)}
          />
        ))}
      </nav>

      {!collapsed && currentUser && (
        <div className="mx-3 mb-1 p-3 rounded-xl bg-sidebar-accent/40 border border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.image || "https://api.dicebear.com/7.x/initials/svg?seed=User"} 
              alt="" 
              className="w-8 h-8 rounded-full object-cover border bg-background shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-sidebar-primary-foreground truncate">{currentUser.name}</p>
              <p className="text-[10px] text-sidebar-muted uppercase tracking-wider font-semibold truncate font-mono">
                {currentRole === "admin" ? "Management Core" : currentUser.skill || "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={logoutUser}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-500 hover:bg-rose-500/5 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Secure Exit</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
} 