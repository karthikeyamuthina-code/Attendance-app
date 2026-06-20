import { useState, useEffect } from "react";
import { useEmployees } from "../contexts/EmployeeContext"; 
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { currentUser, currentRole } = useEmployees(); 
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: ""
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentRole === "admin" ? "john@nexuscrm.com" : currentUser.email || "",
        role: currentRole === "admin" ? "Admin" : "Employee",
        phone: currentUser.phone || "+1 (555) 019-2831"
      });
    }
  }, [currentUser, currentRole]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    toast({
      title: "Preferences Updated",
      description: "Your account profile data information updates have been saved successfully.",
    });
  };

  if (!currentUser) {
    return <div className="p-6 text-sm text-muted-foreground">Loading session parameters...</div>;
  }

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences and view options.</p>
      </div>

      <div className="flex flex-col gap-6 w-full items-start">
        {/* ✅ MODIFIED: Removed tab navigation completely, form now renders cleanly on page layout mount */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-2xs">
          <form onSubmit={handleSaveChanges} className="space-y-4 w-full">
            <h3 className="text-lg font-bold text-foreground mb-4">Profile Info</h3>

            <div className="space-y-1.5 w-full">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-10 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-1.5 w-full">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                disabled 
                className="w-full h-10 px-3.5 rounded-lg bg-secondary/30 border border-border text-sm font-medium text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5 w-full">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Role Scope</label>
              <input 
                type="text" 
                value={formData.role}
                disabled 
                className="w-full h-10 px-3.5 rounded-lg bg-secondary/30 border border-border text-sm font-medium text-muted-foreground cursor-not-allowed font-mono uppercase text-[11px] tracking-wider"
              />
            </div>

            <div className="space-y-1.5 w-full">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full h-10 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>

            <button 
              type="submit"
              className="h-10 px-5 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-xs hover:opacity-95 transition-all mt-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}