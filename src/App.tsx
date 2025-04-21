
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import Appointments from "./pages/Appointments";
import Quotes from "./pages/Quotes";
import QuoteEdit from "./pages/QuoteEdit";
import Invoices from "./pages/Invoices";
import InvoiceEdit from "./pages/InvoiceEdit";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import CustomerPortal from "./pages/CustomerPortal";
import CustomerPortalInvoice from "./pages/CustomerPortalInvoice";
import CustomerDashboard from "./pages/CustomerDashboard";
import WorkAgreements from "./pages/WorkAgreements";
import WorkAgreementEdit from "./pages/WorkAgreementEdit";
import CustomerPortalWorkAgreement from "./pages/CustomerPortalWorkAgreement";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Partners from "./pages/Partners";
import Pipeline from "./pages/Pipeline";
import CustomerPortalQuote from "./pages/CustomerPortalQuote";
import CustomerPortalWorkOrder from "./pages/CustomerPortalWorkOrder";
import EmployeePlanningPage from "./pages/EmployeePlanning";
import CalculatorPage from "./pages/Calculator";
import CalculatorDetail from "./pages/CalculatorDetail";
import RoofMeasurement from "./pages/RoofMeasurement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/create" element={<QuoteEdit />} />
          <Route path="/quotes/edit/:id" element={<QuoteEdit />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/create" element={<InvoiceEdit />} />
          <Route path="/invoices/edit/:id" element={<InvoiceEdit />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workagreements" element={<WorkAgreements />} />
          <Route path="/workagreements/create" element={<WorkAgreementEdit />} />
          <Route path="/workagreements/edit/:id" element={<WorkAgreementEdit />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/portal/quote/:id" element={<CustomerPortalQuote />} />
          <Route path="/portal/invoice/:id" element={<CustomerPortalInvoice />} />
          <Route path="/portal/workagreement/:id" element={<CustomerPortalWorkAgreement />} />
          <Route path="/portal/dashboard/:leadId" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/portal/workorder/:id" element={<CustomerPortalWorkOrder />} />
          <Route path="/employee/planning" element={<EmployeePlanningPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/calculator/:id" element={<CalculatorDetail />} />
          <Route path="/roof-measurement" element={<RoofMeasurement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
