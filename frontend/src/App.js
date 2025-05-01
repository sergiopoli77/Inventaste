import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import HeaderNavigation from "./components/Header Navigation/index";
import Kitchen from "./pages/kitchen/Kitchen";
import Dashboard from "./pages/dashboard/Dashboard";
import Service from "./pages/service/Service";
import "./assets/styles/App.css";
import Gap from "./components/Gap";
import Login from "./pages/login/Login";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Layout component that conditionally renders the header
const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";
  
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    // You might want to keep "rememberUser" preference
    
    // Navigate to login page with replace to prevent going back
    navigate("/", { replace: true });
  };

  return (
    <div className="app">
      {!isLoginPage && (
        <HeaderNavigation 
          userName={localStorage.getItem("userName") || "User"} 
          onLogout={handleLogout} 
        />
      )}
      <main className="content-wrapper">
        {children}
      </main>
      <Gap height={50}/>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <Login />
          </AppLayout>
        } />
        <Route path="/dashboard" element={
          <AppLayout>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </AppLayout>
        } />
        <Route path="/kitchen" element={
          <AppLayout>
            <ProtectedRoute>
              <Kitchen />
            </ProtectedRoute>
          </AppLayout>
        } />
        <Route path="/service" element={
          <AppLayout>
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          </AppLayout>
        } />
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;