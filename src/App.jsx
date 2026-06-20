import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UICustomizationProvider } from "@/contexts/UICustomizationContext";
import { EmployeeProvider, useEmployees } from "@/contexts/EmployeeContext"; 

import { AppSidebar } from "@/components/AppSidebar";
import { TopHeader } from "@/components/TopHeader";

// Page Imports
import LoginGateway from "@/pages/LoginGateway"; 
import EmployeePortal from "@/pages/EmployeePortal"; 
import EmployeeTasks from "@/pages/EmployeeTasks"; 
import EmployeeSalary from "@/pages/EmployeeSalary";
import EmployeeAttendance from "@/pages/EmployeeAttendance"; 
import EmployeeDetailsPage from "@/pages/EmployeeDetailsPage"; // ✅ ADDED: Integrated employee profile layout
import Dashboard from "@/pages/Dashboard";
import Leads from "@/pages/Leads";
import Customers from "./pages/Customers";
import TaskStatus from "@/pages/TaskStatus"; 
import Pipeline from "@/pages/Pipeline";
import Tasks from "@/pages/Tasks";
import CalendarPage from "@/pages/CalendarPage";
import Support from "@/pages/Support";
import Analytics from "@/pages/Analytics";
import SettingsPage from "@/pages/SettingsPage";
import Roles from "@/pages/Roles";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { currentRole } = useEmployees();

  // 1. GATEWAY CHECK: If no role is selected/logged in, completely isolate views behind Login Gateway
  if (!currentRole) {
    return (
      <Routes>
        <Route path="*" element={<LoginGateway />} />
      </Routes>
    );
  }

  // 2. AUTHORIZED WORKSPACE: Render Layout Framework & Conditional Role-Based Routing Matrix
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />

        <main className="flex-1 overflow-auto">
          <Routes>
            {currentRole === "admin" ? (
              <>
                {/* 👑 ADMIN CHANNELS */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/task-status" element={<TaskStatus />} /> 
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/roles" element={<Roles />} />
                
                {/* ✅ ACCESS GRANTED FOR ADMIN: Maps the shared sidebar link cleanly to the admin tracking components */}
                <Route path="/attendance" element={<Customers />} /> 
                <Route path="/salary" element={<Pipeline />} /> 
              </>
            ) : (
              <>
                {/* 🧑‍💻 EMPLOYEE CHANNELS */}
                <Route path="/" element={<EmployeePortal />} />
                <Route path="/task-status" element={<TaskStatus />} />
                <Route path="/tasks" element={<EmployeeTasks />} /> 
                
                {/* ✅ ACCESS GRANTED FOR EMPLOYEE: Maps the shared sidebar links to self-service portals */}
                <Route path="/leads" element={<EmployeeDetailsPage />} /> {/* ✅ MODIFIED: Swapped fallback navigation string with profile page layout */}
                <Route path="/salary" element={<EmployeeSalary />} />
                <Route path="/attendance" element={<EmployeeAttendance />} /> 
                
                {/* Redirect stray admin path attempts from employees back to home */}
                <Route path="/customers" element={<Navigate to="/" replace />} />
                <Route path="/pipeline" element={<Navigate to="/" replace />} />
              </>
            )}

            {/* 🛠️ SHARED UTILITY ROUTES */}
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UICustomizationProvider>
          <EmployeeProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Toaster />
                <Sonner />
                <AppContent />
              </BrowserRouter>
            </TooltipProvider>
          </EmployeeProvider>
        </UICustomizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;