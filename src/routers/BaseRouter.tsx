// src/router.tsx
import { KnowledgeBaseManagement } from '@/components/admin/KnowledgeBaseManagement';

import Appointments from '@/pages/Appointments';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';


import AdminDashboard from '@/pages/admin/AdminDashboard';
import CalculatorDetail from '@/pages/CalculatorDetail';
import Community from '@/pages/Community';
import CustomerDashboard from '@/pages/CustomerDashboard';
import CustomerPortal from '@/pages/CustomerPortal';
import CustomerPortalInvoice from '@/pages/CustomerPortalInvoice';
import CustomerPortalQuote from '@/pages/CustomerPortalQuote';
import CustomerPortalWorkAgreement from '@/pages/CustomerPortalWorkAgreement';
import CustomerPortalWorkOrder from '@/pages/CustomerPortalWorkOrder';
import EmployeeManagement from '@/pages/EmployeeManagement';
import EmployeePlanning from '@/pages/EmployeePlanning';
import EmployeeSchedule from '@/pages/EmployeeSchedule';
import ExpenseDetail from '@/pages/ExpenseDetail';
import Expenses from '@/pages/Expenses';
import FAQ from '@/pages/FAQ';
import Index from '@/pages/Index';
import InvoiceEdit from '@/pages/InvoiceEdit';
import Invoices from '@/pages/Invoices';
import KnowledgeBase from '@/pages/KnowledgeBase';
import Landing from '@/pages/Landing';
import LeadDetails from '@/pages/LeadDetails';
import Leads from '@/pages/Leads';
import NotFound from '@/pages/NotFound';
import Partners from '@/pages/Partners';
import Pipeline from '@/pages/Pipeline';
import Pricing from '@/pages/Pricing';
import Products from '@/pages/Products';
import ProjectDetail from '@/pages/ProjectDetail';
import Projects from '@/pages/Projects';
import QuoteEdit from '@/pages/QuoteEdit';
import Quotes from '@/pages/Quotes';
import ReputationManagement from '@/pages/ReputationManagement';
import Requests from '@/pages/Requests';
import Support from '@/pages/Support';
import SupportTicketDetailPage from '@/pages/SupportTicketDetailPage';
import WorkAgreementDetail from '@/pages/WorkAgreementDetail';
import WorkAgreementEdit from '@/pages/WorkAgreementEdit';
import WorkAgreements from '@/pages/WorkAgreements';
import { createBrowserRouter } from 'react-router-dom';
import RegisterSuccessfully from '@/pages/auth/RegisterSuccessfully';
import Calculator from '@/pages/Calculator';
import Settings from '@/pages/Settings';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import CompanyCreateFullPage from '@/components/company/CompanyCreateFullPage';
import PaymentConfirm from '@/pages/payment/PaymentConfirm';
import i18n from '@/lib/i18n';
import RegisterEmployee from '@/pages/auth/RegisterEmployee';
import ForgotPasswordSuccessfully from '@/pages/auth/ForgotPasswordSuccessfully';
import ResetPassword from '@/pages/auth/ResetPassword';
import ResetPasswordSuccessfully from '@/pages/auth/ResetPasswordSuccessfully';

