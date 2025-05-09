import './index.css'
import './components/landing/animations.css'
import './lib/i18n.ts'

import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import baseRouter from "./routers/BaseRouter";
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const notify = () => toast("Wow so easy!");

  return (
    // <StrictMode>
    <Suspense fallback="Loading...">
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
      <Provider store={store}>
        <AuthProvider>
          {/* <SnackbarProvider
            maxSnack={1}
            transitionDuration={500}
            autoHideDuration={1000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }} /> */}

          <RouterProvider router={baseRouter} />
        </AuthProvider>
      </Provider>
    </Suspense>
    // </StrictMode>
  );
}

export default App;
