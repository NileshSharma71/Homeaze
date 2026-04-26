import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import WorkerContextProvider from './context/WorkerContext.jsx'
import AppContextProvider from './context/Appcontext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <AdminContextProvider>
        <WorkerContextProvider>
            <AppContextProvider>
              <App />
            </AppContextProvider>
        </WorkerContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
)
