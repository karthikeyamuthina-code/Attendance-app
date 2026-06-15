

// these is the  modification code


import { useEmployees } from "../contexts/EmployeeContext";
import { Users, UserCheck, UserX, Calendar } from "lucide-react";

export default function Index() {
  const { employees } = useEmployees();

  // Selected baseline date reference matching our tracking system operations context (June 15, 2026)
  const todayStr = "2026-06-15";

  // ✅ Compute Dynamic Dashboard Counter metrics across Context data lists
  const totalEmployees = employees ? employees.length : 0;
  
  const totalPresentToday = employees 
    ? employees.filter(emp => emp.history?.[todayStr]?.present === true).length 
    : 0;
    
  const totalAbsentToday = employees 
    ? employees.filter(emp => emp.history?.[todayStr]?.present === false).length 
    : 0;
    
  const unmarkedToday = totalEmployees - (totalPresentToday + totalAbsentToday);

  // Take the last 3 onboarded employee members to display in the overview panel feed
  const recentEmployees = employees ? [...employees].slice(-3).reverse() : [];

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto space-y-6">
      {/* Welcome & Subtitle Banner */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, Admin. Here's your company overview tracking summary sheet for today, <strong>{todayStr}</strong>.
        </p>
      </div>

      {/* Analytics KPI Count Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Strength */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Strength</p>
            <p className="text-2xl font-bold text-foreground mt-0.5">{totalEmployees}</p>
          </div>
        </div>

        {/* Card 2: Checked In Present Counter */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Checked In</p>
            <p className="text-2xl font-bold text-emerald-600 mt-0.5">{totalPresentToday}</p>
          </div>
        </div>

        {/* Card 3: Absent List Count */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
            <UserX size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Absent List</p>
            <p className="text-2xl font-bold text-rose-600 mt-0.5">{totalAbsentToday}</p>
          </div>
        </div>

        {/* Card 4: Unmarked Sheet Counter */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Unmarked Sheets</p>
            <p className="text-2xl font-bold text-amber-600 mt-0.5">{unmarkedToday}</p>
          </div>
        </div>
      </div>

      {/* Main Bottom Section content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Additions Card Feed Panel */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-foreground">Recently Onboarded Members</h3>
          <div className="divide-y divide-border">
            {recentEmployees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={emp.image} alt="" className="w-9 h-9 rounded-full object-cover border bg-secondary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.skill}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md font-mono">
                  {emp.empId}
                </span>
              </div>
            ))}
            {recentEmployees.length === 0 && (
              <p className="text-xs text-muted-foreground py-4 text-center">No employees listed in directory metrics database.</p>
            )}
          </div>
        </div>

        {/* Dynamic Status Utilization Circle Gauge Panel */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-bold text-foreground mb-3">Roster Utilization</h3>
          <div className="w-full flex items-center justify-center py-4">
            <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-primary/40 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-foreground">
                {totalEmployees > 0 ? Math.round((totalPresentToday / totalEmployees) * 100) : 0}%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-0.5">Active Rate</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center italic mt-2">
            Dynamic statistics display panel linked live to your employee attendance section registers.
          </p>
        </div>

      </div>
    </div>
  );
}

// const PlaceholderIndex = () => {
//   return (
//     <div
//       className="flex min-h-screen items-center justify-center"
//       style={{ backgroundColor: "#fcfbf8" }}
//     >
//       <img
//         data-lovable-blank-page-placeholder="REMOVE_THIS"
//         src="/placeholder.svg"
//         alt="Your app will live here!"
//       />
//     </div>
//   );
// };

// const Index = PlaceholderIndex;

// export default Index;

// upper code is original 

// import { motion } from "framer-motion";

// const PlaceholderIndex = () => {
//   return (
//     <div
//       className="flex min-h-screen items-center justify-center"
//       style={{ backgroundColor: "#fcfbf8" }}
//     >
//       <motion.img
//         data-lovable-blank-page-placeholder="REMOVE_THIS"
//         src="/placeholder.svg"
//         alt="Your app will live here!"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="w-40 h-40 object-contain"
//       />
//     </div>
//   );
// };

// const Index = PlaceholderIndex;

// export default Index;

