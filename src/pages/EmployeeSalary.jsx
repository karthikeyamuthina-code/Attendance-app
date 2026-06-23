import { useEmployees } from "../contexts/EmployeeContext";
import { Landmark, History, Download, CreditCard, ShieldCheck } from "lucide-react";

export default function EmployeeSalary() {
  const { currentUser, calculateMonthlySalaryMetrics } = useEmployees();

  if (!currentUser) {
    return <div className="p-6 text-sm text-muted-foreground">Loading salary dossier...</div>;
  }

  const currentMonthWindow = "2026-06";
  const businessDays = 26;
  const allowedLeaves = 3;

  // Derive dynamic parameters from context logic engines
  const liveMetrics = calculateMonthlySalaryMetrics(currentUser, currentMonthWindow);
  const isMonthPaid = (currentUser.payrollHistory || []).some(p => p.month === currentMonthWindow);

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
          <p className="text-3xl font-bold text-foreground">${liveMetrics.baseSalary.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
        </div>

        {/* Deductions Card */}
        <div className="bg-card border border-border p-5 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Active L.O.P. Deductions</p>
          <p className="text-3xl font-bold text-rose-500">${liveMetrics.lopDeduction.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Based on {liveMetrics.unexcusedAbsences} unexcused absent days</p>
        </div>

        {/* Net Payout Card */}
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Net Payout Estimate</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">${liveMetrics.netPayout.toLocaleString()}</p>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
              isMonthPaid ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
            }`}>
              {isMonthPaid ? "✓ Disbursed" : "⏳ Pending Remittance"}
            </span>
          </div>
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
          <div className="flex justify-between border-t border-dashed border-border pt-2"><span className="text-muted-foreground">Total Absences Tracked:</span> <span className="font-medium text-rose-500">{liveMetrics.totalAbsences} Days</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Company Leave Allowance Bypassed:</span> <span className="font-medium text-amber-500">{liveMetrics.unexcusedAbsences} Days</span></div>
        </div>
      </div>

      {/* Historical Payroll Ledger Table Module */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
          <History size={16} className="text-primary" /> Historical Payroll Ledger & Transactions Archive
        </h3>
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider h-10">
                <th className="text-left py-2 px-4 font-semibold">Billing Month</th>
                <th className="text-left py-2 px-4 font-semibold">Base Contract</th>
                <th className="text-left py-2 px-4 font-semibold">Absences / LOP</th>
                <th className="text-left py-2 px-4 font-semibold">Net Received</th>
                <th className="text-left py-2 px-4 font-semibold">Settlement Date</th>
                <th className="text-center py-2 px-4 font-semibold w-24">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {(!currentUser.payrollHistory || currentUser.payrollHistory.length === 0) ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-xs text-muted-foreground italic">
                    No historical disbursed receipts logged for this profile account node.
                  </td>
                </tr>
              ) : (
                currentUser.payrollHistory.map((receipt) => (
                  <tr key={receipt.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-12">
                    <td className="py-2 px-4 font-bold text-foreground">{receipt.month}</td>
                    <td className="py-2 px-4 text-muted-foreground">${receipt.baseSalary.toLocaleString()}</td>
                    <td className="py-2 px-4 text-rose-500 font-medium">-{receipt.absences}d / ${receipt.deductions}</td>
                    <td className="py-2 px-4 font-bold text-emerald-600">${receipt.netPayout.toLocaleString()}</td>
                    <td className="py-2 px-4 font-mono text-xs text-muted-foreground">{receipt.paymentDate}</td>
                    <td className="py-2 px-4 text-center">
                      <button 
                        onClick={() => window.print()}
                        className="p-1.5 rounded bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Download size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}