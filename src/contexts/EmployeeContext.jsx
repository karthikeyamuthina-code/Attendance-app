import { createContext, useContext, useState, useEffect } from "react";

const initialEmployees = [
  { id: 1, empId: "NX-2025-0001", name: "Sarah Chen", email: "sarah@techstart.io", skill: "React Developer", joiningDate: "2025-03-15", salaryMonth: 5000, address: "New York, USA", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", phone: "+1 (555) 019-2831", password: "password123", history: {} },
  { id: 2, empId: "NX-2024-0002", name: "Marcus Johnson", email: "marcus@globalcorp.com", skill: "UI/UX Designer", joiningDate: "2024-11-01", salaryMonth: 4500, address: "London, UK", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", phone: "+44 20 7946 0958", password: "password123", history: {} },
];

const fallbackTasks = [
  { id: 1, text: "Follow up with Acme Corp on enterprise deal", employeeId: "NX-2025-0001", employeeName: "Sarah Chen", designation: "React Developer", dateAssigned: "2026-06-15", completed: false },
];

const EmployeeContext = createContext();
export const useEmployees = () => useContext(EmployeeContext);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(() => {
    const savedEmps = localStorage.getItem("workspace_employees");
    return savedEmps ? JSON.parse(savedEmps) : initialEmployees;
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

  // ✅ MODIFIED: Entire auto-absent check code block has been completely removed from here.

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("workspace_tasks", JSON.stringify(updatedTasks));
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
    if (emailOrPhoneOrId === "employee" && password === "employee123") {
      setCurrentRole("employee");
      setCurrentUser(employees[0]); 
      return { success: true };
    }
    const foundUser = employees.find(
      (emp) => (emp.email === emailOrPhoneOrId || emp.phone === emailOrPhoneOrId || emp.empId === emailOrPhoneOrId) && (emp.password === password || password === "employee123")
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

  // ✅ MODIFIED: Dynamic structure to hold Check-In, Check-Out, and computed working duration metrics
  const setAttendanceStatus = (id, date, statusData) => {
    setEmployees((currentEmployees) => {
      const updated = currentEmployees.map((emp) => {
        if (emp.id !== id) return emp;
        const currentHistory = emp.history || {};
        return {
          ...emp,
          history: {
            ...currentHistory,
            [date]: {
              ...(currentHistory[date] || {}),
              ...statusData
            }
          },
        };
      });
      localStorage.setItem("workspace_employees", JSON.stringify(updated));
      return updated;
    });

    setCurrentUser((prevUser) => {
      if (!prevUser || prevUser.id !== id) return prevUser;
      const currentHistory = prevUser.history || {};
      return {
        ...prevUser,
        history: {
          ...currentHistory,
          [date]: {
            ...(currentHistory[date] || {}),
            ...statusData
          }
        },
      };
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
        employees, setAttendanceStatus,
        tasks, addTask, toggleTaskStatus, currentUser, currentRole, loginAsAdmin, loginAsEmployee, logoutUser,
        projects, addProject
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}