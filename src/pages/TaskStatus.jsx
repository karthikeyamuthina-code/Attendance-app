import { useState } from "react";
import { CheckCircle, Clock, ListTodo, Search } from "lucide-react";
import { useEmployees } from "../contexts/EmployeeContext";

export default function TaskStatus() {
  const { tasks } = useEmployees();
  const [searchQuery, setSearchQuery] = useState("");

  // Safely grab from context state array or fallback to prevent 0-count errors
  const activeTasksList = tasks || [];

  // ✅ ADDED: Live Search filter match functionality matching your other dashboard panels
  const filteredTasks = activeTasksList.filter(t =>
    t.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.employeeId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute status analytics metrics dynamically from context state securely
  const totalTasks = activeTasksList.length;
  const completedTasks = activeTasksList.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Task Status</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor real-time progress summaries and completion rates across all team workloads
        </p>
      </div>

      {/* Analytics Summary Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <ListTodo size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Managed Tasks</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{totalTasks}</p>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Completed Milestones</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{completedTasks}</p>
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pending Operations</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">{pendingTasks}</p>
          </div>
        </div>
      </div>

      {/* ✅ ADDED: Search Filter Input Input Bar to let you search through assignments instantly */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by ID, name, or objective..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition shadow-sm"
        />
      </div>

      {/* Overview Progress Status Table Bar */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-muted-foreground">
              <th className="text-left py-3 px-4 font-medium w-16">S.No</th>
              <th className="text-left py-3 px-4 font-medium w-36">Employee ID</th>
              <th className="text-left py-3 px-4 font-medium w-48">Employee Name</th>
              <th className="text-left py-3 px-4 font-medium w-44">Designation</th>
              <th className="text-left py-3 px-4 font-medium min-w-[280px]">Assigned Task Objective</th>
              <th className="text-center py-3 px-4 font-medium w-40">Due Date</th>
              <th className="text-center py-3 px-4 font-medium w-36">Current State</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, i) => (
              <tr key={task.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-14">
                <td className="py-2 px-4 text-muted-foreground font-medium">{i + 1}</td>
                <td className="py-2 px-4 font-mono text-xs font-semibold text-foreground select-all">{task.employeeId || "N/A"}</td>
                <td className="py-2 px-4 font-semibold text-foreground">{task.employeeName}</td>
                <td className="py-2 px-4 text-muted-foreground truncate max-w-[160px]">{task.designation || "Staff"}</td>
                <td className="py-2 px-4 text-foreground font-medium">
                  <div className="max-w-xs truncate" title={task.text}>
                    {task.text}
                  </div>
                </td>
                <td className="py-2 px-4 text-center text-muted-foreground font-medium font-sans">{task.dateAssigned}</td>
                <td className="py-2 px-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    task.completed 
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" 
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
                  }`}>
                    {task.completed ? "Completed" : "In Progress"}
                  </span>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground italic">
                  No managed task progress datasets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}