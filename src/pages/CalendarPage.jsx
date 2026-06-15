import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

const events = [
  { day: 0, start: 9, duration: 1, title: "Team Standup", color: "bg-primary/20 border-primary text-primary" },
  { day: 0, start: 14, duration: 1.5, title: "Acme Corp Demo", color: "bg-accent/20 border-accent text-accent" },
  { day: 1, start: 10, duration: 2, title: "Sales Strategy Meeting", color: "bg-success/20 border-success text-success" },
  { day: 2, start: 9, duration: 1, title: "Team Standup", color: "bg-primary/20 border-primary text-primary" },
  { day: 2, start: 13, duration: 1, title: "CloudPeak Follow-up", color: "bg-warning/20 border-warning text-warning" },
  { day: 3, start: 11, duration: 1.5, title: "Q2 Pipeline Review", color: "bg-info/20 border-info text-info" },
  { day: 4, start: 9, duration: 1, title: "Team Standup", color: "bg-primary/20 border-primary text-primary" },
  { day: 4, start: 15, duration: 1, title: "1:1 with Manager", color: "bg-accent/20 border-accent text-accent" },
];

export default function CalendarPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">April 7 – 13, 2026</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border">
          <div className="p-3" />
          {days.map((day, i) => (
            <div
              key={day}
              className={`p-3 text-center border-l border-border ${
                i === 0 ? "bg-primary/5" : ""
              }`}
            >
              <p className="text-xs text-muted-foreground">{day}</p>
              <p className="text-lg font-heading font-bold text-foreground">{7 + i}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[80px_repeat(7,1fr)] relative">
          {hours.map((hour) => (
            <div key={hour} className="contents">
              <div className="h-16 flex items-start justify-end pr-3 pt-1 text-xs text-muted-foreground border-b border-border">
                {hour}
              </div>

              {days.map((day, i) => (
                <div
                  key={`${hour}-${day}`}
                  className="h-16 border-l border-b border-border hover:bg-secondary/30 transition cursor-pointer"
                />
              ))}
            </div>
          ))}

          {/* Events overlay */}
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`absolute ${event.color} border-l-2 rounded-r-md px-2 py-1 text-xs font-medium cursor-pointer hover:shadow-md transition-shadow`}
              style={{
                left: `calc(80px + ${(event.day / 7) * 100}% * 7 / 7 + 2px)`,
                top: `${(event.start - 8) * 64 + 2}px`,
                height: `${event.duration * 64 - 4}px`,
                width: `calc(${100 / 7}% - 6px)`,
                marginLeft: `calc(${event.day} * ${100 / 7}%)`,
              }}
            >
              {event.title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// import { motion } from "framer-motion";

// // Days & Hours
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

// // ✅ Fixed Events Data (added day index, start time, duration)
// const events = [
//   { day: 0, start: 9, duration: 1, title: "Team Standup", color: "bg-primary/20 border-primary text-primary" },
//   { day: 1, start: 11, duration: 2, title: "Acme Corp Demo", color: "bg-accent/20 border-accent text-accent" },
//   { day: 2, start: 10, duration: 1.5, title: "Sales Strategy", color: "bg-green-200 border-green-500 text-green-700" },
//   { day: 3, start: 9, duration: 1, title: "Team Standup", color: "bg-primary/20 border-primary text-primary" },
//   { day: 4, start: 13, duration: 2, title: "CloudPeak Follow-up", color: "bg-yellow-200 border-yellow-500 text-yellow-700" },
//   { day: 5, start: 12, duration: 2, title: "Q2 Pipeline Review", color: "bg-blue-200 border-blue-500 text-blue-700" },
//   { day: 6, start: 9, duration: 1, title: "Team Standup", color: "bg-primary/20 border-primary text-primary" },
// ];

// export default function CalendarPage() {
//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           April 7 – 13, 2026
//         </p>
//       </div>

//       {/* Calendar */}
//       <div className="bg-card rounded-xl border border-border overflow-hidden">

//         {/* Days Header */}
//         <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border">
//           <div />
//           {days.map((day, i) => (
//             <div
//               key={day}
//               className={`p-3 text-center border-l border-border ${
//                 i === 0 ? "bg-primary/5" : ""
//               }`}
//             >
//               <p className="text-xs text-muted-foreground">{day}</p>
//               <p className="text-lg font-bold text-foreground">
//                 {7 + i}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-[80px_repeat(7,1fr)] relative">

//           {hours.map((hour) => (
//             <div key={hour} className="contents">

//               {/* Time */}
//               <div className="h-16 flex items-start justify-end pr-3 pt-1 text-xs text-muted-foreground border-b border-border">
//                 {hour}
//               </div>

//               {/* Cells */}
//               {days.map((day, i) => (
//                 <div
//                   key={`${hour}-${day}`}
//                   className="h-16 border-l border-b border-border hover:bg-secondary/30 transition cursor-pointer"
//                 />
//               ))}
//             </div>
//           ))}

//           {/* Events */}
//           {events.map((event, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//               className={`absolute ${event.color} border-l-2 rounded-r-md px-2 py-1 text-xs font-medium shadow hover:shadow-md`}
//               style={{
//                 left: `calc(80px + ${event.day * (100 / 7)}%)`,
//                 top: `${(event.start - 8) * 64 + 2}px`,
//                 height: `${event.duration * 64 - 4}px`,
//                 width: `calc(${100 / 7}% - 6px)`,
//               }}
//             >
//               {event.title}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }