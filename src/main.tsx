
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './lib/i18n.ts'
import App from './App.tsx'
import './index.css'
import './components/landing/animations.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          transitionDuration={500}
          autoHideDuration={1000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }} />
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
)
