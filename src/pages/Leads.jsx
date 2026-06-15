import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Trash2, Edit2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useEmployees } from "../contexts/EmployeeContext";

export default function Leads() {
  const { employees, addEmployee, editEmployee, deleteEmployee } = useEmployees();
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerLead, setDrawerLead] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageValidationStatus, setImageValidationStatus] = useState({ loading: false, msg: "" });

  // ✅ Pagination Settings Restored
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Limits rows to 5 per page section

  // Consolidated form tracking state object wrapper
  const [formState, setFormState] = useState({ name: "", email: "", skill: "", joiningDate: "", salaryMonth: "", address: "", image: "" });

  const handleOpenAddForm = () => {
    setIsEditing(false);
    setImageValidationStatus({ loading: false, msg: "" });
    setFormState({ name: "", email: "", skill: "", joiningDate: "", salaryMonth: "", address: "", image: "" });
    setShowAddForm(true);
  };

  const handleOpenEditForm = (employee, e) => {
    e.stopPropagation(); // Avoid triggering overview drawer
    setIsEditing(true);
    setImageValidationStatus({ loading: false, msg: "" });
    setFormState(employee);
    setShowAddForm(true);
  };

  // ✅ Face Detection and Upload Handler function
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageValidationStatus({ loading: true, msg: "Analyzing photo for face visibility..." });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        if (window.faceapi && !window.faceapi.nets.tinyFaceDetector.compiled) {
          await window.faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
        }

        const img = new Image();
        img.src = base64Image;
        img.onload = async () => {
          if (window.faceapi) {
            const detections = await window.faceapi.detectAllFaces(img, new window.faceapi.TinyFaceDetectorOptions());
            
            if (detections.length > 0) {
              setFormState(prev => ({ ...prev, image: base64Image }));
              setImageValidationStatus({ loading: false, msg: "✅ Face verified successfully!" });
            } else {
              setFormState(prev => ({ ...prev, image: "" }));
              setImageValidationStatus({ loading: false, msg: "❌ Access Denied: No clear face detected in this image. Please upload a clear portrait." });
              e.target.value = ""; 
            }
          } else {
            setFormState(prev => ({ ...prev, image: base64Image }));
            setImageValidationStatus({ loading: false, msg: "⚠️ Script verification bypassed: Photo saved successfully." });
          }
        };
      } catch (err) {
        console.error("Face validation system offline: ", err);
        setFormState(prev => ({ ...prev, image: base64Image }));
        setImageValidationStatus({ loading: false, msg: "⚠️ Network bypass: File attached without face verification." });
      }
    };
  };

  const handleSave = () => {
    if (!formState.name || !formState.email) return;

    if (!isEditing && !formState.image) {
      alert("Please upload a valid profile photo showing a clear face before saving.");
      return;
    }

    if (isEditing) {
      editEmployee(formState.id, { ...formState, salaryMonth: Number(formState.salaryMonth) });
    } else {
      addEmployee(formState);
    }
    setShowAddForm(false);
  };

  // ✅ Canvas Downloader function
  const downloadIDCard = (emp) => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 550;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 550);
    gradient.addColorStop(0, "#0f172a");
    gradient.addColorStop(0.5, "#1e293b");
    gradient.addColorStop(1, "#020617");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 550);

    ctx.fillStyle = "#2563eb";
    ctx.fillRect(0, 0, 400, 12);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NEXUSCRM CORP", 200, 45);

    const profileImg = new Image();
    profileImg.src = emp.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(emp.name)}`;
    profileImg.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(200, 150, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profileImg, 150, 100, 100, 100);
      ctx.restore();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(emp.name, 200, 240);

      ctx.fillStyle = "#3b82f6";
      ctx.font = "600 15px sans-serif";
      ctx.fillText(emp.skill.toUpperCase(), 200, 265);

      ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
      ctx.fillRect(40, 290, 320, 140);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(71, 85, 105, 0.5)";
      ctx.strokeRect(40, 290, 320, 140);

      ctx.textAlign = "left";
      ctx.font = "12px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("ID NUMBER :", 60, 320);
      ctx.fillText("EMAIL     :", 60, 350);
      ctx.fillText("JOINED    :", 60, 380);
      ctx.fillText("LOCATION  :", 60, 410);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px monospace";
      ctx.fillText(emp.empId || "N/A", 160, 320);
      ctx.fillText(emp.email, 160, 350);
      ctx.fillText(emp.joiningDate, 160, 380);
      ctx.fillText(emp.address, 160, 410);

      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fillRect(80, 465, 240, 24);
      ctx.fillStyle = "#475569";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SECURE ACCESS TOKEN", 200, 515);

      const downloadLink = document.createElement("a");
      downloadLink.download = `${emp.name.replace(/\s+/g, '_')}_ID_Card.png`;
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.click();
    };
  };

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Pagination Calculations Restored
  const endOffset = currentPage * itemsPerPage;
  const startOffset = endOffset - itemsPerPage;
  const currentPaginatedItems = filtered.slice(startOffset, endOffset);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      <div className="px-6 py-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Employee Details</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} total employees listed</p>
          </div>
          <button onClick={handleOpenAddForm} className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm">
            <Plus className="w-4 h-4" /> Add New Employee
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search employees..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border text-sm focus:outline-none" />
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-muted-foreground">
                <th className="py-3 px-4 text-left font-medium w-16">S.No</th>
                <th className="py-3 px-4 text-left font-medium">Employee Info</th>
                <th className="py-3 px-4 text-left font-medium">Designation</th>
                <th className="py-3 px-4 text-left font-medium">Joining Date</th>
                <th className="py-3 px-4 text-left font-medium">Salary (Month)</th>
                <th className="py-3 px-4 text-left font-medium">Salary (Year)</th>
                <th className="py-3 px-4 text-left font-medium">Address</th>
                <th className="py-3 px-4 text-right font-medium w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPaginatedItems.map((emp, i) => (
                <tr key={emp.id} onClick={() => setDrawerLead(emp)} className="border-b last:border-0 hover:bg-secondary/30 cursor-pointer transition">
                  <td className="py-3 px-4 text-muted-foreground font-medium">{startOffset + i + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {emp.image && (emp.image.startsWith("http") || emp.image.startsWith("data:")) ? (
                        <img 
                          src={emp.image} 
                          alt="" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                          className="w-9 h-9 rounded-full object-cover border bg-secondary shrink-0" 
                        />
                      ) : null}
                      <div 
                        className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0 border border-primary/20"
                        style={{ display: (emp.image && (emp.image.startsWith("http") || emp.image.startsWith("data:"))) ? 'none' : 'flex' }}
                      >
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground font-mono select-all">{emp.empId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground font-medium">{emp.skill}</td>
                  <td className="py-3 px-4 text-muted-foreground">{emp.joiningDate}</td>
                  <td className="py-3 px-4 font-semibold text-foreground">${emp.salaryMonth.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">${(emp.salaryMonth * 12).toLocaleString()}</td>
                  <td className="py-3 px-4 text-muted-foreground max-w-[140px] truncate">{emp.address}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      <button onClick={(e) => handleOpenEditForm(emp, e)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => confirm("Delete records?") && deleteEmployee(emp.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 text-destructive transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentPaginatedItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted-foreground">No records match your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ✅ RIGHT CORNER ALIGNED PAGINATION CONTROL RESTORED PERFECTLY */}
          <div className="flex items-center justify-end px-6 py-3.5 bg-secondary/20 border-t border-border gap-5 text-sm select-none">
            <span className="text-muted-foreground font-medium">
              {filtered.length > 0 ? startOffset + 1 : 0}–{Math.min(endOffset, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* IDENTITY COMPANY ID CARD DRAWER */}
      <AnimatePresence>
        {drawerLead && (
          <>
            <motion.div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setDrawerLead(null)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-screen w-[440px] bg-card border-l z-50 p-6 overflow-y-auto flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-foreground">Employee Identity Card</h2>
                <button onClick={() => setDrawerLead(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary"><X className="w-4 h-4" /></button>
              </div>

              <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 shadow-2xl border border-slate-700 relative overflow-hidden text-center flex flex-col items-center gap-4 my-auto">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-400">NexusCRM Corp</span>
                </div>
                
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-xl mt-2 flex items-center justify-center overflow-hidden">
                  {drawerLead.image && (drawerLead.image.startsWith("http") || drawerLead.image.startsWith("data:")) ? (
                    <img src={drawerLead.image} alt="" className="w-full h-full rounded-full object-cover bg-slate-800" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg">
                      {drawerLead.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">{drawerLead.name}</h3>
                  <p className="text-xs font-medium text-primary mt-0.5">{drawerLead.skill}</p>
                </div>

                <div className="w-full bg-slate-800/60 backdrop-blur-md rounded-xl p-3 border border-slate-700/50 text-left space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between"><span className="text-slate-400">ID NUMBER:</span><span className="text-white font-bold">{drawerLead.empId || "N/A"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">EMAIL:</span><span className="text-white truncate max-w-[140px]">{drawerLead.email}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">JOINED:</span><span className="text-white">{drawerLead.joiningDate}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">LOCATION:</span><span className="text-white truncate max-w-[120px]">{drawerLead.address}</span></div>
                </div>

                <div className="w-full border-t border-dashed border-slate-700 pt-3 mt-1 flex flex-col items-center gap-1">
                  <div className="h-6 w-44 bg-white/10 rounded flex items-center justify-center font-serif text-[10px] tracking-widest opacity-60 select-none">||||| | |||| ||| |||</div>
                  <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Secure Access Token</span>
                </div>
              </div>

              <button 
                onClick={() => downloadIDCard(drawerLead)}
                className="w-full mt-6 h-11 bg-primary hover:opacity-90 text-primary-foreground font-medium rounded-lg flex items-center justify-center gap-2 transition shadow-md"
              >
                <Download className="w-4 h-4" /> Download ID Card (.PNG)
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ADD / EDIT SIDE MODAL DRAWER FORM */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <motion.div className="fixed inset-0 bg-black/10 z-40" onClick={() => setShowAddForm(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-screen w-[420px] bg-card border-l z-50 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-lg text-foreground">{isEditing ? "Edit Employee Records" : "Add New Employee"}</h2>
                <button onClick={() => setShowAddForm(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary"><X className="w-4 h-4" /></button>
              </div>

              <div className="space-y-4">
                <div><label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label><input value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full h-10 px-3 rounded-lg bg-secondary border text-sm" /></div>
                <div><label className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label><input type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full h-10 px-3 rounded-lg bg-secondary border text-sm" /></div>
                <div><label className="text-sm font-medium text-foreground mb-1.5 block">Skill / Role</label><input value={formState.skill} onChange={e => setFormState({...formState, skill: e.target.value})} className="w-full h-10 px-3 rounded-lg bg-secondary border text-sm" /></div>
                
                {/* Portrait file validation upload block */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Employee Profile Photo</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                    className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
                  />
                  {imageValidationStatus.msg && (
                    <p className={`text-xs mt-2 font-medium ${
                      imageValidationStatus.msg.includes("✅") ? "text-emerald-600" :
                      imageValidationStatus.msg.includes("❌") ? "text-rose-500 font-semibold" : "text-amber-500"
                    }`}>
                      {imageValidationStatus.msg}
                    </p>
                  )}
                  {formState.image && (
                    <div className="mt-3 flex items-center gap-3 bg-secondary/30 p-2 rounded-lg border border-border">
                      <img src={formState.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
                      <span className="text-xs text-muted-foreground italic">Uploaded portrait preview ready</span>
                    </div>
                  )}
                </div>

                <div><label className="text-sm font-medium text-foreground mb-1.5 block">Joining Date</label><input type="date" value={formState.joiningDate} onChange={e => setFormState({...formState, joiningDate: e.target.value})} className="w-full h-10 px-3 rounded-lg bg-secondary border text-sm" /></div>
                <div><label className="text-sm font-medium text-foreground mb-1.5 block">Salary Per Month ($)</label><input type="number" value={formState.salaryMonth} onChange={e => setFormState({...formState, salaryMonth: e.target.value})} className="w-full h-10 px-3 rounded-lg bg-secondary border text-sm" /></div>
                <div><label className="text-sm font-medium text-foreground mb-1.5 block">Address</label><input value={formState.address} onChange={e => setFormState({...formState, address: e.target.value})} className="w-full h-10 px-3 rounded-lg bg-secondary border text-sm" /></div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddForm(false)} className="flex-1 h-10 rounded-lg bg-secondary text-sm font-medium">Cancel</button>
                <button onClick={handleSave} className="flex-1 h-10 bg-primary text-primary-foreground font-medium rounded-lg">{isEditing ? "Apply Changes" : "Save Employee"}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}