const baseRouter = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                path: "login",
                element: <Login />,
                handle: {
                    title: () => i18n.t("login.text.title"),
                    description: () => i18n.t("login.text.description"),
                },
            },
            {
                path: "register",
                element: <Register />,
                handle: {
                    title: () => i18n.t("register.text.title"),
                    description: () => i18n.t("register.text.description"),
                },
            },
            {
                path: "register/employee",
                element: <RegisterEmployee />,
                handle: {
                    title: () => i18n.t("registerEmployee.text.title"),
                    description: () => i18n.t("registerEmployee.text.description"),
                },
            },
            {
                path: "register/success",
                element: <RegisterSuccessfully />,
                handle: {
                    title: () => i18n.t("registerSuccessfully.text.title"),
                    description: () => i18n.t("registerSuccessfully.text.description"),
                },
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
                handle: {
                    title: () => i18n.t("forgotPassword.text.title"),
                    description: () => i18n.t("forgotPassword.text.description"),
                },
            },
            {
                path: "forgot-password/success",
                element: <ForgotPasswordSuccessfully />,
                handle: {
                    title: () => i18n.t("forgotPasswordSuccessfully.text.title"),
                    description: () => i18n.t("forgotPasswordSuccessfully.text.description"),
                },
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
                handle: {
                    title: () => i18n.t("resetPassword.text.title"),
                    description: () => i18n.t("resetPassword.text.description"),
                },
            },
            {
                path: "reset-password/success",
                element: <ResetPasswordSuccessfully />,
                handle: {
                    title: () => i18n.t("resetPasswordSuccessfully.text.title"),
                    description: () => i18n.t("resetPasswordSuccessfully.text.description"),
                },
            }
        ],
    },
    { path: "/create-company", element: <CompanyCreateFullPage />, handle: { title: "Create Company" } },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Index />, handle: { title: "Dashboard" } },
            { path: "leads", element: <Leads />, handle: { title: "Leads" } },
            { path: "lead/:id", element: <LeadDetails />, handle: { title: "Lead Details" } },
            { path: "appointments", element: <Appointments />, handle: { title: "Appointments" } },
            { path: "projects", element: <Projects />, handle: { title: "Projects" } },
            { path: "projects/:id", element: <ProjectDetail />, handle: { title: "Project Detail" } },
            { path: "calculator", element: <Calculator />, handle: { title: "Calculator" } },
            { path: "calculator/:id", element: <CalculatorDetail />, handle: { title: "Calculator Detail" } },
            { path: "quotes", element: <Quotes />, handle: { title: "Quotes" } },
            { path: "quotes/create", element: <QuoteEdit />, handle: { title: "Create Quote" } },
            { path: "quotes/edit/:id", element: <QuoteEdit />, handle: { title: "Edit Quote" } },
            { path: "workagreements", element: <WorkAgreements />, handle: { title: "Work Agreements" } },
            { path: "workagreements/create", element: <WorkAgreementEdit />, handle: { title: "Create Work Agreement" } },
            { path: "workagreements/edit/:id", element: <WorkAgreementEdit />, handle: { title: "Edit Work Agreement" } },
            { path: "workagreements/:id", element: <WorkAgreementDetail />, handle: { title: "Work Agreement Detail" } },
            { path: "invoices", element: <Invoices />, handle: { title: "Invoices" } },
            { path: "invoices/create", element: <InvoiceEdit />, handle: { title: "Create Invoice" } },
            { path: "invoices/edit/:id", element: <InvoiceEdit />, handle: { title: "Edit Invoice" } },
            { path: "expenses", element: <Expenses />, handle: { title: "Expenses" } },
            { path: "expenses/:id", element: <ExpenseDetail />, handle: { title: "Expense Detail" } },
            { path: "products", element: <Products />, handle: { title: "Products" } },
            { path: "partners", element: <Partners />, handle: { title: "Partners" } },
            { path: "settings", element: <Settings />, handle: { title: "Settings" } },
            { path: "pipeline", element: <Pipeline />, handle: { title: "Pipeline" } },
            { path: "requests", element: <Requests />, handle: { title: "Requests" } },
            { path: "employee/planning", element: <EmployeePlanning />, handle: { title: "Employee Planning" } },
            { path: "employees", element: <EmployeeManagement />, handle: { title: "Employees" } },
            { path: "employees/schedule", element: <EmployeeSchedule />, handle: { title: "Employee Schedule" } },
            { path: "admin", element: <AdminDashboard />, handle: { title: "Admin Dashboard" } },
            { path: "admin/knowledge-base", element: <KnowledgeBaseManagement />, handle: { title: "Knowledge Base Admin" } },
            { path: "reputation", element: <ReputationManagement />, handle: { title: "Reputation Management" } },
            { path: "support", element: <Support />, handle: { title: "Support" } },
            { path: "support/:id", element: <SupportTicketDetailPage />, handle: { title: "Support Detail" } },
            { path: "community", element: <Community />, handle: { title: "Community" } },
            { path: "faq", element: <FAQ />, handle: { title: "FAQ" } },
            { path: "knowledge-base", element: <KnowledgeBase />, handle: { title: "Knowledge Base" } },
            { path: 'payment/confirm', element: <PaymentConfirm />, handle: { title: "Payment Confirmation" } },
        ],
    },
    {
        path: "/portal",
        children: [
            { index: true, element: <CustomerPortal />, handle: { title: "Customer Portal" } },
            { path: "quotes/:id", element: <CustomerPortalQuote />, handle: { title: "Quote" } },
            { path: "work-agreements/:id", element: <CustomerPortalWorkAgreement />, handle: { title: "Work Agreement" } },
            { path: "work-orders/:id", element: <CustomerPortalWorkOrder />, handle: { title: "Work Order" } },
            { path: "invoices/:id", element: <CustomerPortalInvoice />, handle: { title: "Invoice" } },
            { path: "dashboard", element: <CustomerDashboard />, handle: { title: "Customer Dashboard" } },
        ],
    },
    { path: "/pricing", element: <Pricing />, handle: { title: "Pricing" } },
    { path: "/landing", element: <Landing />, handle: { title: "Landing" } },
    { path: "*", element: <NotFound />, handle: { title: "Not Found" } },
]);

export default baseRouter;
