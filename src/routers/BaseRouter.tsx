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
                    title: "auth:login.text.title",
                    description: "auth:login.text.description",
                },
            },
            {
                path: "register",
                element: <Register />,
                handle: {
                    title: "auth:register.text.title",
                    description: "auth:register.text.description",
                },
            },
            {
                path: "register-successfully",
                element: <RegisterSuccessfully />,
                handle: {
                    title: "auth:registerSuccessfully.text.title",
                    description: "auth:registerSuccessfully.text.description",
                },
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
                handle: {
                    title: "auth:forgotPassword.text.title",
                    description: "auth:forgotPassword.text.description",
                },
            },
        ],
    },
    {
        path: "/create-company",
        element: <CompanyCreateFullPage />,
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Index /> },
            { path: "leads", element: <Leads /> },
            { path: "leads/:id", element: <LeadDetails /> },
            { path: "appointments", element: <Appointments /> },
            { path: "projects", element: <Projects /> },
            { path: "projects/:id", element: <ProjectDetail /> },
            { path: "calculator", element: <Calculator /> },
            { path: "calculator/:id", element: <CalculatorDetail /> },
            { path: "quotes", element: <Quotes /> },
            { path: "quotes/create", element: <QuoteEdit /> },
            { path: "quotes/edit/:id", element: <QuoteEdit /> },
            { path: "workagreements", element: <WorkAgreements /> },
            { path: "workagreements/create", element: <WorkAgreementEdit /> },
            { path: "workagreements/edit/:id", element: <WorkAgreementEdit /> },
            { path: "workagreements/:id", element: <WorkAgreementDetail /> },
            { path: "invoices", element: <Invoices /> },
            { path: "invoices/create", element: <InvoiceEdit /> },
            { path: "invoices/edit/:id", element: <InvoiceEdit /> },
            { path: "expenses", element: <Expenses /> },
            { path: "expenses/:id", element: <ExpenseDetail /> },
            { path: "products", element: <Products /> },
            { path: "partners", element: <Partners /> },
            { path: "settings", element: <Settings /> },
            { path: "pipeline", element: <Pipeline /> },
            { path: "requests", element: <Requests /> },
            { path: "employee/planning", element: <EmployeePlanning /> },
            { path: "employees", element: <EmployeeManagement /> },
            { path: "employees/schedule", element: <EmployeeSchedule /> },
            { path: "admin", element: <AdminDashboard /> },
            { path: "admin/knowledge-base", element: <KnowledgeBaseManagement /> },
            { path: "reputation", element: <ReputationManagement /> },
            { path: "support", element: <Support /> },
            { path: "support/:id", element: <SupportTicketDetailPage /> },
            { path: "community", element: <Community /> },
            { path: "faq", element: <FAQ /> },
            { path: "knowledge-base", element: <KnowledgeBase /> },
            { path: 'payment/confirm', element: <PaymentConfirm /> },
        ],
    },
    {
        path: "/portal",
        children: [
            { index: true, element: <CustomerPortal /> },
            { path: "quotes/:id", element: <CustomerPortalQuote /> },
            { path: "work-agreements/:id", element: <CustomerPortalWorkAgreement /> },
            { path: "work-orders/:id", element: <CustomerPortalWorkOrder /> },
            { path: "invoices/:id", element: <CustomerPortalInvoice /> },
            { path: "dashboard", element: <CustomerDashboard /> },
        ],
    },
    { path: "/pricing", element: <Pricing /> },
    { path: "/landing", element: <Landing /> },
    { path: "*", element: <NotFound /> },
]);

export default baseRouter;
