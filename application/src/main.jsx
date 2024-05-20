import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'


// ================================================================
// Define some screens here.
// ================================================================
import MainDashboardScreen from './screens/main_dashboard_screen'
import AuthScreen from './screens/auth_screen'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    {/* ====================================================================
    This is the main entry point for the application.
    ==================================================================== */}
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/*" element={<MainDashboardScreen />} />
      </Routes>
    </BrowserRouter>


  </React.StrictMode>
)
