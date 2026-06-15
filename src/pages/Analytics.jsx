import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 42000, leads: 120, conversions: 28 },
  { month: "Feb", revenue: 48000, leads: 145, conversions: 35 },
  { month: "Mar", revenue: 55000, leads: 160, conversions: 40 },
  { month: "Apr", revenue: 51000, leads: 138, conversions: 32 },
  { month: "May", revenue: 63000, leads: 185, conversions: 48 },
  { month: "Jun", revenue: 72000, leads: 210, conversions: 55 },
  { month: "Jul", revenue: 68000, leads: 195, conversions: 50 },
];

const teamData = [
  { name: "John D.", deals: 24, revenue: 145000 },
  { name: "Sarah C.", deals: 18, revenue: 98000 },
  { name: "Emily P.", deals: 15, revenue: 78000 },
  { name: "Marcus J.", deals: 12, revenue: 65000 },
];

export default function Analytics() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance insights and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(221, 83%, 53%)"
                fill="url(#revGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">Leads vs Conversions</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="hsl(262, 83%, 58%)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="hsl(152, 69%, 41%)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Bar
                dataKey="deals"
                fill="hsl(221, 83%, 53%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

// import { motion } from "framer-motion";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
// } from "recharts";

// // ✅ Sample Data
// const monthlyData = [
//   { month: "Jan", revenue: 4000, leads: 2400, conversions: 1200 },
//   { month: "Feb", revenue: 3000, leads: 2000, conversions: 1000 },
//   { month: "Mar", revenue: 5000, leads: 2800, conversions: 1500 },
//   { month: "Apr", revenue: 4780, leads: 2600, conversions: 1400 },
//   { month: "May", revenue: 5890, leads: 3200, conversions: 1700 },
//   { month: "Jun", revenue: 6390, leads: 3500, conversions: 1900 },
//   { month: "Jul", revenue: 7000, leads: 3800, conversions: 2100 },
// ];

// const teamData = [
//   { name: "John D.", deals: 40 },
//   { name: "Sarah C.", deals: 55 },
//   { name: "Emily P.", deals: 30 },
//   { name: "Marcus J.", deals: 70 },
// ];

// // ✅ Component
// export default function Analytics() {
//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-heading font-bold text-foreground">
//           Analytics
//         </h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Performance insights and trends
//         </p>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
//         {/* Revenue Chart */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-heading font-semibold text-foreground mb-4">
//             Revenue Trend
//           </h3>

//           <ResponsiveContainer width="100%" height={280}>
//             <AreaChart data={monthlyData}>
              
//               <defs>
//                 <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
//               <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
//               <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
//               <Tooltip />

//               <Area
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="hsl(221, 83%, 53%)"
//                 fill="url(#revGrad)"
//                 strokeWidth={2}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Leads vs Conversions */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-heading font-semibold text-foreground mb-4">
//             Leads vs Conversions
//           </h3>

//           <ResponsiveContainer width="100%" height={280}>
//             <LineChart data={monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
//               <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip />

//               <Line
//                 type="monotone"
//                 dataKey="leads"
//                 stroke="hsl(262, 83%, 58%)"
//                 strokeWidth={2}
//                 dot={{ r: 3 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="conversions"
//                 stroke="hsl(152, 69%, 41%)"
//                 strokeWidth={2}
//                 dot={{ r: 3 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Team Performance */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-heading font-semibold text-foreground mb-4">
//             Team Performance
//           </h3>

//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={teamData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
//               <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip />

//               <Bar
//                 dataKey="deals"
//                 fill="hsl(221, 83%, 53%)"
//                 radius={[6, 6, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </motion.div>

//       </div>
//     </div>
//   );
// }