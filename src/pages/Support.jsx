import { motion } from "framer-motion";
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const tickets = [
  { id: "TK-001", subject: "Login issue on mobile", customer: "Acme Corp", status: "Open", priority: "High", time: "2h ago" },
  { id: "TK-002", subject: "Invoice discrepancy", customer: "TechStart", status: "In Progress", priority: "Medium", time: "5h ago" },
  { id: "TK-003", subject: "Feature request: bulk export", customer: "Global Corp", status: "Open", priority: "Low", time: "1d ago" },
  { id: "TK-004", subject: "API rate limiting", customer: "DataFlow", status: "Resolved", priority: "High", time: "2d ago" },
  { id: "TK-005", subject: "Billing cycle change", customer: "CloudPeak", status: "In Progress", priority: "Medium", time: "3d ago" },
];

const statusIcons = {
  Open: <AlertCircle className="w-4 h-4 text-destructive" />,
  "In Progress": <Clock className="w-4 h-4 text-warning" />,
  Resolved: <CheckCircle2 className="w-4 h-4 text-success" />,
};

export default function Support() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Support
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage customer support tickets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Open Tickets",
            count: 2,
            icon: <AlertCircle className="w-5 h-5 text-destructive" />,
            bg: "bg-destructive/5",
          },
          {
            label: "In Progress",
            count: 2,
            icon: <Clock className="w-5 h-5 text-warning" />,
            bg: "bg-warning/5",
          },
          {
            label: "Resolved",
            count: 1,
            icon: <CheckCircle2 className="w-5 h-5 text-success" />,
            bg: "bg-success/5",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`${stat.bg} rounded-xl border border-border p-5 flex items-center gap-4`}
          >
            {stat.icon}
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">
                {stat.count}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Ticket
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Subject
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Customer
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Priority
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, i) => (
              <motion.tr
                key={ticket.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer transition"
              >
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  {ticket.id}
                </td>
                <td className="py-3 px-4 font-medium text-foreground">
                  {ticket.subject}
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {ticket.customer}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {statusIcons[ticket.status]}
                    <span>{ticket.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      ticket.priority === "High"
                        ? "bg-destructive/10 text-destructive"
                        : ticket.priority === "Medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">
                  {ticket.time}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import { motion } from "framer-motion";
// import {
//   MessageSquare,
//   Clock,
//   CheckCircle2,
//   AlertCircle,
// } from "lucide-react";

// // ✅ Fixed Data
// const tickets = [
//   {
//     id: "TK-001",
//     subject: "Login issue on mobile",
//     customer: "Acme Corp",
//     status: "Open",
//     priority: "High",
//     time: "2h ago",
//   },
//   {
//     id: "TK-002",
//     subject: "Invoice discrepancy",
//     customer: "TechStart",
//     status: "In Progress",
//     priority: "Medium",
//     time: "5h ago",
//   },
//   {
//     id: "TK-003",
//     subject: "Feature request",
//     customer: "Global Corp",
//     status: "Open",
//     priority: "Low",
//     time: "1d ago",
//   },
//   {
//     id: "TK-004",
//     subject: "API rate limiting",
//     customer: "DataFlow",
//     status: "Resolved",
//     priority: "High",
//     time: "2d ago",
//   },
//   {
//     id: "TK-005",
//     subject: "Billing cycle change",
//     customer: "CloudPeak",
//     status: "In Progress",
//     priority: "Medium",
//     time: "3d ago",
//   },
// ];

// // ✅ Status Icons Mapping
// const statusIcons = {
//   Open: <AlertCircle className="w-4 h-4 text-red-500" />,
//   "In Progress": <Clock className="w-4 h-4 text-yellow-500" />,
//   Resolved: <CheckCircle2 className="w-4 h-4 text-green-500" />,
// };

// export default function Support() {
//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Support</h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Manage customer support tickets
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {[
//           {
//             label: "Open Tickets",
//             count: tickets.filter((t) => t.status === "Open").length,
//             icon: <AlertCircle className="w-5 h-5 text-red-500" />,
//             bg: "bg-red-100",
//           },
//           {
//             label: "In Progress",
//             count: tickets.filter((t) => t.status === "In Progress").length,
//             icon: <Clock className="w-5 h-5 text-yellow-500" />,
//             bg: "bg-yellow-100",
//           },
//           {
//             label: "Resolved",
//             count: tickets.filter((t) => t.status === "Resolved").length,
//             icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
//             bg: "bg-green-100",
//           },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className={`${stat.bg} rounded-xl border border-border p-5 flex items-center gap-4`}
//           >
//             {stat.icon}
//             <div>
//               <p className="text-2xl font-bold text-foreground">
//                 {stat.count}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 {stat.label}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="bg-card rounded-xl border border-border overflow-hidden">
//         <table className="w-full text-sm">

//           {/* Header */}
//           <thead>
//             <tr className="border-b bg-secondary/50">
//               <th className="text-left py-3 px-4">Ticket</th>
//               <th className="text-left py-3 px-4">Subject</th>
//               <th className="text-left py-3 px-4">Customer</th>
//               <th className="text-left py-3 px-4">Status</th>
//               <th className="text-left py-3 px-4">Priority</th>
//               <th className="text-left py-3 px-4">Time</th>
//             </tr>
//           </thead>

//           {/* Body */}
//           <tbody>
//             {tickets.map((ticket, i) => (
//               <motion.tr
//                 key={ticket.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="border-b last:border-0 hover:bg-secondary/30 transition cursor-pointer"
//               >
//                 <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
//                   {ticket.id}
//                 </td>

//                 <td className="py-3 px-4 font-medium text-foreground">
//                   {ticket.subject}
//                 </td>

//                 <td className="py-3 px-4 text-muted-foreground">
//                   {ticket.customer}
//                 </td>

//                 {/* Status */}
//                 <td className="py-3 px-4">
//                   <div className="flex items-center gap-2">
//                     {statusIcons[ticket.status]}
//                     <span>{ticket.status}</span>
//                   </div>
//                 </td>

//                 {/* Priority */}
//                 <td className="py-3 px-4">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                       ticket.priority === "High"
//                         ? "bg-red-100 text-red-600"
//                         : ticket.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {ticket.priority}
//                   </span>
//                 </td>

//                 <td className="py-3 px-4 text-xs text-muted-foreground">
//                   {ticket.time}
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }