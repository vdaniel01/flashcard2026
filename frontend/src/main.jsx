import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CardContextProvider} from "./context/CardContext.jsx"
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CardContextProvider>
        <App />
      </CardContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
