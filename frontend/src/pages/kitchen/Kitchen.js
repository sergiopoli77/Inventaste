import React, { useState } from "react";
import "../../assets/styles/Kitchen.css";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaFilter } from "react-icons/fa";

const Kitchen = () => {
  // Sample data for kitchen items
  const [kitchenItems, setKitchenItems] = useState([
    { id: 1, name: "Chef Knives", category: "Cutlery", quantity: 25, lastUpdated: "Apr 29, 2025", status: "In Stock" },
    { id: 2, name: "Mixing Bowls", category: "Preparation", quantity: 40, lastUpdated: "Apr 26, 2025", status: "In Stock" },
    { id: 3, name: "Stock Pots", category: "Cookware", quantity: 15, lastUpdated: "Apr 30, 2025", status: "In Stock" },
    { id: 4, name: "Blender", category: "Appliances", quantity: 8, lastUpdated: "Apr 22, 2025", status: "Low Stock" },
    { id: 5, name: "Baking Sheets", category: "Bakeware", quantity: 30, lastUpdated: "Apr 28, 2025", status: "In Stock" },
    { id: 6, name: "Cutting Boards", category: "Preparation", quantity: 20, lastUpdated: "Apr 25, 2025", status: "In Stock" },
    { id: 7, name: "Stand Mixer", category: "Appliances", quantity: 5, lastUpdated: "Apr 23, 2025", status: "Low Stock" },
    { id: 8, name: "Food Processor", category: "Appliances", quantity: 0, lastUpdated: "Apr 27, 2025", status: "Out of Stock" }
  ]);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(kitchenItems.map(item => item.category))];
  const statuses = ["All", ...new Set(kitchenItems.map(item => item.status))];

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon based on current sort state
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  // Filter and sort items
  const filteredItems = kitchenItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortField === "quantity") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  // Placeholder functions for CRUD operations
  const handleAddItem = () => {
    console.log("Add new item");
    // Add your logic here
  };

  const handleEditItem = (id) => {
    console.log("Edit item with id:", id);
    // Add your logic here
  };

  const handleDeleteItem = (id) => {
    console.log("Delete item with id:", id);
    // Add your logic here
  };

  return (
    <div className="kitchen-page">
      <div className="page-header">
        <h1>Kitchen Inventory Management</h1>
        <p className="page-subtitle">Manage your kitchen equipment, tools, and supplies</p>
      </div>

      <div className="inventory-controls">
        <div className="search-filter-container">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search kitchen items..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filter
          </button>
        </div>

        <button className="add-button" onClick={handleAddItem}>
          <FaPlus /> Add New Item
        </button>
      </div>

      {showFilters && (
        <div className="filters-container">
          <div className="filter-row">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="inventory-summary">
        <div className="summary-card">
          <h3>Total Kitchen Items</h3>
          <p>{kitchenItems.length}</p>
        </div>
        <div className="summary-card">
          <h3>Categories</h3>
          <p>{new Set(kitchenItems.map(item => item.category)).size}</p>
        </div>
        <div className="summary-card">
          <h3>Total Quantity</h3>
          <p>{kitchenItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
        <div className="summary-card">
          <h3>Out of Stock</h3>
          <p>{kitchenItems.filter(item => item.status === "Out of Stock").length}</p>
        </div>
        <div className="summary-card">
          <h3>Low Stock</h3>
          <p>{kitchenItems.filter(item => item.status === "Low Stock").length}</p>
        </div>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Item Name {getSortIcon("name")}
              </th>
              <th onClick={() => handleSort("category")}>
                Category {getSortIcon("category")}
              </th>
              <th onClick={() => handleSort("quantity")}>
                Quantity {getSortIcon("quantity")}
              </th>
              <th onClick={() => handleSort("lastUpdated")}>
                Last Updated {getSortIcon("lastUpdated")}
              </th>
              <th onClick={() => handleSort("status")}>
                Status {getSortIcon("status")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td><span className="category-badge">{item.category}</span></td>
                  <td>{item.quantity}</td>
                  <td>{item.lastUpdated}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => handleEditItem(item.id)}>
                      <FaEdit />
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No items found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kitchen;