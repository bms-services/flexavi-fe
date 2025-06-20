import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import baseRouter from "./routers/BaseRouter";
import { ToastContainer } from 'react-toastify';
import Loader from "./components/ui/loader.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import './lib/i18n.ts'
// import './components/landing/animations.css'

const queryClient = new QueryClient();

function App() {
  return (
    // <StrictMode>
    <Suspense fallback={
      <Loader />
    }>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <RouterProvider router={baseRouter} />
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
    // </StrictMode>
  );
}

export default App;
