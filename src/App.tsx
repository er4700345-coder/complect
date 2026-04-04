import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/complect/ThemeProvider";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import AdminLeads from "./pages/AdminLeads";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--bg)',
          color: 'var(--ink)',
          border: '1px solid var(--rule)',
          fontFamily: "'Libre Franklin', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
        },
      }}
    />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
