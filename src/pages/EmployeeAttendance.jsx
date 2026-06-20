import { useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, UserCheck, AlertCircle } from "lucide-react";

export default function EmployeeAttendance() {
  const { currentUser, setAttendanceStatus } = useEmployees();
  const { toast } = useToast();
  
  const todayStr = new Date().toISOString().split("T")[0];
  const userHistory = currentUser?.history || {};
  const todayRecord = userHistory[todayStr] || { present: false, time: "—", checkOutTime: "—", workingHours: "—" };

  const handleToggleCheckIn = (checked) => {
    if (checked) {
      const timeString = new Date().toLocaleTimeString();
      setAttendanceStatus(currentUser.id, todayStr, {
        present: true,
        time: timeString,
        workingHours: "Calculating..."
      });
      toast({
        title: "Checked In Successfully",
        description: `Your log-in timestamp recorded at ${timeString}.`,
      });
    }
  };

  const handleToggleCheckOut = (checked) => {
    if (!todayRecord.present) {
      toast({
        title: "Action Restricted",
        description: "You must execute a dynamic Check-In checkbox assignment before marking output.",
        variant: "destructive",
      });
      return;
    }

    if (checked) {
      const logOutTimeStr = new Date().toLocaleTimeString();
      
      // Calculate work duration dynamically
      let durationStr = "—";
      try {
        const now = new Date();
        const [time, modifier] = todayRecord.time.split(" ");
        let [hours, minutes, seconds] = time.split(":");
        if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
        if (modifier === "AM" && hours === "12") hours = 0;
        
        const checkInDateObj = new Date();
        checkInDateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
        
        const diffMs = now - checkInDateObj;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        durationStr = `${diffHrs}h ${diffMins}m`;
      } catch (err) {
        durationStr = "Tracked";
      }

      setAttendanceStatus(currentUser.id, todayStr, {
        checkOutTime: logOutTimeStr,
        workingHours: durationStr
      });

      toast({
        title: "Checked Out Successfully",
        description: `Your log-out timestamp recorded at ${logOutTimeStr}.`,
      });
    }
  };

  // Metric compilation handlers
  const historyKeys = Object.keys(userHistory);
  const totalPresents = historyKeys.filter(k => userHistory[k]?.present).length;

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <UserCheck className="text-primary" /> My Attendance Register
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Toggle shift actions daily to maintain your operational work logs.
        </p>
      </div>

      {/* TERMINAL OPERATIONS CONTROLS */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Calendar size={16} className="text-primary" />
          <span>Current Date Stamp:</span>
          <span className="font-mono bg-secondary px-2 py-0.5 rounded text-foreground font-bold">{todayStr}</span>
        </div>

        {/* ✅ MODIFIED: Transformed layouts into clean operational action checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          {/* Check-In Option */}
          <label className={`flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all select-none ${
            todayRecord.present ? "bg-emerald-500/5 border-emerald-500/30" : "bg-card hover:bg-secondary/40 border-border"
          }`}>
            <input 
              type="checkbox"
              checked={todayRecord.present}
              disabled={todayRecord.present}
              onChange={(e) => handleToggleCheckIn(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed accent-primary"
            />
            <div>
              <p className="text-sm font-bold text-foreground">Mark Attendance Check-In</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {todayRecord.present ? `Logged at ${todayRecord.time}` : "Toggle to register entry timestamp"}
              </p>
            </div>
          </label>

          {/* Check-Out Option */}
          <label className={`flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all select-none ${
            todayRecord.checkOutTime && todayRecord.checkOutTime !== "—" ? "bg-blue-500/5 border-blue-500/30" : "bg-card hover:bg-secondary/40 border-border"
          }`}>
            <input 
              type="checkbox"
              checked={todayRecord.checkOutTime && todayRecord.checkOutTime !== "—"}
              disabled={!todayRecord.present || (todayRecord.checkOutTime && todayRecord.checkOutTime !== "—")}
              onChange={(e) => handleToggleCheckOut(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed accent-primary"
            />
            <div>
              <p className="text-sm font-bold text-foreground">Mark Attendance Check-Out</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {todayRecord.checkOutTime && todayRecord.checkOutTime !== "—" ? `Logged at ${todayRecord.checkOutTime}` : "Toggle to finalize shift session metrics"}
              </p>
            </div>
          </label>

        </div>
      </div>

      {/* SUMMARY PERFORMANCE LOGS COUNTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Present Days</p>
            <p className="text-3xl font-extrabold text-foreground mt-2">{totalPresents}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">✓</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Shift Duration Today</p>
            <p className="text-3xl font-extrabold text-primary mt-2">{todayRecord.workingHours || "—"}</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-col"><Clock size={20}/></div>
        </div>
      </div>

      {/* HISTORICAL WORKSHIFT ENTRY TABLE */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-foreground mb-4">Shift Entry Log Sheets</h3>
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider h-11">
                <th className="text-left py-2 px-4 font-semibold w-16">S.No</th>
                <th className="text-left py-2 px-4 font-semibold w-36">Date String</th>
                <th className="text-left py-2 px-4 font-semibold w-36">Clock-In Time</th>
                <th className="text-left py-2 px-4 font-semibold w-36">Clock-Out Time</th>
                <th className="text-left py-2 px-4 font-semibold w-40">Total Work Hours</th>
                <th className="text-left py-2 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {historyKeys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-sm text-muted-foreground italic font-medium">No system shift logs recorded yet.</td>
                </tr>
              ) : (
                historyKeys.map((dateKey, idx) => {
                  const record = userHistory[dateKey];
                  return (
                    <tr key={dateKey} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-14">
                      <td className="py-2 px-4 text-muted-foreground font-medium">{idx + 1}</td>
                      <td className="py-2 px-4 font-bold text-foreground">{dateKey}</td>
                      <td className="py-2 px-4 font-mono text-xs font-semibold text-foreground">{record.time || "—"}</td>
                      <td className="py-2 px-4 font-mono text-xs font-semibold text-foreground">{record.checkOutTime || "—"}</td>
                      <td className="py-2 px-4 font-medium text-primary">{record.workingHours || "—"}</td>
                      <td className="py-2 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600">Present</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}