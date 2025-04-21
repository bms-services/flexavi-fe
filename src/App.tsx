
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import Appointments from "./pages/Appointments";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Calculator from "./pages/Calculator";
import CalculatorDetail from "./pages/CalculatorDetail";
import Quotes from "./pages/Quotes";
import QuoteEdit from "./pages/QuoteEdit";
import WorkAgreements from "./pages/WorkAgreements";
import WorkAgreementEdit from "./pages/WorkAgreementEdit";
import Invoices from "./pages/Invoices";
import InvoiceEdit from "./pages/InvoiceEdit";
import InvoicesMain from "./pages/InvoicesMain";
import { InvoicesFilters } from "./pages/InvoicesFilters";
import Products from "./pages/Products";
import Partners from "./pages/Partners";
import Settings from "./pages/Settings";
import Pipeline from "./pages/Pipeline";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CustomerPortal from "./pages/CustomerPortal";
import CustomerPortalQuote from "./pages/CustomerPortalQuote";
import CustomerPortalWorkAgreement from "./pages/CustomerPortalWorkAgreement";
import CustomerPortalWorkOrder from "./pages/CustomerPortalWorkOrder";
import CustomerPortalInvoice from "./pages/CustomerPortalInvoice";
import CustomerDashboard from "./pages/CustomerDashboard";
import EmployeePlanning from "./pages/EmployeePlanning";
import EmployeeManagement from "./pages/EmployeeManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Pricing from "./pages/Pricing";
import Landing from "./pages/Landing";
import Requests from "./pages/Requests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/calculator/:id" element={<CalculatorDetail />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quotes/new" element={<QuoteEdit />} />
        <Route path="/quotes/:id" element={<QuoteEdit />} />
        <Route path="/workagreements" element={<WorkAgreements />} />
        <Route path="/workagreements/new" element={<WorkAgreementEdit />} />
        <Route path="/workagreements/:id" element={<WorkAgreementEdit />} />
        <Route path="/invoices" element={<InvoicesMain />}>
          <Route index element={<Invoices />} />
          <Route path="filter" element={<InvoicesFilters />} />
        </Route>
        <Route path="/invoices/new" element={<InvoiceEdit />} />
        <Route path="/invoices/:id" element={<InvoiceEdit />} />
        <Route path="/products" element={<Products />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/employee/planning" element={<EmployeePlanning />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Customer Portal Routes */}
        <Route path="/portal" element={<CustomerPortal />} />
        <Route path="/portal/quotes/:id" element={<CustomerPortalQuote />} />
        <Route path="/portal/work-agreements/:id" element={<CustomerPortalWorkAgreement />} />
        <Route path="/portal/work-orders/:id" element={<CustomerPortalWorkOrder />} />
        <Route path="/portal/invoices/:id" element={<CustomerPortalInvoice />} />
        <Route path="/portal/dashboard" element={<CustomerDashboard />} />
        
        {/* Marketing Pages */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/landing" element={<Landing />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
