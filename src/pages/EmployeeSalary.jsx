import { useEmployees } from "../contexts/EmployeeContext";
import { DollarSign, Calendar, AlertTriangle, CreditCard, ShieldCheck } from "lucide-react";

export default function EmployeeSalary() {
  const { currentUser } = useEmployees();

  if (!currentUser) {
    return <div className="p-6 text-sm text-muted-foreground">Loading salary dossier...</div>;
  }

  // --- 📊 CALCULATE PAYROLL STATISTICS ---
  const baseSalary = currentUser.salaryMonth || 0;
  const businessDays = 26;
  
  // Count absences for the current month
  let totalAbsences = 0;
  const targetMonthIndex = new Date().getMonth(); 
  const targetYear = new Date().getFullYear();

  Object.entries(currentUser.history || {}).forEach(([dateKey, record]) => {
    const recordDate = new Date(dateKey);
    if (recordDate.getFullYear() === targetYear && recordDate.getMonth() === targetMonthIndex && record?.present === false) {
      totalAbsences++;
    }
  });

  const allowedLeaves = 3;
  const lopDays = Math.max(0, totalAbsences - allowedLeaves);
  const dailyRate = baseSalary / businessDays;
  const totalDeductions = Math.round(lopDays * dailyRate);
  const netPayout = Math.max(0, Math.round(baseSalary - totalDeductions));

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <CreditCard className="text-primary" /> Compensation & Payroll Statement
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your contractual base metrics, active loss-of-pay logs, and current estimated monthly payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Base Contract Card */}
        <div className="bg-card border border-border p-5 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Base Contract Salary</p>
          <p className="text-3xl font-bold text-foreground">${baseSalary.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
        </div>

        {/* Deductions Card */}
        <div className="bg-card border border-border p-5 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Active L.O.P. Deductions</p>
          <p className="text-3xl font-bold text-rose-500">${totalDeductions.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Based on {lopDays} unexcused absent days</p>
        </div>

        {/* Net Payout Card */}
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Net Payout Estimate</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">${netPayout.toLocaleString()}</p>
        </div>
      </div>

      {/* Breakdown Details Table */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
          <ShieldCheck size={16} className="text-primary" /> Detailed Statement Breakdown
        </h3>
        <div className="space-y-3 text-sm max-w-md">
          <div className="flex justify-between"><span className="text-muted-foreground">Employee Name:</span> <span className="font-semibold">{currentUser.name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Account Corporate ID:</span> <span className="font-mono font-bold">{currentUser.empId}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Standard Work Days / Month:</span> <span className="font-medium">{businessDays} Days</span></div>
          <div className="flex justify-between border-t border-dashed border-border pt-2"><span className="text-muted-foreground">Total Absences Tracked:</span> <span className="font-medium text-rose-500">{totalAbsences} Days</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Company Leave Allowance Bypassed:</span> <span className="font-medium text-amber-500">{allowedLeaves} Days</span></div>
        </div>
      </div>
    </div>
  );
}