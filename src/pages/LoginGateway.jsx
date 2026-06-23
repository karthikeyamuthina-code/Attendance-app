import { useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { Shield, User, Lock, Key, ArrowLeft, Zap, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginGateway() {
  const { loginAsAdmin, loginAsEmployee } = useEmployees();
  const { toast } = useToast();

  // 'select' = Initial selection gateway card screen, 'admin' = admin login fields, 'employee' = employee login fields
  const [viewState, setViewState] = useState("select");
  
  // Form variables fields
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleBackToGateway = () => {
    setViewState("select");
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (!usernameInput.trim() || !passwordInput.trim()) {
      toast({
        title: "Missing Parameters",
        description: "Please populate both fields completely before verifying authorizations.",
        variant: "destructive"
      });
      return;
    }

    if (viewState === "admin") {
      const res = loginAsAdmin(usernameInput.trim(), passwordInput.trim());
      if (res.success) {
        toast({ title: "Welcome Administrator", description: "Secure core subsystem dashboard authorization mapped successfully." });
      } else {
        toast({ title: "Authorization Denied", description: res.msg, variant: "destructive" });
      }
    } else {
      const res = loginAsEmployee(usernameInput.trim(), passwordInput.trim());
      if (res.success) {
        toast({ title: "Authentication Complete", description: "Successfully established portal sync parameters." });
      } else {
        toast({ title: "Authentication Denied", description: res.msg, variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-[#0a0e1a] overflow-hidden">
      
      {/* BACKGROUND DECORATIVE GLOW SPHERES ELEMENT EFFECT */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />
      
      {/* MAIN PREMIUM EMBEDDED CONSOLE WRAP CONTAINER */}
      <div className="w-full max-w-[480px] bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 transition-all duration-300">
        
        {/* BRAND IDENTITY LOGO HEADER HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20 mb-4 ring-4 ring-primary/10">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Heigths IT Solutions</h1>
          <p className="text-xs text-slate-400 font-medium mt-1 max-w-[280px]">
            Enterprise Unified Workspace Cryptographic Access Interface Matrix
          </p>
        </div>

        {/* VIEW SCREEN SWITCHER LOGIC CONDITION PANEL */}
        {viewState === "select" ? (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-bold text-slate-400 text-center tracking-wider uppercase mb-2">
              Select Access Gateway Portal Side
            </p>

            {/* BUTTON SELECTION 1: MANAGEMENT PORTAL LINK PANEL */}
            <button
              onClick={() => setViewState("admin")}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-primary/50 text-left transition-all duration-200 group hover:bg-slate-800/80 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">Management Portal</p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 mt-0.5 leading-relaxed">
                  Verify master credentials to monitor metrics dashboards and task scopes.
                </p>
              </div>
            </button>

            {/* BUTTON SELECTION 2: EMPLOYEE PORTAL LINK PANEL */}
            <button
              onClick={() => setViewState("employee")}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-indigo-500/50 text-left transition-all duration-200 group hover:bg-slate-800/80 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">Employee Workspace</p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 mt-0.5 leading-relaxed">
                  Log in to input daily workspace shifts trackers and explore assigned workflows.
                </p>
              </div>
            </button>
          </div>
        ) : (
          
          /* VIEW SCREEN SWITCHER LOGIC CONDITION PANEL B: INTEGRATED CREDENTIAL INPUTS FORMS PANEL */
          <form onSubmit={handleLoginSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
            
            {/* BACK BUTTON SLIDE ANCHOR BAR */}
            <button
              type="button"
              onClick={handleBackToGateway}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-all mb-1 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to portal selectors
            </button>

            <div className="bg-slate-800/20 border border-slate-800 rounded-xl px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Selected Pathway:</span>
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                viewState === "admin" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }`}>
                {viewState === "admin" ? "Management / Admin" : "Staff Employee"}
              </span>
            </div>

            {/* FIELD 1: IDENTIFIER TOKEN DISPATCH INPUT AREA */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {viewState === "admin" ? "System Administrator Account Username" : "Staff Profile Target Identifier (ID, Email or Phone)"}
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder={viewState === "admin" ? "e.g. admin" : "e.g. NX-2025-0001 or email..."}
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950/50 border border-slate-800 text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* FIELD 2: CRYTOGRAPHIC SECURE PIN INPUT CONTAINER BLOCK AREA */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Security Passcode Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950/50 border border-slate-800 text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* INSTRUCTIONS TRIVIA SNIPPET AREA TOOLTIP PANEL */}
            <div className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 leading-relaxed font-medium">
              <span className="font-bold text-slate-300 block mb-0.5">Quick Testing Hints:</span>
              {viewState === "admin" ? (
                <span>Use username <code className="text-blue-400 font-mono font-bold bg-slate-900 px-1 rounded">admin</code> and password <code className="text-blue-400 font-mono font-bold bg-slate-900 px-1 rounded">admin123</code> to gain system management clearance fields.</span>
              ) : (
                <span>Use credentials like <code className="text-emerald-400 font-mono font-bold bg-slate-900 px-1 rounded">sarah@techstart.io</code> with password <code className="text-emerald-400 font-mono font-bold bg-slate-900 px-1 rounded">password123</code>.</span>
              )}
            </div>

            {/* ACTION DISPATCH TRIGGER SUBMIT CONTROL BAR BUTTON */}
            <button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground font-bold text-sm rounded-xl shadow-lg shadow-primary/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 size={16} /> Authenticate Session File
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
}