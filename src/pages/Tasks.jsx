import { useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { CheckSquare, Plus, X, Calendar, User, FileText, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Tasks() {
  const { employees, tasks, addTask } = useEmployees();
  const { toast } = useToast();
  
  // Controls the slide panel drawer visibility state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form Field States
  const [taskText, setTaskText] = useState("");
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (!taskText.trim() || !selectedEmpId) {
      toast({
        title: "Validation Error",
        description: "Please populate all mandatory task text objectives and assignment fields.",
        variant: "destructive"
      });
      return;
    }

    const assignedEmployee = employees.find(emp => emp.empId === selectedEmpId);

    const newTaskObj = {
      text: taskText,
      employeeId: selectedEmpId,
      employeeName: assignedEmployee ? assignedEmployee.name : "Unknown Staff",
      designation: assignedEmployee ? assignedEmployee.skill : "Staff Member",
      dateAssigned: targetDate,
    };

    addTask(newTaskObj);
    
    // Reset Form & Close Drawer
    setTaskText("");
    setSelectedEmpId("");
    setIsPanelOpen(false);

    toast({
      title: "Task Assigned",
      description: `Successfully allocated operational objective to ${newTaskObj.employeeName}.`,
    });
  };

  // Filter Tasks via Global Search Bar
  const filteredTasks = tasks.filter(t => 
    t.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6 relative min-h-[calc(100vh-4rem)]">
      
      {/* HEADER BAR SUMMARY */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CheckSquare className="text-primary" /> Task Assignments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Dispatch milestones to employees and monitor their real-time execution progress.
          </p>
        </div>
        
        {/* Trigger Button to Slide Open Form Drawer */}
        <button
          onClick={() => setIsPanelOpen(true)}
          className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-sm hover:opacity-95 transition-all select-none self-start sm:self-center"
        >
          <Plus size={16} /> Assign New Task
        </button>
      </div>

      {/* FILTER SEARCH DISPATCH BAR */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search tasks by ID, name, or objective..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 px-4 rounded-lg bg-card border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
      </div>

      {/* RENDER TASKS MAIN REGISTRY TABLE */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-hidden shadow-2xs">
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider h-11">
                <th className="text-left py-2 px-4 font-semibold w-16">S.No</th>
                <th className="text-left py-2 px-4 font-semibold w-36">Employee ID</th>
                <th className="text-left py-2 px-4 font-semibold w-48">Employee Name</th>
                <th className="text-left py-2 px-4 font-semibold w-40">Designation</th>
                <th className="text-left py-2 px-4 font-semibold">Assigned Task Objective</th>
                <th className="text-left py-2 px-4 font-semibold w-32">Due Date</th>
                <th className="text-center py-2 px-4 font-semibold w-32">Task Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-sm text-muted-foreground italic font-medium">
                    No active assignments matched current metrics.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task, idx) => (
                  <tr key={task.id || idx} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-14">
                    <td className="py-2 px-4 text-muted-foreground font-medium">{idx + 1}</td>
                    <td className="py-2 px-4 font-mono text-xs font-bold text-foreground select-all">{task.employeeId}</td>
                    <td className="py-2 px-4 font-bold text-foreground">{task.employeeName}</td>
                    <td className="py-2 px-4 text-muted-foreground text-xs font-semibold">{task.designation}</td>
                    <td className="py-2 px-4 text-foreground font-medium pr-6">{task.text}</td>
                    <td className="py-2 px-4 font-mono text-xs font-bold text-foreground">{task.dateAssigned}</td>
                    <td className="py-2 px-4 text-center">
                      {task.completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600">
                          <CheckCircle2 size={12} /> Finished
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600">
                          <Clock size={12} /> Incomplete
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── SLIDE-OUT RIGHT PANEL DRAWER ─── */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Slide-out Form Card Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-card border-l border-border shadow-2xl z-50 flex flex-col p-6 space-y-6"
            >
              {/* Drawer Top Navigation Section */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="text-primary w-5 h-5" />
                  <h3 className="text-base font-bold text-foreground">Create New Task Assignment</h3>
                </div>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body Fields Wrapper */}
              <form onSubmit={handleSubmitTask} className="flex-1 flex flex-col space-y-5 overflow-y-auto pr-1">
                
                {/* Field: Description Description text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FileText size={14} className="text-primary" /> Task Description / Objective
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify target milestones, execution scopes, or operational requirements details..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none leading-relaxed"
                  />
                </div>

                {/* Field: Employee Selection Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} className="text-primary" /> Assignee Staff Member
                  </label>
                  <select
                    value={selectedEmpId}
                    onChange={(e) => setSelectedEmpId(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Choose Employee Profile...</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.empId}>
                        {emp.name} ({emp.skill})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field: Target Calendar Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" /> Target Delivery Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-mono font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                {/* Actions Row at bottom of drawer */}
                <div className="pt-6 border-t border-border flex items-center justify-end gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => setIsPanelOpen(false)}
                    className="h-10 px-4 rounded-lg border border-border text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-md hover:opacity-95 active:scale-98 transition-all"
                  >
                    Confirm & Save
                  </button>
                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}