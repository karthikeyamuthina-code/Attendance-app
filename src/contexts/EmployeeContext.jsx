import { createContext, useContext, useState } from "react";

const initialEmployees = [
  { id: 1, empId: "NX-2025-0001", name: "Sarah Chen", email: "sarah@techstart.io", skill: "React Developer", joiningDate: "2025-03-15", salaryMonth: 5000, address: "New York, USA", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", history: {} },
  { id: 2, empId: "NX-2024-0002", name: "Marcus Johnson", email: "marcus@globalcorp.com", skill: "UI/UX Designer", joiningDate: "2024-11-01", salaryMonth: 4500, address: "London, UK", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", history: {} },
  { id: 3, empId: "NX-2025-0003", name: "Emily Park", email: "emily@designhub.co", skill: "Product Manager", joiningDate: "2025-01-10", salaryMonth: 6000, address: "San Francisco, USA", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", history: {} },
  { id: 4, empId: "NX-2023-0004", name: "David Miller", email: "david@nexgen.com", skill: "Backend Engineer", joiningDate: "2023-08-22", salaryMonth: 5500, address: "Austin, USA", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", history: {} },
  { id: 5, empId: "NX-2024-0005", name: "Lisa Wang", email: "lisa@cloudpeak.io", skill: "QA Engineer", joiningDate: "2024-06-18", salaryMonth: 4200, address: "Seattle, USA", image: "https://api.dicebear.com/7.x/initials/svg?seed=Lisa%20Wang", history: {} },
  { id: 6, empId: "NX-2023-0006", name: "Tom Rivera", email: "tom@dataflow.com", skill: "DevOps Engineer", joiningDate: "2023-12-04", salaryMonth: 5800, address: "Chicago, USA", image: "https://api.dicebear.com/7.x/initials/svg?seed=Tom%20Rivera", history: {} },
  { id: 7, empId: "NX-2024-0007", name: "Anna Schmidt", email: "anna@eurotech.de", skill: "Business Analyst", joiningDate: "2024-09-09", salaryMonth: 4700, address: "Berlin, Germany", image: "https://api.dicebear.com/7.x/initials/svg?seed=Anna%20Schmidt", history: {} },
  { id: 8, empId: "NX-2025-0008", name: "James Wilson", email: "james@brightpath.co", skill: "Full Stack Developer", joiningDate: "2025-02-24", salaryMonth: 6200, address: "Toronto, Canada", image: "https://api.dicebear.com/7.x/initials/svg?seed=James%20Wilson", history: {} },
  { id: 9, empId: "NX-2023-0009", name: "Priya Nair", email: "priya@zenapps.in", skill: "Mobile Developer", joiningDate: "2023-10-12", salaryMonth: 5100, address: "Bengaluru, India", image: "https://api.dicebear.com/7.x/initials/svg?seed=Priya%20Nair", history: {} },
  { id: 10, empId: "NX-2024-0010", name: "Omar Hassan", email: "omar@finlogic.ae", skill: "Data Engineer", joiningDate: "2024-04-30", salaryMonth: 6400, address: "Dubai, UAE", image: "https://api.dicebear.com/7.x/initials/svg?seed=Omar%20Hassan", history: {} },
  { id: 11, empId: "NX-2025-0011", name: "Nina Garcia", email: "nina@marketgrid.es", skill: "Marketing Specialist", joiningDate: "2025-05-05", salaryMonth: 3900, address: "Madrid, Spain", image: "https://api.dicebear.com/7.x/initials/svg?seed=Nina%20Garcia", history: {} },
  { id: 12, empId: "NX-2024-0012", name: "Ethan Brooks", email: "ethan@northstar.com", skill: "Security Analyst", joiningDate: "2024-01-16", salaryMonth: 5700, address: "Boston, USA", image: "https://api.dicebear.com/7.x/initials/svg?seed=Ethan%20Brooks", history: {} },
];

const EmployeeContext = createContext();
export const useEmployees = () => useContext(EmployeeContext);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees);

  const addEmployee = (employee) => {
    const year = employee.joiningDate ? employee.joiningDate.split("-")[0] : new Date().getFullYear();
    const randomSerialNumber = Math.floor(1000 + Math.random() * 9000);
    
    setEmployees((currentEmployees) => [
      ...currentEmployees,
      {
        id: Date.now(),
        empId: `NX-${year}-${randomSerialNumber}`,
        name: employee.name,
        email: employee.email,
        skill: employee.skill || "Developer",
        joiningDate: employee.joiningDate || new Date().toISOString().split("T")[0],
        salaryMonth: Number(employee.salaryMonth) || 0,
        address: employee.address || "N/A",
        image: employee.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(employee.name)}`,
        history: {},
      },
    ]);
  };

  const editEmployee = (id, updatedFields) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((emp) => (emp.id === id ? { ...emp, ...updatedFields } : emp))
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((currentEmployees) => currentEmployees.filter((emp) => emp.id !== id));
  };

  // ✅ ADDED: Explicit status tracker for the dual checkboxes
  const setAttendanceStatus = (id, date, isPresent) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((emp) => {
        if (emp.id !== id) return emp;
        const history = emp.history || {};
        const existingRecord = history[date] || { reason: "" };

        return {
          ...emp,
          history: {
            ...history,
            [date]: {
              present: isPresent,
              reason: isPresent ? "" : existingRecord.reason, // Auto-clear reason text if marked present
            },
          },
        };
      })
    );
  };

  // ✅ ADDED: Handler to update the text reason for dynamic input fields
  const updateAbsentReason = (id, date, reasonText) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((emp) => {
        if (emp.id !== id) return emp;
        const history = emp.history || {};
        const existingRecord = history[date] || { present: false };

        return {
          ...emp,
          history: {
            ...history,
            [date]: {
              ...existingRecord,
              reason: reasonText,
            },
          },
        };
      })
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee, setAttendanceStatus, updateAbsentReason }}>
      {children}
    </EmployeeContext.Provider>
  );
}