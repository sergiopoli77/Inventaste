import React, { useState, useEffect } from "react";
import '../../assets/styles/Dashboard.css';
import { FaBoxOpen, FaUtensils, FaCoffee, FaExclamationTriangle, FaHistory, FaLayerGroup, FaSync } from "react-icons/fa";
import { authFetch } from "../../utils/auth";

const Dashboard = () => {
  // State for dashboard data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState({
    totalStock: 0,
    kitchenStock: 0,
    serviceStock: 0,
    lowStockItems: [],
    outOfStockItems: [],
    recentActivity: [],
    categories: []
  });

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Get all categories
      const categoriesResponse = await authFetch("http://localhost:5000/api/categories");
      if (!categoriesResponse.ok) throw new Error("Failed to fetch categories");
      const categoriesData = await categoriesResponse.json();
      const allCategories = categoriesData.data;
      
      // Find kitchen and service category IDs
      const kitchenCategory = allCategories.find(cat => cat.name === "Kitchen");
      const serviceCategory = allCategories.find(cat => cat.name === "Service");
      
      if (!kitchenCategory || !serviceCategory) {
        throw new Error("Required categories not found");
      }
      
      // Fetch all items
      const itemsResponse = await authFetch("http://localhost:5000/api/items");
      if (!itemsResponse.ok) throw new Error("Failed to fetch items");
      const itemsData = await itemsResponse.json();
      const allItems = itemsData.data;
      
      // Filter items by category
      const kitchenItems = allItems.filter(item => 
        item.id_kategori && item.id_kategori._id === kitchenCategory._id
      );
      
      const serviceItems = allItems.filter(item => 
        item.id_kategori && item.id_kategori._id === serviceCategory._id
      );
      
      // Find low stock items (stock <= 10 and > 0)
      const lowStockItems = allItems.filter(item => 
        item.stock <= 10 && item.stock > 0
      );
      
      // Find out of stock items
      const outOfStockItems = allItems.filter(item => item.stock === 0);
      
      // Calculate total stock for each category
      const totalStock = allItems.reduce((sum, item) => sum + item.stock, 0);
      const kitchenStock = kitchenItems.reduce((sum, item) => sum + item.stock, 0);
      const serviceStock = serviceItems.reduce((sum, item) => sum + item.stock, 0);
      
      // Prepare category breakdown data
      const categoryBreakdown = [];
      allCategories.forEach(category => {
        const categoryItems = allItems.filter(item => 
          item.id_kategori && item.id_kategori._id === category._id
        );
        
        const totalCategoryStock = categoryItems.reduce((sum, item) => sum + item.stock, 0);
        const itemCount = categoryItems.length;
        
        categoryBreakdown.push({
          id: category._id,
          name: category.name,
          stockCount: totalCategoryStock,
          itemCount: itemCount,
          percentage: totalStock > 0 ? (totalCategoryStock / totalStock) * 100 : 0
        });
      });
      
      // Sort categories by stock count (descending)
      categoryBreakdown.sort((a, b) => b.stockCount - a.stockCount);
      
      // Sort items by updated date for recent activity
      const recentItems = [...allItems].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      ).slice(0, 3);
      
      // Update state with all data
      setInventoryData({
        totalStock,
        kitchenStock,
        serviceStock,
        lowStockItems,
        outOfStockItems,
        recentActivity: recentItems,
        categories: categoryBreakdown
      });
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching dashboard data:", err);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Generate a simple PDF report
  const handleGenerateReport = () => {
    alert("Report generation would be implemented here with a library like jsPDF or react-pdf");
  };

  // Get severity level for stock alerts
  const getAlertSeverity = (item) => {
    if (item.stock === 0) return "critical";
    if (item.stock <= 5) return "warning";
    return "notice";
  };

  // Get category color based on name or index
  const getCategoryColor = (name, index) => {
    const colors = {
      "Kitchen": "#22c55e",
      "Service": "#eab308",
      "default": ["#4a6cf7", "#f97316", "#14b8a6", "#8b5cf6", "#ec4899"]
    };
    
    return colors[name] || colors.default[index % colors.default.length];
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-state">
          <FaSync className="loading-spinner" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="error-state">
          <h2>Error loading dashboard</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className="action-button">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <div className="dashboard-actions">
          <button className="action-button primary" onClick={handleGenerateReport}>
            Generate Report
          </button>
          <button className="action-button" onClick={handleRefresh}>
            Refresh Data
          </button>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card total">
          <div className="card-icon">
            <FaBoxOpen />
          </div>
          <div className="card-content">
            <h2>Total Stock</h2>
            <p className="card-value">{inventoryData.totalStock}</p>
            <p className="card-subtitle">Units in inventory</p>
          </div>
        </div>
        
        <div className="summary-card kitchen">
          <div className="card-icon">
            <FaUtensils />
          </div>
          <div className="card-content">
            <h2>Kitchen Stock</h2>
            <p className="card-value">{inventoryData.kitchenStock}</p>
            <p className="card-subtitle">Units in kitchen</p>
          </div>
        </div>
        
        <div className="summary-card service">
          <div className="card-icon">
            <FaCoffee />
          </div>
          <div className="card-content">
            <h2>Service Stock</h2>
            <p className="card-value">{inventoryData.serviceStock}</p>
            <p className="card-subtitle">Units in service</p>
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
              {inventoryData.outOfStockItems.length > 0 && (
                <div className="alert-section">
                  <h4 className="alert-section-title">Out of Stock Items</h4>
                  {inventoryData.outOfStockItems.slice(0, 3).map((item, index) => (
                    <div className="alert-item" key={`out-${item._id || index}`}>
                      <p className="alert-text">
                        <span className="item-name">{item.name}</span>
                        <span className="item-category">{item.id_kategori?.name || 'Uncategorized'}</span>
                      </p>
                      <span className="alert-badge critical">
                        Out of Stock
                      </span>
                    </div>
                  ))}
                  {inventoryData.outOfStockItems.length > 3 && (
                    <p className="more-alerts">
                      {inventoryData.outOfStockItems.length - 3} more items out of stock
                    </p>
                  )}
                </div>
              )}
              
              {inventoryData.lowStockItems.length > 0 && (
                <div className="alert-section">
                  <h4 className="alert-section-title">Low Stock Items</h4>
                  {inventoryData.lowStockItems.slice(0, 3).map((item, index) => (
                    <div className="alert-item" key={`low-${item._id || index}`}>
                      <p className="alert-text">
                        <span className="item-name">{item.name}</span>
                        <span className="item-category">{item.id_kategori?.name || 'Uncategorized'}</span>
                      </p>
                      <span className={`alert-badge ${getAlertSeverity(item)}`}>
                        {item.stock} {item.stock === 1 ? 'unit' : 'units'}
                      </span>
                    </div>
                  ))}
                  {inventoryData.lowStockItems.length > 3 && (
                    <p className="more-alerts">
                      {inventoryData.lowStockItems.length - 3} more items low on stock
                    </p>
                  )}
                </div>
              )}
              
              {inventoryData.outOfStockItems.length === 0 && inventoryData.lowStockItems.length === 0 && (
                <div className="no-alerts">
                  <p>No stock alerts at this time</p>
                </div>
              )}
            </div>
          </div>

          <div className="widget recent-activity">
            <div className="widget-header">
              <h3><FaHistory /> Recent Activity</h3>
            </div>
            <div className="widget-content">
              {inventoryData.recentActivity.length > 0 ? (
                inventoryData.recentActivity.map((item, index) => (
                  <div className="activity-item" key={item._id || index}>
                    <div className="activity-details">
                      <p className="activity-text">
                        {item.name} {item.updatedAt !== item.createdAt ? 'updated' : 'added'}
                      </p>
                      <span className="activity-meta">
                        {item.id_kategori?.name || 'Uncategorized'} • Stock: {item.stock}
                      </span>
                    </div>
                    <span className="activity-time">{formatDate(item.updatedAt)}</span>
                  </div>
                ))
              ) : (
                <div className="no-activity">
                  <p>No recent activity to display</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="widget category-breakdown">
          <div className="widget-header">
            <h3><FaLayerGroup /> Category Breakdown</h3>
          </div>
          <div className="widget-content">
            <div className="category-overview">
              <h4>Total Categories: {inventoryData.categories.length}</h4>
              <p>Showing stock distribution across categories</p>
            </div>
            
            <div className="category-chart">
              {inventoryData.categories.map((category, index) => (
                <div className="category-item" key={category.id || index}>
                  <div className="category-details">
                    <div className="category-icon" style={{ backgroundColor: getCategoryColor(category.name, index) }}>
                      {category.name.charAt(0)}
                    </div>
                    <div className="category-info">
                      <h4>{category.name}</h4>
                      <div className="category-meta">
                        <span>{category.stockCount} units</span>
                        <span>•</span>
                        <span>{category.itemCount} items</span>
                      </div>
                    </div>
                  </div>
                  <div className="category-progress">
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${category.percentage}%`,
                          backgroundColor: getCategoryColor(category.name, index)
                        }}
                      ></div>
                    </div>
                    <span className="progress-value">{Math.round(category.percentage)}%</span>
                  </div>
                </div>
              ))}
              
              {inventoryData.categories.length === 0 && (
                <div className="no-categories">
                  <p>No categories found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;