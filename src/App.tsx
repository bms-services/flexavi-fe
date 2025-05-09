import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import baseRouter from "./routers/BaseRouter";
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
// import './components/landing/animations.css'
import './lib/i18n.ts'
function App() {
  const notify = () => toast("Wow so easy!");

  return (
    // <StrictMode>
    <Suspense fallback="Loading...">
      <Provider store={store}>
        <AuthProvider>
          <ToastContainer />
          <RouterProvider router={baseRouter} />
        </AuthProvider>
      </Provider>
    </Suspense>
    // </StrictMode>
  );
}

export default App;
