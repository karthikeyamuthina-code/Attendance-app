import { motion } from "framer-motion";
import { Shield, Plus, Users, Edit, Trash2 } from "lucide-react";

const roles = [
  { id: 1, name: "Admin", description: "Full system access", users: 2, permissions: ["All modules", "User management", "Settings", "Billing"], color: "bg-destructive/10 text-destructive" },
  { id: 2, name: "Sales Manager", description: "Manage team and pipeline", users: 4, permissions: ["Dashboard", "Leads", "Pipeline", "Reports", "Tasks"], color: "bg-primary/10 text-primary" },
  { id: 3, name: "Sales Rep", description: "Manage own leads and deals", users: 12, permissions: ["Dashboard", "Leads (own)", "Pipeline (own)", "Tasks"], color: "bg-success/10 text-success" },
  { id: 4, name: "Support Agent", description: "Handle support tickets", users: 6, permissions: ["Dashboard", "Support", "Customers (view)"], color: "bg-warning/10 text-warning" },
  { id: 5, name: "Viewer", description: "Read-only access", users: 3, permissions: ["Dashboard (view)", "Reports (view)"], color: "bg-muted text-muted-foreground" },
];

export default function Roles() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Roles & Permissions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user roles and access control
          </p>
        </div>

        <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm shadow-primary/25">
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center`}
                >
                  <Shield className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {role.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-secondary transition">
                  <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/10 transition">
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{role.users} users</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {role.permissions.map((perm) => (
                <span
                  key={perm}
                  className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground"
                >
                  {perm}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
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