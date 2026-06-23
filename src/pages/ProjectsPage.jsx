import { useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { Plus, X, FolderKanban, FileText, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ProjectsPage() {
  const { projects, addProject } = useEmployees(); 
  const { toast } = useToast();
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form Field States
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please specify a valid Project title name requirement.",
        variant: "destructive"
      });
      return;
    }

    const generatedId = `PRJ-2026-${String((projects || []).length + 1).padStart(4, "0")}`;

    const newProjectObj = {
      projectId: generatedId,
      name: projectName.trim(),
      description: projectDesc.trim() || "No additional description summary logs documented."
    };

    addProject(newProjectObj);
    
    setProjectName("");
    setProjectDesc("");
    setIsPanelOpen(false);

    toast({
      title: "Project Initialized",
      description: `Successfully generated workflow matrix registry ${generatedId}.`,
    });
  };

  const filteredProjects = (projects || []).filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6 relative min-h-[calc(100vh-4rem)]">
      
      {/* HEADER SECTION PANEL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderKanban className="text-primary" /> Corporate Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Initialize structural project workflows, generate auto-tracking identifiers, and log base specifications.
          </p>
        </div>
        
        <button
          onClick={() => setIsPanelOpen(true)}
          className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-sm hover:opacity-95 transition-all self-start sm:self-center"
        >
          <Plus size={16} /> Create New Project
        </button>
      </div>

      {/* FILTER SEARCH DISPATCH BAR */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search projects by ID or key name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 px-4 rounded-lg bg-card border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
      </div>

      {/* REGISTRY RECORD GRID LAYOUT TABLE */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-hidden shadow-2xs">
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider h-11">
                <th className="text-left py-2 px-4 font-semibold w-16">S.No</th>
                <th className="text-left py-2 px-4 font-semibold w-40">Project ID</th>
                <th className="text-left py-2 px-4 font-semibold w-60">Project Name</th>
                {/* ✅ MODIFIED: Status column header removed from the sequence row */}
                <th className="text-left py-2 px-4 font-semibold">Scope Specifications / Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm text-muted-foreground italic font-medium">
                    No registered corporate projects match query filter parameters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project, idx) => (
                  <tr key={project.id || idx} className="border-b border-border last:border-0 hover:bg-secondary/10 transition h-14">
                    <td className="py-2 px-4 text-muted-foreground font-medium">{idx + 1}</td>
                    <td className="py-2 px-4 font-mono text-xs font-bold text-primary select-all">{project.projectId}</td>
                    <td className="py-2 px-4 font-bold text-foreground">{project.name}</td>
                    {/* ✅ MODIFIED: Render cells updated to cleanly snap layouts together without a status data frame element */}
                    <td className="py-2 px-4 text-muted-foreground text-xs font-medium leading-relaxed pr-4">{project.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE-OUT RIGHT PANEL DRAWER FORM */}
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
              className="fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-card border-l border-border shadow-2xl z-50 flex flex-col p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <FolderKanban className="text-primary w-5 h-5" />
                  <h3 className="text-base font-bold text-foreground">Initialize Corporate Project</h3>
                </div>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitProject} className="flex-1 flex flex-col space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Hash size={14} className="text-primary" /> Project Title Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Website Overhaul, Printasia Redesign..."
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <FileText size={14} className="text-primary" /> Scope / Description
                    </label>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase bg-secondary/80 px-1.5 py-0.5 rounded tracking-wide">Optional</span>
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Add brief details regarding targets, workflow components, structural goals..."
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none leading-relaxed"
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
                    Save Project
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