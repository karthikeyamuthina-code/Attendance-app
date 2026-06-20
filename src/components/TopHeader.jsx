import { Bell, Sun, Moon, User, LogOut, Settings, ChevronDown, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEmployees } from "@/contexts/EmployeeContext";

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
  
  const { currentUser, currentRole, logoutUser } = useEmployees();

  const closePanel = () => setOpenPanel("none");
  const togglePanel = (panel) => {
    setOpenPanel((prev) => (prev === panel ? "none" : panel));
  };

  const getInitials = (name = "User") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-end px-6">
        <div className="flex items-center gap-1.5">
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

          {/* Profile Trigger Button */}
          {currentUser && (
            <button
              onClick={() => togglePanel("profile")}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-secondary/50 ml-1"
            >
              {currentUser.image ? (
                <img 
                  src={currentUser.image} 
                  alt="" 
                  className="w-8 h-8 rounded-full object-cover shadow-sm shrink-0 border border-border bg-background"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs shadow-sm">
                  {getInitials(currentUser.name)}
                </div>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                  openPanel === "profile" ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </header>

      {/* Notifications Slide Panel */}
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

      {/* Account Slide Panel */}
      <SlidePanel open={openPanel === "profile"} onClose={closePanel} title="Account">
        {currentUser && (
          <div className="p-5 flex items-center gap-4 border-b border-border bg-secondary/20">
            {currentUser.image ? (
              <img 
                src={currentUser.image} 
                alt="" 
                className="w-12 h-12 rounded-full object-cover shadow-md border shrink-0 bg-background"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-base shadow-md">
                {getInitials(currentUser.name)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate font-mono mt-0.5 select-all">
                {currentRole === "admin" ? "john@nexuscrm.com" : currentUser.email}
              </p>
            </div>
          </div>
        )}

        <div className="p-3 space-y-1">
          {[
            { 
              label: "Profile", 
              icon: User, 
              path: "/settings" // ✅ MODIFIED: Changed path destination to target "/settings" directly for all roles
            },
            { 
              label: "Settings", 
              icon: Settings, 
              path: "/settings" 
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                closePanel();
                navigate(item.path);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-foreground hover:bg-secondary transition-colors font-medium"
            >
              <item.icon className="w-4 h-4 text-muted-foreground" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-border mt-auto">
          <button 
            onClick={() => {
              closePanel();
              logoutUser();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-rose-500/5 text-destructive hover:bg-destructive hover:text-white transition-all duration-150"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      </SlidePanel>
    </>
  );
}