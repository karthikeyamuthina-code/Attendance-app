import { useState } from "react";
import { useEmployees } from "../contexts/EmployeeContext";
import { ShieldAlert, UserCheck, Lock, Mail, ChevronLeft, Zap } from "lucide-react";

export default function LoginGateway() {
  const { loginAsAdmin, loginAsEmployee } = useEmployees();
  const [selectedRole, setSelectedRole] = useState(null); // 'admin' | 'employee' | null
  
  // Form States
  const [identifier, setIdentifier] = useState(""); // email/phone or admin username
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (selectedRole === "admin") {
      const res = loginAsAdmin(identifier, password);
      if (!res.success) setErrorMsg(res.msg);
    } else {
      const res = loginAsEmployee(identifier, password);
      if (!res.success) setErrorMsg(res.msg);
    }
  };

  // State Reset on back button click
  const handleBackToSelection = () => {
    setSelectedRole(null);
    setIdentifier("");
    setPassword("");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 select-none">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6">
        
        {/* Branding Logo Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Heigths IT Solutions</h1>
          <p className="text-xs text-muted-foreground">Unified Workplace Workspace Management Network</p>
        </div>

        {/* STEP A: ROLE SELECTION CARDS VIEW */}
        {selectedRole === null ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-center text-muted-foreground pb-2">Select your login portal side:</p>
            
            <button 
              onClick={() => setSelectedRole("admin")}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/70 text-left transition-all active:scale-98 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Management Portal</h3>
                <p className="text-xs text-muted-foreground">Access payroll controls, rosters, and task dispatch tools.</p>
              </div>
            </button>

            <button 
              onClick={() => setSelectedRole("employee")}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/70 text-left transition-all active:scale-98 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Employee Workspace</h3>
                <p className="text-xs text-muted-foreground">Check your personal metrics, task tracking lists, and payslips.</p>
              </div>
            </button>
          </div>
        ) : (
          /* STEP B: SECURE AUTHFUL LOGIN FIELD INPUTS FORM VIEW */
          <form onSubmit={handleLoginSubmit} className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <button 
              type="button" 
              onClick={handleBackToSelection}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium mb-2 transition-colors"
            >
              <ChevronLeft size={14} /> Back to selection
            </button>

            <h2 className="text-sm font-bold text-foreground capitalize">
              Logging into {selectedRole} account
            </h2>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-semibold bg-rose-500/5 p-2.5 rounded-lg border border-rose-500/10">
                ❌ {errorMsg}
              </p>
            )}

            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type={selectedRole === "admin" ? "text" : "email"}
                  placeholder={selectedRole === "admin" ? "Admin Username" : "Portal Email Address"}
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password"
                  placeholder="Enter secret portal password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition font-sans"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-10 mt-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-95 active:scale-98 transition shadow-md"
            >
              Open Secure Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  );
}