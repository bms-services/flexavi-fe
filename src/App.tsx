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
import EmployeeSchedule from "./pages/EmployeeSchedule";
import AdminDashboard from "./pages/admin/AdminDashboard";
import KnowledgeBaseManagement from "./pages/admin/KnowledgeBaseManagement";
import Pricing from "./pages/Pricing";
import Landing from "./pages/Landing";
import Requests from "./pages/Requests";
import ReputationManagement from "./pages/ReputationManagement";
import Expenses from "./pages/Expenses";
import ExpenseDetail from "./pages/ExpenseDetail";
import WorkAgreementDetail from "./pages/WorkAgreementDetail";
import Support from "./pages/Support";
import SupportTicketDetailPage from "./pages/SupportTicketDetailPage";
import Community from "./pages/Community";
import FAQ from "./pages/FAQ";
import KnowledgeBase from "./pages/KnowledgeBase";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { AuthProvider } from "./lib/auth-provider";
import RootRedirect from "./layouts/RootRedirect";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Dashboard Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Index />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/:id" element={<LeadDetails />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="calculator/:id" element={<CalculatorDetail />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="quotes/create" element={<QuoteEdit />} />
            <Route path="quotes/edit/:id" element={<QuoteEdit />} />
            <Route path="workagreements" element={<WorkAgreements />} />
            <Route path="workagreements/create" element={<WorkAgreementEdit />} />
            <Route path="workagreements/edit/:id" element={<WorkAgreementEdit />} />
            <Route path="workagreements/:id" element={<WorkAgreementDetail />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/create" element={<InvoiceEdit />} />
            <Route path="invoices/edit/:id" element={<InvoiceEdit />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="expenses/:id" element={<ExpenseDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="partners" element={<Partners />} />
            <Route path="settings" element={<Settings />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="requests" element={<Requests />} />
            <Route path="employee/planning" element={<EmployeePlanning />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="employees/schedule" element={<EmployeeSchedule />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/knowledge-base" element={<KnowledgeBaseManagement />} />
            <Route path="reputation" element={<ReputationManagement />} />
            <Route path="support" element={<Support />} />
            <Route path="support/:id" element={<SupportTicketDetailPage />} />
            <Route path="community" element={<Community />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
          </Route>

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
    </AuthProvider>
  );
}

export default App;
