import { Bell, Search, Sun, Moon, Plus, User, LogOut, Settings, ChevronDown, UserPlus, FileText, Target, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const quickAddItems = [
  { label: "New Lead", icon: UserPlus, description: "Add a new lead to pipeline", path: "/leads" },
  { label: "New Deal", icon: Target, description: "Create a deal in pipeline", path: "/pipeline" },
  { label: "New Task", icon: FileText, description: "Assign a task to your team", path: "/tasks" },
];

const notifications = [
  { text: "New lead from website form", time: "2m ago", unread: true },
  { text: "Deal 'Enterprise Plan' moved to Negotiation", time: "1h ago", unread: true },
  { text: "Task overdue: Follow up with Acme Corp", time: "3h ago", unread: false },
  { text: "New support ticket #1024 assigned", time: "5h ago", unread: false },
];

function SlidePanel({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-card border-l border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-heading font-semibold text-foreground">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function TopHeader() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [openPanel, setOpenPanel] = useState("none");

  const closePanel = () => setOpenPanel("none");
  const togglePanel = (panel) => {
    setOpenPanel((prev) => (prev === panel ? "none" : panel));
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads, customers, deals..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
            <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 h-5 px-1.5 rounded border border-border bg-muted text-[10px] text-muted-foreground items-center font-mono">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Add */}
          <button
            onClick={() => togglePanel("quickAdd")}
            className="h-9 px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Add</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button
            onClick={() => togglePanel("notifications")}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition relative text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
          </button>

          {/* Profile */}
          <button
            onClick={() => togglePanel("profile")}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-secondary/50 ml-1"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs shadow-sm">
              JD
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                openPanel === "profile" ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Quick Add Panel */}
      <SlidePanel open={openPanel === "quickAdd"} onClose={closePanel} title="Quick Add">
        <div className="p-4 space-y-2">
          {quickAddItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                closePanel();
                navigate(item.path);
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left hover:bg-secondary transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </SlidePanel>

      {/* Notifications Panel */}
      <SlidePanel open={openPanel === "notifications"} onClose={closePanel} title="Notifications">
        <div className="px-4 py-2 flex items-center justify-between border-b border-border">
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {notifications.filter((n) => n.unread).length} new
          </span>
          <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
        </div>

        <div>
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`px-4 py-4 flex items-start gap-3 hover:bg-secondary/50 cursor-pointer transition-colors border-b border-border/50 last:border-0 ${
                n.unread ? "bg-primary/[0.03]" : ""
              }`}
            >
              {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
              <div className={n.unread ? "" : "ml-5"}>
                <p className="text-sm text-foreground leading-snug">{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <button className="w-full h-9 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition">
            View all notifications
          </button>
        </div>
      </SlidePanel>

      {/* Profile Panel */}
      <SlidePanel open={openPanel === "profile"} onClose={closePanel} title="Account">
        <div className="p-5 flex items-center gap-4 border-b border-border">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-base shadow-md">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john@nexuscrm.com</p>
          </div>
        </div>

        <div className="p-3 space-y-1">
          {[
            { label: "Profile", icon: User, path: "/settings" },
            { label: "Settings", icon: Settings, path: "/settings" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                closePanel();
                navigate(item.path);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <item.icon className="w-4 h-4 text-muted-foreground" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-border mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </SlidePanel>
    </>
  );
}