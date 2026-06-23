import { useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { Plus, X, CheckSquare, Calendar, User, FolderKanban, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Tasks() {
  const { tasks, addTask, employees, projects } = useEmployees();
  const { toast } = useToast();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
    if (projects && projects.length > 0) setSelectedProjectId(projects[0].id.toString());
    if (employees && employees.length > 0) setSelectedEmployeeId(employees[0].empId);
  };

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();

    const targetProject = projects.find(p => p.id.toString() === selectedProjectId);
    const targetEmployee = employees.find(emp => emp.empId === selectedEmployeeId);

    if (!targetProject || !targetEmployee) {
      toast({
        title: "Assignment Failed",
        description: "Please select a valid project and an employee to assign.",
        variant: "destructive"
      });
      return;
    }

    const newTaskPayload = {
      text: `${targetProject.name} — ${targetProject.description}`,
      employeeId: targetEmployee.empId,
      employeeName: targetEmployee.name,
      designation: targetEmployee.skill || "Team Member",
      dateAssigned: targetDate
    };

    addTask(newTaskPayload);
    setIsPanelOpen(false);

    toast({
      title: "Task Assigned Successfully",
      description: `Assigned "${targetProject.name}" to ${targetEmployee.name}.`,
    });
  };

  const filteredTasks = (tasks || []).filter(task => 
    task.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6 relative min-h-[calc(100vh-4rem)]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CheckSquare className="text-primary" /> Task Assignments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Dispatch milestones to employees and monitor their real-time execution progress.
          </p>
        </div>
        
        <button
          onClick={handleOpenPanel}
          className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-sm hover:opacity-95 transition-all self-start sm:self-center"
        >
          <Plus size={16} /> New Assignment
        </button>
      </div>

      {/* FILTER SEARCH BAR */}
      <div className="w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks by ID, name, or objective..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-card border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* ASSIGNMENTS ROSTER LIST */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-hidden shadow-2xs">
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[750px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider h-11">
                <th className="text-left py-2 px-4 font-semibold w-16">S.No</th>
                <th className="text-left py-2 px-4 font-semibold w-36">Employee ID</th>
                <th className="text-left py-2 px-4 font-semibold w-48">Employee Name</th>
                <th className="text-left py-2 px-4 font-semibold w-44">Designation</th>
                <th className="text-left py-2 px-4 font-semibold">Assigned Task Objective / Project Description</th>
                {/* ✅ MODIFIED: Removed Status Column Header */}
                <th className="text-left py-2 px-4 font-semibold w-36">Target Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-sm text-muted-foreground italic font-medium">
                    No task tracking assignments logged matching the query context.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task, idx) => (
                  <tr key={task.id || idx} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-14">
                    <td className="py-2 px-4 text-muted-foreground font-medium">{idx + 1}</td>
                    <td className="py-2 px-4 font-mono text-xs font-bold text-foreground">{task.employeeId}</td>
                    <td className="py-2 px-4 font-bold text-foreground">{task.employeeName}</td>
                    <td className="py-2 px-4 text-xs font-semibold text-muted-foreground">{task.designation}</td>
                    <td className="py-2 px-4 text-foreground text-xs font-medium pr-4 leading-relaxed">{task.text}</td>
                    {/* ✅ MODIFIED: Cleaned out status column cell block completely */}
                    <td className="py-2 px-4 font-mono text-xs text-muted-foreground">{task.dateAssigned}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE TASK ASSIGNMENT DRAWER SIDE SHEET */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-[460px] bg-card border-l border-border shadow-2xl z-50 flex flex-col p-6 space-y-6"
            >
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

              <form onSubmit={handleCreateTaskSubmit} className="flex-1 flex flex-col space-y-5 overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FolderKanban size={14} className="text-primary" /> Select Source Project Workflow <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer"
                  >
                    {projects && projects.length === 0 ? (
                      <option value="">No projects found. Create one first!</option>
                    ) : (
                      projects.map(p => (
                        <option key={p.id} value={p.id}>
                          [{p.projectId}] {p.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {selectedProjectId && projects.find(p => p.id.toString() === selectedProjectId) && (
                  <div className="p-3 bg-secondary/30 border border-border rounded-lg text-xs text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground block mb-0.5">Project Scope Preview:</span>
                    {projects.find(p => p.id.toString() === selectedProjectId).description}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} className="text-primary" /> Assignee Staff Member <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.empId}>
                        {emp.name} ({emp.skill || "Staff"}) — {emp.empId}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" /> Target Delivery Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 font-mono"
                  />
                </div>

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