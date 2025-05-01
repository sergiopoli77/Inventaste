import React from "react";
import '../../assets/styles/Dashboard.css';
import { FaBoxOpen, FaUtensils, FaCoffee, FaExclamationTriangle, FaHistory, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <div className="dashboard-actions">
          <button className="action-button primary">Generate Report</button>
          <button className="action-button">Refresh Data</button>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card total">
          <div className="card-icon">
            <FaBoxOpen />
          </div>
          <div className="card-content">
            <h2>Total Inventory</h2>
            <p className="card-value">150</p>
            <p className="card-trend positive">+12% from last month</p>
          </div>
        </div>
        
        <div className="summary-card kitchen">
          <div className="card-icon">
            <FaUtensils />
          </div>
          <div className="card-content">
            <h2>Kitchen Items</h2>
            <p className="card-value">80</p>
            <p className="card-trend positive">+5% from last month</p>
          </div>
        </div>
        
        <div className="summary-card service">
          <div className="card-icon">
            <FaCoffee />
          </div>
          <div className="card-content">
            <h2>Service Items</h2>
            <p className="card-value">70</p>
            <p className="card-trend negative">-3% from last month</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget-row">
          <div className="widget alerts">
            <div className="widget-header">
              <h3><FaExclamationTriangle /> Inventory Alerts</h3>
            </div>
            <div className="widget-content">
              <div className="alert-item">
                <p className="alert-text">Low stock: Coffee beans (5 kg remaining)</p>
                <span className="alert-badge critical">Critical</span>
              </div>
              <div className="alert-item">
                <p className="alert-text">Low stock: Napkins (2 packs remaining)</p>
                <span className="alert-badge warning">Warning</span>
              </div>
              <div className="alert-item">
                <p className="alert-text">Expiring soon: Dairy products (3 days left)</p>
                <span className="alert-badge warning">Warning</span>
              </div>
            </div>
          </div>

          <div className="widget recent-activity">
            <div className="widget-header">
              <h3><FaHistory /> Recent Activity</h3>
            </div>
            <div className="widget-content">
              <div className="activity-item">
                <p className="activity-text">20 plates added to Service Items</p>
                <span className="activity-time">Today, 10:45 AM</span>
              </div>
              <div className="activity-item">
                <p className="activity-text">15 kg Rice removed from Kitchen</p>
                <span className="activity-time">Yesterday, 4:30 PM</span>
              </div>
              <div className="activity-item">
                <p className="activity-text">Inventory check completed</p>
                <span className="activity-time">Yesterday, 9:15 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="widget performance">
          <div className="widget-header">
            <h3><FaChartLine /> Inventory Performance</h3>
          </div>
          <div className="widget-content chart-placeholder">
            <div className="chart-info">
              <div className="chart-stat">
                <h4>Turnover Rate</h4>
                <p>8.5 days</p>
              </div>
              <div className="chart-stat">
                <h4>Stock Value</h4>
                <p>$12,450</p>
              </div>
              <div className="chart-stat">
                <h4>Utilization</h4>
                <p>76%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;