import { createContext, useContext, useState, useEffect } from "react";

const initialEmployees = [
  { id: 1, empId: "NX-2025-0001", name: "Sarah Chen", email: "employee@gmail.com", skill: "React Developer", joiningDate: "2025-03-15", salaryMonth: 5000, address: "New York, USA", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", phone: "+1 (555) 019-2831", password: "1234", history: {}, payrollHistory: [] },
  { id: 2, empId: "NX-2024-0002", name: "Marcus Johnson", email: "marcus@globalcorp.com", skill: "UI/UX Designer", joiningDate: "2024-11-01", salaryMonth: 4500, address: "London, UK", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", phone: "+44 20 7946 0958", password: "password123", history: {}, payrollHistory: [] },
  { id: 3, empId: "NX-2025-0003", name: "Emily Park", email: "emily@designhub.co", skill: "Product Manager", joiningDate: "2025-01-10", salaryMonth: 6000, address: "San Francisco, USA", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", phone: "+1 (555) 014-9922", password: "password123", history: {}, payrollHistory: [] },
  { id: 4, empId: "NX-2023-0004", name: "David Miller", email: "david@nexgen.com", skill: "Backend Engineer", joiningDate: "2023-08-22", salaryMonth: 5500, address: "Austin, USA", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", phone: "+1 (555) 017-4481", password: "password123", history: {}, payrollHistory: [] },
  { id: 5, empId: "NX-2024-0005", name: "Lisa Wang", email: "lisa@cloudpeak.io", skill: "QA Engineer", joiningDate: "2024-06-18", salaryMonth: 4200, address: "Seattle, USA", image: "https://api.dicebear.com/7.x/initials/svg?seed=Lisa%20Wang", phone: "+1 (555) 012-3399", password: "password123", history: {}, payrollHistory: [] },
  { id: 6, empId: "NX-2023-0006", name: "Tom Rivera", email: "tom@dataflow.com", skill: "DevOps Engineer", joiningDate: "2023-12-04", salaryMonth: 5800, address: "Chicago, USA", image: "https://api.dicebear.com/7.x/initials/svg?seed=Tom%20Rivera", phone: "+1 (555) 015-8811", password: "password123", history: {}, payrollHistory: [] },
  { id: 7, empId: "NX-2024-0007", name: "Anna Schmidt", email: "anna@eurotech.de", skill: "Business Analyst", joiningDate: "2024-09-09", salaryMonth: 4700, address: "Berlin, Germany", image: "https://api.dicebear.com/7.x/initials/svg?seed=Anna%20Schmidt", phone: "+49 30 9234567", password: "password123", history: {}, payrollHistory: [] },
  { id: 8, empId: "NX-2025-0008", name: "James Wilson", email: "james@brightpath.co", skill: "Full Stack Developer", joiningDate: "2025-02-24", salaryMonth: 6200, address: "Toronto, Canada", image: "https://api.dicebear.com/7.x/initials/svg?seed=James%20Wilson", phone: "+1 (416) 555-0199", password: "password123", history: {}, payrollHistory: [] },
  { id: 9, empId: "NX-2023-0009", name: "Priya Nair", email: "priya@zenapps.in", skill: "Mobile Developer", joiningDate: "2023-10-12", salaryMonth: 5100, address: "Bengaluru, India", image: "https://api.dicebear.com/7.x/initials/svg?seed=Priya%20Nair", phone: "+91 80 2345 6789", password: "password123", history: {}, payrollHistory: [] },
  { id: 10, empId: "NX-2024-0010", name: "Omar Hassan", email: "omar@finlogic.ae", skill: "Data Engineer", joiningDate: "2024-04-30", salaryMonth: 6400, address: "Dubai, UAE", image: "https://api.dicebear.com/7.x/initials/svg?seed=Omar%20Hassan", phone: "+971 4 345 6789", password: "password123", history: {}, payrollHistory: [] },
  { id: 11, empId: "NX-2025-0011", name: "Nina Garcia", email: "nina@marketgrid.es", skill: "Marketing Specialist", joiningDate: "2025-05-05", salaryMonth: 3900, address: "Madrid, Spain", image: "https://api.dicebear.com/7.x/initials/svg?seed=Nina%20Garcia", phone: "+34 91 123 4567", password: "password123", history: {}, payrollHistory: [] },
  { id: 12, empId: "NX-2024-0012", name: "Ethan Brooks", email: "ethan@northstar.com", skill: "Security Analyst", joiningDate: "2024-01-16", salaryMonth: 5700, address: "Boston, USA", image: "https://api.dicebear.com/7.x/initials/svg?seed=Ethan%20Brooks", phone: "+1 (617) 555-0122", password: "password123", history: {}, payrollHistory: [] },
];

const fallbackTasks = [
  { id: 1, text: "Follow up with Acme Corp on enterprise deal", employeeId: "NX-2025-0001", employeeName: "Sarah Chen", designation: "React Developer", dateAssigned: "2026-06-15", completed: false },
];

const EmployeeContext = createContext();
export const useEmployees = () => useContext(EmployeeContext);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(() => {
    const savedEmps = localStorage.getItem("workspace_employees");
    let baseEmployees = savedEmps ? JSON.parse(savedEmps) : initialEmployees;
    const todayStr = new Date().toISOString().split("T")[0];
    
    return baseEmployees.map((emp) => {
      if (!emp.payrollHistory) emp.payrollHistory = [];
      if (!emp.baseSalary) emp.baseSalary = emp.salaryMonth || 5000;

      if (!emp.history) return emp;
      let historyModified = false;
      const updatedHistory = { ...emp.history };

      Object.keys(updatedHistory).forEach((historyDate) => {
        if (historyDate < todayStr) {
          const record = updatedHistory[historyDate];
          if (record && record.loginTime && !record.logoutTime && record.status !== "Absent") {
            updatedHistory[historyDate] = {
              ...record,
              status: "Absent",
              notes: "Auto-marked: Missing explicit checkout record log parameters."
            };
            historyModified = true;
          }
        }
      });
      return historyModified ? { ...emp, history: updatedHistory } : emp;
    });
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("workspace_tasks");
    return savedTasks ? JSON.parse(savedTasks) : fallbackTasks;
  });

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("workspace_projects");
    return savedProjects ? JSON.parse(savedProjects) : [
      { id: 1, projectId: "PRJ-2026-0001", name: "Enterprise CRM Ecosystem", description: "Core structural overhaul of corporate communications management arrays." }
    ];
  });

  useEffect(() => {
    localStorage.setItem("workspace_employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "workspace_tasks" && e.newValue) setTasks(JSON.parse(e.newValue));
      if (e.key === "workspace_employees" && e.newValue) setEmployees(JSON.parse(e.newValue));
      if (e.key === "workspace_projects" && e.newValue) setProjects(JSON.parse(e.newValue));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const calculateMonthlySalaryMetrics = (employee, targetYearMonth) => {
    const base = employee.baseSalary || 5000;
    const allowedLeaves = 3;
    let totalAbsences = 0;

    if (employee.history) {
      Object.keys(employee.history).forEach((dateStr) => {
        if (dateStr.startsWith(targetYearMonth)) {
          if (employee.history[dateStr].status === "Absent" || employee.history[dateStr].present === false) {
            totalAbsences++;
          }
        }
      });
    }

    const unexcusedAbsences = Math.max(0, totalAbsences - allowedLeaves);
    const dailyRate = base / 26; 
    const lopDeduction = Math.round(unexcusedAbsences * dailyRate);
    const netPayout = Math.max(0, base - lopDeduction);

    return {
      totalAbsences,
      unexcusedAbsences,
      lopDeduction,
      netPayout,
      baseSalary: base
    };
  };

  const processPayrollPayment = (empId, yearMonth) => {
    setEmployees((currentEmployees) => {
      return currentEmployees.map((emp) => {
        if (emp.empId !== empId) return emp;

        const metrics = calculateMonthlySalaryMetrics(emp, yearMonth);
        const currentPayroll = emp.payrollHistory || [];
        
        const exists = currentPayroll.some(p => p.month === yearMonth);
        if (exists) return emp;

        const newReceipt = {
          id: Date.now(),
          month: yearMonth,
          baseSalary: metrics.baseSalary,
          deductions: metrics.lopDeduction,
          netPayout: metrics.netPayout,
          absences: metrics.totalAbsences,
          paymentDate: new Date().toISOString().split("T")[0],
          status: "Paid"
        };

        return {
          ...emp,
          payrollHistory: [newReceipt, ...currentPayroll]
        };
      });
    });

    setCurrentUser((prev) => {
      if (!prev || prev.empId !== empId) return prev;
      const metrics = calculateMonthlySalaryMetrics(prev, yearMonth);
      const currentPayroll = prev.payrollHistory || [];
      if (currentPayroll.some(p => p.month === yearMonth)) return prev;

      return {
        ...prev,
        payrollHistory: [{
          id: Date.now(),
          month: yearMonth,
          baseSalary: metrics.baseSalary,
          deductions: metrics.lopDeduction,
          netPayout: metrics.netPayout,
          absences: metrics.totalAbsences,
          paymentDate: new Date().toISOString().split("T")[0],
          status: "Paid"
        }, ...currentPayroll]
      };
    });
  };

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("workspace_tasks", JSON.stringify(updatedTasks));
  };

  const addEmployee = (newEmpObj) => {
    setEmployees((currentEmployees) => {
      const nextId = currentEmployees.length > 0 ? Math.max(...currentEmployees.map(e => e.id)) + 1 : 1;
      const nextIdNum = String(currentEmployees.length + 1).padStart(4, "0");
      const generatedEmpId = `NX-2026-${nextIdNum}`;

      const completedEmployeeItem = {
        id: nextId,
        empId: generatedEmpId,
        history: {},
        payrollHistory: [],
        baseSalary: Number(newEmpObj.salaryMonth) || 5000,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newEmpObj.name)}`,
        password: "password123",
        ...newEmpObj,
      };

      const updated = [...currentEmployees, completedEmployeeItem];
      localStorage.setItem("workspace_employees", JSON.stringify(updated));
      return updated;
    });
  };

  const editEmployee = (id, updatedFields) => {
    setEmployees((currentEmployees) => {
      return currentEmployees.map((emp) => (emp.id === id ? { ...emp, ...updatedFields } : emp));
    });
    setCurrentUser((prevUser) => {
      if (prevUser && prevUser.id === id) return { ...prevUser, ...updatedFields };
      return prevUser;
    });
  };

  const addProject = (projectObj) => {
    const updated = [...projects, { ...projectObj, id: Date.now() }];
    setProjects(updated);
    localStorage.setItem("workspace_projects", JSON.stringify(updated));
  };

  const loginAsAdmin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setCurrentRole("admin");
      setCurrentUser({ name: "John Doe", skill: "System Administrator", image: "https://api.dicebear.com/7.x/initials/svg?seed=JD" });
      return { success: true };
    }
    return { success: false, msg: "Invalid Management Credentials." };
  };

  const loginAsEmployee = (emailOrPhoneOrId, password) => {
    // ✅ FIXED: Strict mapping ensuring strings evaluate cleanly to authentic profiles
    const foundUser = employees.find(
      (emp) => 
        (emp.email === emailOrPhoneOrId || 
         emp.phone === emailOrPhoneOrId || 
         emp.empId === emailOrPhoneOrId) && 
        (String(emp.password) === String(password))
    );

    if (foundUser) {
      setCurrentRole("employee");
      setCurrentUser(foundUser);
      return { success: true };
    }
    return { success: false, msg: "Invalid Credentials." };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentRole(null);
  };

  const setAttendanceStatus = (id, date, statusData) => {
    setEmployees((currentEmployees) => {
      return currentEmployees.map((emp) => {
        if (emp.id !== id) return emp;
        const currentHistory = emp.history || {};
        return { ...emp, history: { ...currentHistory, [date]: { ...(currentHistory[date] || {}), ...statusData } } };
      });
    });
    setCurrentUser((prevUser) => {
      if (!prevUser || prevUser.id !== id) return prevUser;
      const currentHistory = prevUser.history || {};
      return { ...prevUser, history: { ...currentHistory, [date]: { ...(currentHistory[date] || {}), ...statusData } } };
    });
  };

  const addTask = (taskObj) => {
    const updated = [...tasks, { ...taskObj, id: Date.now(), completed: false }];
    saveTasks(updated);
  };

  const toggleTaskStatus = (taskId) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    saveTasks(updated);
  };

  return (
    <EmployeeContext.Provider 
      value={{ 
        employees, addEmployee, editEmployee, setAttendanceStatus,
        tasks, addTask, toggleTaskStatus, currentUser, currentRole, loginAsAdmin, loginAsEmployee, logoutUser,
        projects, addProject, calculateMonthlySalaryMetrics, processPayrollPayment 
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}