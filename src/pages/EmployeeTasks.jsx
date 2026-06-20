import { useState } from "react";
import { useEmployees } from "../contexts/EmployeeContext";
import { ListTodo, CheckCircle, PlayCircle, ArrowRightCircle, Clock } from "lucide-react";

export default function EmployeeTasks() {
  // ✅ MODIFIED: Extracted toggleTaskStatus from our global context layer
  const { currentUser, tasks, toggleTaskStatus } = useEmployees();
  const [taskFilter, setTaskFilter] = useState("current"); 

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <Clock className="w-10 h-10 text-muted-foreground animate-spin mb-3" />
        <p className="text-sm text-muted-foreground font-medium">Loading personal tasks database...</p>
      </div>
    );
  }

  const myPersonalTasks = (tasks || []).filter(task => task.employeeId === currentUser.empId);
  const todayStr = new Date().toISOString().split("T")[0];

  const displayedTasksList = myPersonalTasks.filter((task) => {
    if (taskFilter === "completed") return task.completed === true;
    if (taskFilter === "current") return task.completed === false && task.dateAssigned <= todayStr;
    if (taskFilter === "future") return task.completed === false && task.dateAssigned > todayStr;
    return true;
  });

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-foreground">
            <ListTodo className="text-primary" /> My Dedicated Work Assignments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and click your assignment pill badges to toggle execution status updates instantly
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 bg-secondary/60 p-1 rounded-lg self-start sm:self-auto">
          {[
            { id: "current", label: "Performing Now" },
            { id: "completed", label: "Completed" },
            { id: "future", label: "Future Scheduled" },
            { id: "all", label: "All" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTaskFilter(tab.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                taskFilter === tab.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-4 font-semibold w-12">S.No</th>
              <th className="text-left py-3 px-4 font-semibold">Objective Assignment Description</th>
              <th className="text-center py-3 px-4 font-semibold w-40">Assigned Target Date</th>
              <th className="text-center py-3 px-4 font-semibold w-36">Timeline State</th>
            </tr>
          </thead>
          <tbody>
            {displayedTasksList.map((task, idx) => (
              <tr key={task.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition">
                <td className="py-4 px-4 text-muted-foreground font-medium">{idx + 1}</td>
                <td className="py-4 px-4 text-foreground font-medium leading-relaxed">{task.text}</td>
                <td className="py-4 px-4 text-center text-muted-foreground font-mono text-xs">{task.dateAssigned}</td>
                <td className="py-4 px-4 text-center">
                  
                  {/* ✅ MODIFIED: Wrapped the badge in an interactive button with active tap sizing feedback triggers */}
                  <button
                    type="button"
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer hover:opacity-80 active:scale-95 select-none border ${
                      task.completed 
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" 
                        : task.dateAssigned > todayStr 
                        ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
                    }`}
                    title="Click pill to toggle status"
                  >
                    {task.completed ? (
                      <>
                        <CheckCircle size={11} /> Completed
                      </>
                    ) : task.dateAssigned > todayStr ? (
                      <>
                        <ArrowRightCircle size={11} /> Future
                      </>
                    ) : (
                      <>
                        <PlayCircle size={11} className="animate-pulse" /> Performing Now
                      </>
                    )}
                  </button>

                </td>
              </tr>
            ))}
            {displayedTasksList.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-muted-foreground italic bg-secondary/5">
                  No active work tasks found matching this status timeline filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}