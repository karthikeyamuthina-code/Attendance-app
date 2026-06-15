import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Follow up with Acme Corp on enterprise deal", assignee: "John D.", due: "Today", priority: "High", done: false },
  { id: 2, title: "Prepare proposal for TechStart", assignee: "Sarah C.", due: "Tomorrow", priority: "Medium", done: false },
  { id: 3, title: "Review quarterly sales report", assignee: "John D.", due: "Apr 12", priority: "Low", done: true },
  { id: 4, title: "Schedule demo with CloudPeak team", assignee: "Emily P.", due: "Apr 13", priority: "High", done: false },
  { id: 5, title: "Update CRM contact records", assignee: "Marcus J.", due: "Apr 14", priority: "Low", done: true },
  { id: 6, title: "Send contract to DataFlow Systems", assignee: "John D.", due: "Today", priority: "High", done: false },
];

const priorityColors = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Tasks
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {pending.length} pending, {completed.length} completed
          </p>
        </div>

        <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm shadow-primary/25">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Pending
        </h3>

        {pending.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-sm transition cursor-pointer group"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="text-muted-foreground hover:text-primary transition"
            >
              <Circle className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{task.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>{task.assignee}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.due}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Completed
        </h3>

        {completed.map((task) => (
          <div
            key={task.id}
            className="bg-card/50 rounded-xl border border-border/50 p-4 flex items-center gap-4 opacity-60"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="text-success"
            >
              <CheckCircle2 className="w-5 h-5" />
            </button>

            <p className="flex-1 font-medium text-foreground line-through">
              {task.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";

// // ✅ Fixed Data
// const initialTasks = [
//   {
//     id: "t1",
//     title: "Follow up with Acme Corp on enterprise deal",
//     assignee: "John D.",
//     due: "Today",
//     priority: "High",
//     done: false,
//   },
//   {
//     id: "t2",
//     title: "Prepare proposal for TechStart",
//     assignee: "Sarah C.",
//     due: "Tomorrow",
//     priority: "Medium",
//     done: false,
//   },
//   {
//     id: "t3",
//     title: "Review quarterly sales report",
//     assignee: "John D.",
//     due: "Apr 12",
//     priority: "Low",
//     done: false,
//   },
//   {
//     id: "t4",
//     title: "Schedule demo with CloudPeak team",
//     assignee: "Emily P.",
//     due: "Apr 13",
//     priority: "High",
//     done: false,
//   },
//   {
//     id: "t5",
//     title: "Update CRM contact records",
//     assignee: "Marcus J.",
//     due: "Apr 14",
//     priority: "Low",
//     done: false,
//   },
//   {
//     id: "t6",
//     title: "Send contract to DataFlow Systems",
//     assignee: "John D.",
//     due: "Today",
//     priority: "High",
//     done: false,
//   },
// ];

// // ✅ Priority Colors
// const priorityColors = {
//   High: "bg-red-100 text-red-600",
//   Medium: "bg-yellow-100 text-yellow-600",
//   Low: "bg-gray-200 text-gray-600",
// };

// export default function Tasks() {
//   const [tasks, setTasks] = useState(initialTasks);

//   // ✅ Toggle Task
//   const toggleTask = (id) => {
//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === id ? { ...t, done: !t.done } : t
//       )
//     );
//   };

//   const pending = tasks.filter((t) => !t.done);
//   const completed = tasks.filter((t) => t.done);

//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             {pending.length} pending, {completed.length} completed
//           </p>
//         </div>

//         <button className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm">
//           <Plus className="w-4 h-4" /> New Task
//         </button>
//       </div>

//       {/* Pending Tasks */}
//       <div className="space-y-2">
//         <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//           Pending
//         </h3>

//         {pending.map((task, i) => (
//           <motion.div
//             key={task.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-sm transition cursor-pointer group"
//           >
//             {/* Checkbox */}
//             <button
//               onClick={() => toggleTask(task.id)}
//               className="text-muted-foreground hover:text-primary"
//             >
//               <Circle className="w-5 h-5" />
//             </button>

//             {/* Content */}
//             <div className="flex-1 min-w-0">
//               <p className="font-medium text-foreground">
//                 {task.title}
//               </p>

//               <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
//                 <span>{task.assignee}</span>
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {task.due}
//                 </span>
//               </div>
//             </div>

//             {/* Priority */}
//             <span
//               className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                 priorityColors[task.priority]
//               }`}
//             >
//               {task.priority}
//             </span>
//           </motion.div>
//         ))}
//       </div>

//       {/* Completed Tasks */}
//       <div className="space-y-2">
//         <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//           Completed
//         </h3>

//         {completed.map((task) => (
//           <div
//             key={task.id}
//             className="bg-card/50 rounded-xl border border-border/50 p-4 flex items-center gap-4 opacity-60"
//           >
//             <button
//               onClick={() => toggleTask(task.id)}
//               className="text-green-500"
//             >
//               <CheckCircle2 className="w-5 h-5" />
//             </button>

//             <p className="flex-1 font-medium text-foreground line-through">
//               {task.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }