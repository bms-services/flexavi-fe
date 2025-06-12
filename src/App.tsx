import { StrictMode, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import baseRouter from "./routers/BaseRouter";
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
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
        <Provider store={store}>
          <AuthProvider>
            <ToastContainer />
            <RouterProvider router={baseRouter} />
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </Suspense>
    // </StrictMode>
  );
}

export default App;
