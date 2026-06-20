import { useState } from "react";
import { Search, DollarSign, CreditCard, Receipt, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useEmployees } from "../contexts/EmployeeContext";

export default function Pipeline() {
  const { employees } = useEmployees();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Active payment processing window target month
  const currentPayMonth = "June 2026";
  const targetYear = 2026;
  const targetMonthIndex = 5; // June (0-indexed)

  // 1. DYNAMIC BASELINE: Compute standard working days in the selected month (Excluding Sundays)
  const calculateStandardWorkingDays = (year, monthIdx) => {
    let daysCount = 0;
    const totalDays = new Date(year, monthIdx + 1, 0).getDate();
    
    // ✅ FIXED: Corrected loop variables comparison names down the line
    for (let d = 1; d <= totalDays; d++) {
      const checkDay = new Date(year, monthIdx, d).getDay();
      if (checkDay !== 0) daysCount++; // Exclude Sundays
    }
    return daysCount;
  };
  
  // Standard total working days in June 2026 excluding Sundays = 26 Days
  const totalDaysInCurrentMonth = calculateStandardWorkingDays(targetYear, targetMonthIndex) || 26;

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper calculation to resolve individual employee dynamic payouts
  const processEmployeePayroll = (emp) => {
    const baseSalary = emp.salaryMonth || 0;

    // A. Count total absences registered specifically for the active month view
    let monthlyAbsences = 0;
    Object.entries(emp.history || {}).forEach(([dateKey, record]) => {
      const recordDate = new Date(dateKey);
      if (recordDate.getFullYear() === targetYear && recordDate.getMonth() === targetMonthIndex) {
        if (record?.present === false) {
          monthlyAbsences++;
        }
      }
    });

    // B. Apply Corporate Leave Rules: 3 combined allowed leaves (2 Paid + 1 Emergency)
    const allowedLeavesThreshold = 3;
    const unpaidLeavesCount = Math.max(0, monthlyAbsences - allowedLeavesThreshold);

    // C. Calculate final dynamic payout deduction variables
    let finalNetPayout = baseSalary;
    if (unpaidLeavesCount > 0 && totalDaysInCurrentMonth > 0) {
      const dailySalaryRate = baseSalary / totalDaysInCurrentMonth;
      const totalLossOfPayDeduction = dailySalaryRate * unpaidLeavesCount;
      finalNetPayout = Math.max(0, Math.round(baseSalary - totalLossOfPayDeduction));
    }

    return {
      monthlyAbsences,
      unpaidLeavesCount,
      finalNetPayout
    };
  };

  // 2. COMPUTE GLOBAL DASHBOARD STATS OVERVIEW CARD LEDGERS (Using processed final dynamic values)
  const totalBaseMonthlyPayroll = filteredEmployees.reduce((sum, emp) => {
    const { finalNetPayout } = processEmployeePayroll(emp);
    return sum + finalNetPayout;
  }, 0);

  const averageEmployeeSalary = filteredEmployees.length > 0 
    ? Math.round(totalBaseMonthlyPayroll / filteredEmployees.length) 
    : 0;

  const totalAnnualPayrollCommitment = totalBaseMonthlyPayroll * 12;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Salary Details</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Payroll processing ledger sheet factoring in <strong>3 allowed company leaves</strong> (2 Paid + 1 Emergency)
          </p>
        </div>

        {/* Financial Overview Metrics Cards Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[320px] md:min-w-[550px]">
          <div className="bg-primary/5 border border-primary/10 p-3.5 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-primary">
              <DollarSign className="w-4 h-4" />
              <p className="text-[10px] font-bold uppercase tracking-wider">Net Monthly Payout</p>
            </div>
            <p className="text-xl font-bold text-foreground mt-1">${totalBaseMonthlyPayroll.toLocaleString()}</p>
          </div>
          
          <div className="bg-secondary/40 border border-border p-3.5 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <p className="text-[10px] font-bold uppercase tracking-wider">Average Paid Out</p>
            </div>
            <p className="text-xl font-bold text-foreground mt-1">${averageEmployeeSalary.toLocaleString()}</p>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Receipt className="w-4 h-4" />
              <p className="text-[10px] font-bold uppercase tracking-wider">Adjusted Annual Cost</p>
            </div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${totalAnnualPayrollCommitment.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Roster Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search payroll records by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition shadow-sm"
        />
      </div>

      {/* Salary Statements Ledger Table Data Grid */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-muted-foreground">
              <th className="text-left py-3 px-4 font-medium w-16">S.No</th>
              <th className="text-left py-3 px-4 font-medium">Employee Info</th>
              <th className="text-left py-3 px-4 font-medium">Designation</th>
              <th className="text-center py-3 px-4 font-medium w-32">Total Absences</th>
              <th className="text-right py-3 px-4 font-medium">Base Salary</th>
              <th className="text-right py-3 px-4 font-medium text-primary">Net Adjusted Payout</th>
              <th className="text-center py-3 px-4 font-medium w-36">Status</th>
              <th className="text-center py-3 px-4 font-medium w-36">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, i) => {
              // Calculate specific dynamic breakdown attributes for the loop iteration row item
              const { monthlyAbsences, unpaidLeavesCount, finalNetPayout } = processEmployeePayroll(emp);
              const baseSalary = emp.salaryMonth || 0;
              const hasSalaryDeduction = unpaidLeavesCount > 0;

              return (
                <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition">
                  <td className="py-4 px-4 text-muted-foreground font-medium">{i + 1}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.image} alt="" className="w-8 h-8 rounded-full object-cover border shrink-0 bg-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{emp.empId}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-muted-foreground">{emp.skill}</td>
                  
                  {/* Total Absences Registry Flag Column */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className={`font-semibold text-sm ${monthlyAbsences > 3 ? "text-rose-500 font-bold" : "text-foreground"}`}>
                        {monthlyAbsences} days
                      </span>
                      {hasSalaryDeduction && (
                        <span className="text-[10px] text-rose-400 font-medium">
                          ({unpaidLeavesCount} Days Unpaid L.O.P)
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Original Fixed Contract Base Salary */}
                  <td className="py-4 px-4 text-right text-muted-foreground font-medium">
                    ${baseSalary.toLocaleString()}
                  </td>
                  
                  {/* dynamic Net Adjusted Calculated Final Payment Display cell */}
                  <td className={`py-4 px-4 text-right font-bold text-sm ${hasSalaryDeduction ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
                    ${finalNetPayout.toLocaleString()}
                  </td>

                  {/* Dynamic Disbursement Status Tag */}
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      hasSalaryDeduction 
                        ? "bg-amber-500/10 text-amber-600" 
                        : "bg-emerald-500/10 text-emerald-600"
                    }`}>
                      {hasSalaryDeduction ? <AlertTriangle size={12}/> : <CheckCircle size={12}/>}
                      {hasSalaryDeduction ? "Deducted" : "Full Pay"}
                    </span>
                  </td>

                  {/* Action Print Pay Slip Trigger Option */}
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => alert(`Direct Bank Transfer Summary:\n\nEmployee: ${emp.name}\nBase Contract: $${baseSalary.toLocaleString()}\nAbsences Recorded: ${monthlyAbsences} days\nUnpaid Leave Days: ${unpaidLeavesCount}\n=====================\nFinal Disbursed Net Pay: $${finalNetPayout.toLocaleString()}`)}
                      className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Pay Slip
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-muted-foreground">No matching payroll statements found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}