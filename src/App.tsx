import './index.css'
import './components/landing/animations.css'
import './lib/i18n.ts'

import { StrictMode, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import baseRouter from "./routers/BaseRouter";
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { SnackbarProvider } from 'notistack'


function App() {
  return (
    // <StrictMode>
    <div>
      <SnackbarProvider
        maxSnack={3}
        transitionDuration={500}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }} />
      <Suspense fallback="Loading...">
        <Provider store={store}>
          <AuthProvider>
            <RouterProvider router={baseRouter} />
          </AuthProvider>
        </Provider>
      </Suspense>
    </div>
    // </StrictMode>
  );
}

export default App;
