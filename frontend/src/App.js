import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderNavigation from "./components/Header Navigation";
import Kitchen from "./pages/kitchen/Kitchen";
import Dashboard from "./pages/dashboard/Dashboard";
import Service from "./pages/service/Service";

function App() {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Router>
      <div className="App">
        <HeaderNavigation userName="Ikan" onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;