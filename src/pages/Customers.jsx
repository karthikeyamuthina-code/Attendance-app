import { useState } from "react";
import { Search, CheckCircle, XCircle, Calendar as CalendarIcon } from "lucide-react";
import { useEmployees } from "../contexts/EmployeeContext";

export default function Customers() {
  const { employees, setAttendanceStatus, updateAbsentReason } = useEmployees();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-06-15");

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const targetYear = new Date(selectedDate).getFullYear();
  
  const calculateBusinessDaysCount = (yearStr) => {
    let businessDays = 0;
    const startDate = new Date(yearStr, 0, 1);
    const endDate = new Date(selectedDate);
    
    while (startDate <= endDate) {
      const dayOfWeek = startDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    return businessDays;
  };

  const totalWorkingDays = calculateBusinessDaysCount(targetYear);

  let totalPresentCount = 0;
  let totalAbsentCount = 0;

  filteredEmployees.forEach((emp) => {
    Object.entries(emp.history || {}).forEach(([dateKey, record]) => {
      if (dateKey.startsWith(targetYear.toString())) {
        if (record?.present === true) {
          totalPresentCount++;
        } else if (record?.present === false) {
          totalAbsentCount++;
        }
      }
    });
  });

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Employee Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your employee tracking status and logs across the workspace
          </p>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-3 gap-4 min-w-[320px] sm:min-w-[400px]">
          <div className="bg-secondary/40 border border-border p-3 rounded-xl text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Working Days ({targetYear})</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{totalWorkingDays}</p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Total Present Logs</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{totalPresentCount}</p>
          </div>
          <div className="bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Total Absent Logs</p>
            <p className="text-lg font-bold text-rose-600 dark:text-rose-400 mt-0.5">{totalAbsentCount}</p>
          </div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex items-center w-full sm:w-auto shrink-0">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-48 h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition shadow-sm"
          />
        </div>

        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search roster by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition shadow-sm"
          />
        </div>
      </div>

      {/* Attendance Table Matrix */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Designation</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground w-36">Status</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground w-32">Present</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground w-32">Absent</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground min-w-[200px]">Reason for Absence</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => {
              const currentRecord = employee.history?.[selectedDate];
              
              const isMarked = currentRecord !== undefined;
              const isPresent = isMarked && currentRecord.present === true;
              const isAbsent = isMarked && currentRecord.present === false;
              const absentReason = currentRecord?.reason || "";

              return (
                <tr key={employee.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                        {employee.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-muted-foreground">{employee.skill}</td>
                  
                  <td className="py-4 px-4 text-center">
                    {isMarked ? (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        isPresent 
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}>
                        {isPresent ? <CheckCircle size={12}/> : <XCircle size={12}/>}
                        {isPresent ? "Present" : "Absent"}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground italic bg-secondary px-2.5 py-1 rounded-full">
                        Unmarked
                      </span>
                    )}
                  </td>
                  
                  {/* Present Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      // ✅ FIXED: If already present, clicking it again resets the status back to unmarked cleanly
                      checked={isPresent}
                      onChange={() => setAttendanceStatus(employee.id, selectedDate, !isPresent ? true : undefined)}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30 cursor-pointer accent-emerald-600"
                    />
                  </td>

                  {/* Absent Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      // ✅ FIXED: If already absent, clicking it again resets the status back to unmarked cleanly
                      checked={isAbsent}
                      onChange={() => setAttendanceStatus(employee.id, selectedDate, !isAbsent ? false : undefined)}
                      className="w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500/30 cursor-pointer accent-rose-600"
                    />
                  </td>

                  {/* Conditional Reason Input field */}
                  <td className="py-4 px-4">
                    {isAbsent ? (
                      <input 
                        type="text"
                        placeholder="Specify reason (e.g., Sick leave)..."
                        value={absentReason}
                        onChange={(e) => updateAbsentReason(employee.id, selectedDate, e.target.value)}
                        className="w-full h-8 px-2.5 rounded-md bg-secondary/50 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-foreground"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground/40 italic select-none">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">No employees registered.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search, Mail, Phone, MapPin } from "lucide-react";

// // ✅ Fixed Data
// const customers = [
//   {
//     id: 1,
//     name: "Acme Corporation",
//     contact: "John Smith",
//     email: "john@acme.com",
//     phone: "+1 555-0101",
//     location: "San Francisco, CA",
//     revenue: "$245,000",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "TechStart Inc.",
//     contact: "Sarah Chen",
//     email: "sarah@techstart.io",
//     phone: "+1 555-0102",
//     location: "New York, NY",
//     revenue: "$128,000",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Global Corp",
//     contact: "Marcus Johnson",
//     email: "marcus@globalcorp.com",
//     phone: "+1 555-0103",
//     location: "Chicago, IL",
//     revenue: "$567,000",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "DesignHub Co.",
//     contact: "Emily Park",
//     email: "emily@designhub.co",
//     phone: "+1 555-0104",
//     location: "Austin, TX",
//     revenue: "$89,000",
//     status: "Inactive",
//   },
//   {
//     id: 5,
//     name: "NexGen Solutions",
//     contact: "David Miller",
//     email: "david@nexgen.com",
//     phone: "+1 555-0105",
//     location: "Seattle, WA",
//     revenue: "$340,000",
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "CloudPeak Systems",
//     contact: "Lisa Wang",
//     email: "lisa@cloudpeak.io",
//     phone: "+1 555-0106",
//     location: "Boston, MA",
//     revenue: "$178,000",
//     status: "Active",
//   },
// ];

// export default function Customers() {
//   const [search, setSearch] = useState("");

//   // ✅ Filter
//   const filtered = customers.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.contact.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Customers</h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           {customers.length} customer accounts
//         </p>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           type="text"
//           placeholder="Search customers..."
//           className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
//         />
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map((customer, i) => (
//           <motion.div
//             key={customer.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer group"
//           >
//             {/* Top */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 {/* Avatar */}
//                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
//                   {customer.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .slice(0, 2)}
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-foreground">
//                     {customer.name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     {customer.contact}
//                   </p>
//                 </div>
//               </div>

//               {/* Status */}
//               <span
//                 className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                   customer.status === "Active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-muted text-muted-foreground"
//                 }`}
//               >
//                 {customer.status}
//               </span>
//             </div>

//             {/* Info */}
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Mail className="w-3.5 h-3.5" />
//                 {customer.email}
//               </div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Phone className="w-3.5 h-3.5" />
//                 {customer.phone}
//               </div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <MapPin className="w-3.5 h-3.5" />
//                 {customer.location}
//               </div>
//             </div>

//             {/* Bottom */}
//             <div className="flex justify-between pt-4 border-t border-border">
//               <div>
//                 <p className="text-xs text-muted-foreground">Revenue</p>
//                 <p className="font-bold text-foreground">
//                   {customer.revenue}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-muted-foreground">Status</p>
//                 <p className="font-bold text-foreground">
//                   {customer.status}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }