import React from "react";
import "../../assets/styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Items</h2>
          <p>150</p>
        </div>
        <div className="card">
          <h2>Kitchen Items</h2>
          <p>80</p>
        </div>
        <div className="card">
          <h2>Service Items</h2>
          <p>70</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;