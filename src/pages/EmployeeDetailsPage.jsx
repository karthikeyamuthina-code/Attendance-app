import { useState } from "react";
import { useEmployees } from "../contexts/EmployeeContext";
import { User, Code2, Info, CheckCircle2, Save, Mail, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmployeeDetailsPage() {
  const { currentUser, editEmployee } = useEmployees();
  const { toast } = useToast();

  if (!currentUser) {
    return <div className="p-6 text-sm text-muted-foreground">Loading structural profile dossier...</div>;
  }

  const [aboutText, setAboutText] = useState(
    currentUser.about || "React developer passionate about crafting pixel-perfect, highly operational user experiences and state architectures."
  );
  const [isEditing, setIsEditing] = useState(false);

  const skillsList = currentUser.skills || [
    "React.js", "Vite Build Tool", "JavaScript (ES6+)", "Tailwind CSS", "State Management Architecture"
  ];

  const handleSaveProfile = () => {
    if (editEmployee) {
      editEmployee(currentUser.id, { about: aboutText });
    }
    setIsEditing(false);
    toast({
      title: "Profile Synchronized",
      description: "Your professional bio overview parameters have been updated across systems.",
    });
  };

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <User className="text-primary" /> My Profile Workspace
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your corporate registry metrics, active skills index, and manage your public professional introduction statement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 shadow-xs lg:col-span-1">
          <div className="relative mx-auto w-24 h-24">
            <img 
              src={currentUser.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`} 
              alt={currentUser.name} 
              className="w-full h-full rounded-full object-cover border-2 border-primary/20 shadow-inner bg-secondary"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">{currentUser.name}</h2>
            <p className="text-xs font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded mt-1.5 inline-block select-all">
              ID: {currentUser.empId}
            </p>
          </div>

          <div className="pt-2 border-t border-border text-left space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase size={16} className="text-primary shrink-0" />
              <span className="font-medium text-foreground">{currentUser.skill}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground break-all">
              <Mail size={16} className="text-primary shrink-0" />
              <span className="select-all">{currentUser.email}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Info size={16} className="text-primary" /> Professional Summary
              </h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Edit Summary
                </button>
              ) : (
                <button 
                  onClick={handleSaveProfile}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                >
                  <Save size={12} /> Save
                </button>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full h-32 p-3 text-sm rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none font-sans leading-relaxed"
                maxLength={400}
              />
            ) : (
              <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                "{aboutText}"
              </p>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border pb-3">
              <Code2 size={16} className="text-primary" /> Endorsed Skillsets Index
            </h3>
            
            <div className="flex flex-wrap gap-2 pt-1">
              {skillsList.map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-primary/5 text-primary border border-primary/10 tracking-wide shadow-2xs"
                >
                  <CheckCircle2 size={12} className="text-primary" /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}