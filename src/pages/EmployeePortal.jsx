import { useEmployees } from "@/contexts/EmployeeContext";
import { Clock, CheckSquare, Calendar, ShieldCheck, Briefcase } from "lucide-react";

export default function EmployeePortal() {
  const { currentUser } = useEmployees();

  // Basic diagnostic safety wrap fallback if user state updates are loading
  if (!currentUser) {
    return <div className="p-6 text-sm text-muted-foreground">Synchronizing profile parameters...</div>;
  }

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      
      {/* 
        ✅ MODIFIED: The complete header banner greeting card block ("Welcome Back, Sarah Chen") 
        that was located here has been entirely removed from the interface layout matrix.
      */}

      {/* RENDER REST OF DASHBOARD CONTENT GRIDS (REMAINS EXACTLY THE SAME) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card 1: Tasks Summary */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Assigned Task Workloads</span>
            <div className="p-2 bg-primary/10 text-primary rounded-lg"><CheckSquare size={16} /></div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">Active Workspace</p>
            <p className="text-xs text-muted-foreground mt-1">Review your prioritized team tasks inside the tracker channel.</p>
          </div>
        </div>

        {/* Metric Card 2: Shift Entry Logs */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Shift Records</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg"><Clock size={16} /></div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">Attendance Register</p>
            <p className="text-xs text-muted-foreground mt-1">Check-in and check-out to record your daily working hours duration.</p>
          </div>
        </div>

        {/* Metric Card 3: Security Status */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Account Scope</span>
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg"><ShieldCheck size={16} /></div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">Verified Portal</p>
            <p className="text-xs text-muted-foreground mt-1">Standard employee operational authorization matrix is active.</p>
          </div>
        </div>

      </div>

      {/* Secondary Dashboard Row Panel Grid */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
          <Briefcase size={16} className="text-primary" /> Workspace System Core
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Welcome to the Heigths IT Solutions enterprise operations suite. Use the interactive structural sidebar navigation links to toggle fluidly between tracking workflows, review salary statements, configure basic profiles desk accounts, or record shifts updates.
        </p>
      </div>

    </div>
  );
}