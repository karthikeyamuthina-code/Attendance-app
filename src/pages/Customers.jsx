import { useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { UserCheck, Search, Calendar, CheckCircle, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminAttendance() {
  const { employees } = useEmployees();
  
  // Base state configurations
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 🔢 PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ✅ Fixed to exactly 10 employees per page section

  // Filter roster items matching input parameters
  const filteredRoster = (employees || []).filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.email && emp.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // 🔢 PAGINATION CALCULATIONS
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoster.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRoster.length / itemsPerPage);

  // Calculate live statistical summaries for metrics card indicators based on selected date
  const totalRosterCount = filteredRoster.length;
  const totalPresentToday = filteredRoster.filter(emp => emp.history?.[selectedDate]?.present).length;
  const totalUnmarked = totalRosterCount - totalPresentToday;

  // Reset page position to 1 when a query search is entered
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      
      {/* HEADER BLOCK */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UserCheck className="text-primary" /> Employee Attendance Roster
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor real-time active workspace presence registries and shift timelines across your corporate teams.
          </p>
        </div>

        {/* SUMMARY STATS BLOCKS COUNTERS */}
        <div className="flex items-center gap-3">
          <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-center shadow-2xs">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Total Staff</p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{totalRosterCount}</p>
          </div>
          <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-center shadow-2xs">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Present Today</p>
            <p className="text-xl font-extrabold text-emerald-600 mt-0.5">{totalPresentToday}</p>
          </div>
          <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-center shadow-2xs">
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Unmarked Items</p>
            <p className="text-xl font-extrabold text-amber-600 mt-0.5">{totalUnmarked}</p>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH DISPATCH BAR */}
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
        <div className="relative w-full sm:w-44 shrink-0">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 font-mono"
          />
        </div>
        
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search roster by name, ID or email metrics..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-card border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* ROSTER TABLE CONTAINER */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-hidden shadow-2xs">
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider h-11">
                <th className="text-left py-2 px-4 font-semibold w-16">S.No</th>
                <th className="text-left py-2 px-4 font-semibold w-64">Employee</th>
                <th className="text-left py-2 px-4 font-semibold w-44">Designation</th>
                <th className="text-left py-2 px-4 font-semibold w-32">Login Time</th>
                <th className="text-left py-2 px-4 font-semibold w-32">Logout Time</th>
                <th className="text-left py-2 px-4 font-semibold w-36">Working Hours</th>
                <th className="text-center py-2 px-4 font-semibold w-36">Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-sm text-muted-foreground italic font-medium">
                    No active attendance log parameters found matching the query context.
                  </td>
                </tr>
              ) : (
                currentItems.map((emp, idx) => {
                  const dayLog = emp.history?.[selectedDate] || null;

                  return (
                    <tr key={emp.id || idx} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-16">
                      <td className="py-2 px-4 text-muted-foreground font-medium">
                        {indexOfFirstItem + idx + 1}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={emp.image || `https://api.dicebear.com/7.x/initials/svg?seed=${emp.name}`} 
                            alt="" 
                            className="w-9 h-9 rounded-full object-cover border bg-background shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{emp.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate font-medium mt-0.5">
                              <span className="font-mono bg-secondary px-1 py-0.25 rounded text-foreground font-semibold mr-1.5">{emp.empId}</span> 
                              {emp.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-muted-foreground text-xs font-semibold">{emp.skill}</td>
                      <td className="py-2 px-4 font-mono text-xs font-bold text-foreground">{dayLog?.time || "—"}</td>
                      <td className="py-2 px-4 font-mono text-xs font-bold text-foreground">{dayLog?.checkOutTime || "—"}</td>
                      <td className="py-2 px-4 text-xs font-bold text-primary">{dayLog?.workingHours || "—"}</td>
                      <td className="py-2 px-4 text-center">
                        {dayLog?.present ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 shadow-3xs">
                            <CheckCircle size={12} /> Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/80 text-muted-foreground">
                            <HelpCircle size={12} /> Unmarked
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ─── NEW PAGINATION CONTROLS BOTTOM BAR PANEL ─── */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground">
              Showing <span className="text-foreground font-bold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-foreground font-bold">
                {Math.min(indexOfLastItem, filteredRoster.length)}
              </span>{" "}
              of <span className="text-foreground font-bold">{filteredRoster.length}</span> team employees
            </span>

            <div className="flex items-center gap-1 select-none">
              {/* Previous page arrow toggle */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Numbered section button loops */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                      currentPage === pageNumber
                        ? "bg-primary text-primary-foreground shadow-xs shadow-primary/20"
                        : "border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next page arrow toggle */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}