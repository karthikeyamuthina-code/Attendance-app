import { motion, AnimatePresence } from "framer-motion";
import { Shield, Plus, Users, Edit, Trash2, X, Mail, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { useEmployees } from "../contexts/EmployeeContext";

export default function Roles() {
  // Pulling live employee lists from your shared context layer
  const { employees } = useEmployees();
  
  // Track which role group card is clicked to slide out the right-side details panel
  const [selectedRoleGroup, setSelectedRoleGroup] = useState(null);

  // A list of static module permissions to attach to groups for standard UI rendering continuity
  const defaultPermissionsMap = {
    "React Developer": ["Dashboard", "Employee Details", "Tasks", "Salary Details"],
    "UI/UX Designer": ["Dashboard", "Tasks", "Appearance Settings"],
    "Product Manager": ["Dashboard", "Employee Details", "Employee Attendance", "Tasks", "Salary Details"],
    "Backend Engineer": ["Dashboard", "Tasks", "Data Operations"],
    "QA Engineer": ["Dashboard", "Tasks"],
    "DevOps Engineer": ["Dashboard", "Tasks", "Server Configurations"],
    "Business Analyst": ["Dashboard", "Employee Attendance", "Reports (view)"],
    "Full Stack Developer": ["All modules", "Employee Details", "Tasks"],
    "Mobile Developer": ["Dashboard", "Tasks"],
    "Data Engineer": ["Dashboard", "Data Operations", "Reports (view)"],
    "Marketing Specialist": ["Dashboard"],
    "Security Analyst": ["Dashboard", "Security Settings", "Data Operations"]
  };

  // Preset theme color loops based on designations
  const colorPresets = [
    "bg-destructive/10 text-destructive border-destructive/20",
    "bg-primary/10 text-primary border-primary/20",
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    "bg-amber-500/10 text-amber-600 border-amber-500/20",
    "bg-blue-500/10 text-blue-600 border-blue-500/20",
    "bg-purple-500/10 text-purple-600 border-purple-500/20"
  ];

  // Group all unique employee designations dynamically from the active list
  const uniqueDesignations = Array.from(new Set(employees.map(emp => emp.skill || "Developer")));

  // Transform designations into clean role cards tracking real-time users list balances
  const dynamicRoles = uniqueDesignations.map((designation, idx) => {
    const matchedEmployees = employees.filter(emp => (emp.skill || "Developer") === designation);
    const assignedPermissions = defaultPermissionsMap[designation] || ["Dashboard", "Tasks"];
    const assignedColorPreset = colorPresets[idx % colorPresets.length];

    return {
      id: idx + 1,
      name: designation,
      description: `Access profile settings mapped to ${designation} staff operations`,
      usersCount: matchedEmployees.length,
      permissions: assignedPermissions,
      color: assignedColorPreset,
      membersList: matchedEmployees
    };
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Roles & Permissions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your {dynamicRoles.length} designative role groups and active workspace control access lists
          </p>
        </div>

        <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm shadow-primary/25">
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </div>

      {/* Dynamic Grid Layout rendering live context roles cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dynamicRoles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedRoleGroup(role)}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition duration-200 group cursor-pointer hover:border-primary/20 relative"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${role.color.split(" ")[0]} ${role.color.split(" ")[1]} flex items-center justify-center border`} >
                  <Shield className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {role.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {role.description}
                  </p>
                </div>
              </div>

              {/* Inline operations tracking actions wrapper */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition absolute top-4 right-4" onClick={e => e.stopPropagation()}>
                <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-secondary transition">
                  <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/10 transition">
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary/70" />
              <span className="font-medium text-foreground">{role.usersCount}</span> allocated users
            </div>

            {/* Permission badges matrix list */}
            <div className="flex flex-wrap gap-1.5">
              {role.permissions.map((perm) => (
                <span
                  key={perm}
                  className="px-2 py-0.5 rounded-md bg-secondary border border-border/40 text-xs text-muted-foreground"
                >
                  {perm}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* RIGHT-SIDE POPUP PANEL DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedRoleGroup && (
          <>
            {/* Backdrop shading overlay layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50"
              onClick={() => setSelectedRoleGroup(null)}
            />

            {/* Right-Side Slideout container layer block layout */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 h-screen w-full max-w-[460px] bg-card border-l border-border z-50 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
            >
              {/* Header section block */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-md ${selectedRoleGroup.color.split(" ")[0]} ${selectedRoleGroup.color.split(" ")[1]} flex items-center justify-center border`} >
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground tracking-tight">{selectedRoleGroup.name} Staff</h2>
                      <p className="text-xs text-muted-foreground">{selectedRoleGroup.usersCount} total listings registered</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedRoleGroup(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* ✅ MODIFIED: "Functional App Access Modules" badge block section completely removed from here */}
              </div>

              {/* Members Data List scroll-box section context container element */}
              <div className="flex-1 overflow-y-auto my-4 pr-1 divide-y divide-border/60">
                {selectedRoleGroup.membersList.map((emp) => (
                  <div key={emp.id} className="flex items-center gap-4 py-3.5 group transition-colors">
                    <img 
                      src={emp.image} 
                      alt="" 
                      className="w-11 h-11 rounded-full object-cover border bg-secondary shrink-0 shadow-xs" 
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm text-foreground truncate">{emp.name}</p>
                        <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-bold shrink-0">
                          {emp.empId || "N/A"}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-primary/60 shrink-0" /> {emp.email}
                        </span>
                        <span className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-muted-foreground/60 shrink-0" /> {emp.address || "Office Headquarters"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {selectedRoleGroup.membersList.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-48 text-center space-y-2">
                    <Briefcase className="w-8 h-8 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground italic">No active employee personnel are currently assigned to this designation role group.</p>
                  </div>
                )}
              </div>

              {/* Footer action cancel trigger option element */}
              <button 
                onClick={() => setSelectedRoleGroup(null)}
                className="w-full h-10 border border-border bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium rounded-lg transition-colors shadow-2xs shrink-0"
              >
                Close Drawer Sheet
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// import { motion } from "framer-motion";
// import { Shield, Plus, Users, Edit, Trash2 } from "lucide-react";

// // ✅ Fixed Data Structure
// const roles = [
//   {
//     id: 1,
//     name: "Admin",
//     description: "Full system access",
//     users: 12,
//     permissions: ["All modules", "User management", "Settings", "Billing"],
//     color: "bg-red-100 text-red-600",
//   },
//   {
//     id: 2,
//     name: "Sales Manager",
//     description: "Manage team and pipeline",
//     users: 8,
//     permissions: ["Dashboard", "Leads", "Pipeline", "Reports", "Tasks"],
//     color: "bg-blue-100 text-blue-600",
//   },
//   {
//     id: 3,
//     name: "Sales Rep",
//     description: "Manage own leads and deals",
//     users: 15,
//     permissions: ["Dashboard", "Leads (own)", "Pipeline (own)", "Tasks"],
//     color: "bg-green-100 text-green-600",
//   },
//   {
//     id: 4,
//     name: "Support Agent",
//     description: "Handle support tickets",
//     users: 6,
//     permissions: ["Dashboard", "Support", "Customers (view)"],
//     color: "bg-yellow-100 text-yellow-600",
//   },
//   {
//     id: 5,
//     name: "Viewer",
//     description: "Read-only access",
//     users: 20,
//     permissions: ["Dashboard (view)", "Reports (view)"],
//     color: "bg-gray-200 text-gray-600",
//   },
// ];

// export default function Roles() {
//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             Roles & Permissions
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Manage user roles and access control
//           </p>
//         </div>

//         <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm">
//           <Plus className="w-4 h-4" /> Create Role
//         </button>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {roles.map((role, i) => (
//           <motion.div
//             key={role.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition group"
//           >
//             {/* Top */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center`}
//                 >
//                   <Shield className="w-5 h-5" />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-foreground">
//                     {role.name}
//                   </h3>
//                   <p className="text-xs text-muted-foreground">
//                     {role.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
//                 <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary">
//                   <Edit className="w-3.5 h-3.5 text-muted-foreground" />
//                 </button>
//                 <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100">
//                   <Trash2 className="w-3.5 h-3.5 text-red-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Users */}
//             <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
//               <Users className="w-4 h-4" />
//               {role.users} users
//             </div>

//             {/* Permissions */}
//             <div className="flex flex-wrap gap-1.5">
//               {role.permissions.map((perm) => (
//                 <span
//                   key={perm}
//                   className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground"
//                 >
//                   {perm}
//                 </span>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }