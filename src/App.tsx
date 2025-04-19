
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
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/create" element={<QuoteEdit />} />
          <Route path="/quotes/edit/:id" element={<QuoteEdit />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
