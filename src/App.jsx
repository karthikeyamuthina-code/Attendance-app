import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UICustomizationProvider } from "@/contexts/UICustomizationContext";
import { EmployeeProvider } from "@/contexts/EmployeeContext";

import { AppSidebar } from "@/components/AppSidebar";
import { TopHeader } from "@/components/TopHeader";

import Dashboard from "@/pages/Dashboard";
import Leads from "@/pages/Leads";
import Customers from "@/pages/Customers";
import Pipeline from "@/pages/Pipeline";
import Tasks from "@/pages/Tasks";
import CalendarPage from "@/pages/CalendarPage";
import Support from "@/pages/Support";
import Analytics from "@/pages/Analytics";
import SettingsPage from "@/pages/SettingsPage";
import Roles from "@/pages/Roles";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

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

                <div className="flex min-h-screen w-full bg-background">
                  <AppSidebar />

                  <div className="flex-1 flex flex-col min-w-0">
                    <TopHeader />

                    <main className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/pipeline" element={<Pipeline />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/roles" element={<Roles />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </EmployeeProvider>
        </UICustomizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
