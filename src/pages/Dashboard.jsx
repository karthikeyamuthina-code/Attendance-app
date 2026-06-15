import { motion } from "framer-motion";
import { KPICard } from "@/components/KPICard";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000, deals: 18 },
  { month: "Feb", revenue: 48000, deals: 22 },
  { month: "Mar", revenue: 55000, deals: 25 },
  { month: "Apr", revenue: 51000, deals: 20 },
  { month: "May", revenue: 63000, deals: 30 },
  { month: "Jun", revenue: 72000, deals: 35 },
  { month: "Jul", revenue: 68000, deals: 28 },
];

const pipelineData = [
  { stage: "Qualified", value: 45 },
  { stage: "Proposal", value: 32 },
  { stage: "Negotiation", value: 18 },
  { stage: "Closed", value: 12 },
];

const sourceData = [
  { name: "Website", value: 35, color: "hsl(221, 83%, 53%)" },
  { name: "Referral", value: 25, color: "hsl(262, 83%, 58%)" },
  { name: "LinkedIn", value: 20, color: "hsl(152, 69%, 41%)" },
  { name: "Cold Call", value: 20, color: "hsl(38, 92%, 50%)" },
];

const recentActivity = [
  { action: "New deal created", detail: "Enterprise Plan - $24,000", time: "2m ago", color: "bg-primary" },
  { action: "Lead converted", detail: "Sarah Chen → Customer", time: "15m ago", color: "bg-success" },
  { action: "Task completed", detail: "Follow up with Acme Corp", time: "1h ago", color: "bg-accent" },
  { action: "Meeting scheduled", detail: "Demo with TechStart Inc.", time: "2h ago", color: "bg-warning" },
  { action: "Deal won", detail: "Pro Plan - $12,000/yr", time: "3h ago", color: "bg-success" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, John. Here's your sales overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={399000}
          prefix="$"
          change={12.5}
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          gradient="kpi-gradient-blue"
          delay={0}
        />
        <KPICard
          title="Active Leads"
          value={2847}
          change={8.2}
          icon={<Users className="w-5 h-5 text-accent" />}
          gradient="kpi-gradient-purple"
          delay={0.1}
        />
        <KPICard
          title="Conversion Rate"
          value={24}
          suffix="%"
          change={3.1}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
          gradient="kpi-gradient-green"
          delay={0.2}
        />
        <KPICard
          title="Deals in Pipeline"
          value={156}
          change={-2.4}
          icon={<Target className="w-5 h-5 text-warning" />}
          gradient="kpi-gradient-amber"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(221, 83%, 53%)"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Lead Sources
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={4}
              >
                {sourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 mt-2">
            {sourceData.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-medium text-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pipeline + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Pipeline Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="stage" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="hsl(221, 83%, 53%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 group cursor-pointer hover:bg-secondary/50 -mx-3 px-3 py-2 rounded-lg transition"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${item.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// import { motion } from "framer-motion";
// import { KPICard } from "@/components/KPICard";
// import { DollarSign, Users, TrendingUp, Target } from "lucide-react";
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
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// // ✅ Fixed Data
// const revenueData = [
//   { month: "Jan", revenue: 4000 },
//   { month: "Feb", revenue: 3000 },
//   { month: "Mar", revenue: 5000 },
//   { month: "Apr", revenue: 4780 },
//   { month: "May", revenue: 5890 },
//   { month: "Jun", revenue: 6390 },
//   { month: "Jul", revenue: 7000 },
// ];

// const pipelineData = [
//   { stage: "Qualified", value: 40 },
//   { stage: "Proposal", value: 30 },
//   { stage: "Negotiation", value: 20 },
//   { stage: "Closed", value: 10 },
// ];

// const sourceData = [
//   { name: "Website", value: 40, color: "hsl(221, 83%, 53%)" },
//   { name: "Referral", value: 25, color: "hsl(262, 83%, 58%)" },
//   { name: "LinkedIn", value: 20, color: "hsl(152, 69%, 41%)" },
//   { name: "Cold Call", value: 15, color: "hsl(38, 92%, 50%)" },
// ];

// const recentActivity = [
//   { action: "New deal created", detail: "Enterprise Plan - $24,000", time: "2m ago", color: "bg-primary" },
//   { action: "Lead converted", detail: "Sarah Chen → Customer", time: "15m ago", color: "bg-green-500" },
//   { action: "Task completed", detail: "Follow up with Acme Corp", time: "1h ago", color: "bg-purple-500" },
//   { action: "Meeting scheduled", detail: "Demo with TechStart Inc.", time: "2h ago", color: "bg-yellow-500" },
//   { action: "Deal won", detail: "Pro Plan - $12,000/yr", time: "3h ago", color: "bg-green-500" },
// ];

// export default function Dashboard() {
//   return (
//     <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Welcome back, John. Here's your sales overview.
//         </p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <KPICard
//           title="Total Revenue"
//           value={399000}
//           prefix="$"
//           change={12.5}
//           icon={<DollarSign className="w-5 h-5 text-primary" />}
//           delay={0}
//         />
//         <KPICard
//           title="Active Leads"
//           value={2847}
//           change={8.2}
//           icon={<Users className="w-5 h-5 text-purple-500" />}
//           delay={0.1}
//         />
//         <KPICard
//           title="Conversion Rate"
//           value={24}
//           suffix="%"
//           change={3.1}
//           icon={<TrendingUp className="w-5 h-5 text-green-500" />}
//           delay={0.2}
//         />
//         <KPICard
//           title="Deals in Pipeline"
//           value={156}
//           change={-2.4}
//           icon={<Target className="w-5 h-5 text-yellow-500" />}
//           delay={0.3}
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* Revenue */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-semibold mb-4">Revenue Overview</h3>

//           <ResponsiveContainer width="100%" height={280}>
//             <AreaChart data={revenueData}>
//               <defs>
//                 <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />

//               <Area
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="hsl(221, 83%, 53%)"
//                 fill="url(#colorRevenue)"
//                 strokeWidth={2}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Pie Chart */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-semibold mb-4">Lead Sources</h3>

//           <ResponsiveContainer width="100%" height={200}>
//             <PieChart>
//               <Pie data={sourceData} dataKey="value" innerRadius={50} outerRadius={80}>
//                 {sourceData.map((entry, i) => (
//                   <Cell key={i} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </motion.div>
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//         {/* Pipeline */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-semibold mb-4">Pipeline Overview</h3>

//           <ResponsiveContainer width="100%" height={220}>
//             <BarChart data={pipelineData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="stage" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="hsl(221, 83%, 53%)" />
//             </BarChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Activity */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="bg-card rounded-xl border border-border p-6"
//         >
//           <h3 className="font-semibold mb-4">Recent Activity</h3>

//           <div className="space-y-4">
//             {recentActivity.map((item, i) => (
//               <div key={i} className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg">
//                 <div className={`w-2 h-2 rounded-full mt-2 ${item.color}`} />
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">{item.action}</p>
//                   <p className="text-xs text-muted-foreground">{item.detail}</p>
//                 </div>
//                 <span className="text-xs text-muted-foreground">{item.time}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }