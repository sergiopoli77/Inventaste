import React, { useState, useEffect } from "react";
import "../../assets/styles/Kitchen.css";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaFilter, FaStickyNote } from "react-icons/fa";
import { authFetch } from "../../utils/auth";

const Kitchen = () => {
  // State for kitchen items and UI
  const [kitchenItems, setKitchenItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedNote, setSelectedNote] = useState(null);
  
  // State for modal/form
  const [showModal, setShowModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    stock: 0,
    notes: ""
  });

  // Add user state - we'll need this for createdBy/updateBy
  const [currentUser, setCurrentUser] = useState(null);

  // Get kitchen category ID from database
  const [kitchenCategoryId, setKitchenCategoryId] = useState(null);

  // Fetch current user information
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // First check if we have token in localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.error("No auth token found");
          return;
        }
        
        const response = await authFetch("http://localhost:5000/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData.data);
        } else {
          // If the /api/auth/me endpoint fails or doesn't exist, 
          // let's extract the user ID from the token
          try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            if (tokenPayload && tokenPayload.id) {
              setCurrentUser({ _id: tokenPayload.id });
            }
          } catch (err) {
            console.error("Failed to parse token:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch categories to get Kitchen category ID
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await authFetch("http://localhost:5000/api/categories");
        if (response.ok) {
          const data = await response.json();
          const kitchenCategory = data.data.find(category => category.name === "Kitchen");
          if (kitchenCategory) {
            setKitchenCategoryId(kitchenCategory._id);
          } else {
            setError("Kitchen category not found");
          }
        }
      } catch (err) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch kitchen items once we have the kitchen category ID
  useEffect(() => {
    const fetchKitchenItems = async () => {
      if (!kitchenCategoryId) return;
      
      setLoading(true);
      try {
        const response = await authFetch("http://localhost:5000/api/items");
        if (response.ok) {
          const data = await response.json();
          // Filter items by kitchen category
          const kitchenItems = data.data.filter(item => 
            item.id_kategori && item.id_kategori._id === kitchenCategoryId
          );
          setKitchenItems(kitchenItems);
        }
      } catch (err) {
        setError("Failed to fetch kitchen items");
        console.error("Error fetching kitchen items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKitchenItems();
  }, [kitchenCategoryId]);

  // Get unique statuses for filter dropdown
  const statuses = ["All", "aktif", "low-stock", "non-aktif"];

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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  // Translate status to UI friendly format
  const getStatusDisplay = (status) => {
    switch (status) {
      case "aktif":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "non-aktif":
        return "Out of Stock";
      default:
        return status;
    }
  };

  // Determine status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "aktif":
        return "in-stock";
      case "low-stock":
        return "low-stock";
      case "non-aktif":
        return "out-of-stock";
      default:
        return "";
    }
  };

  // Determine status based on stock quantity
  const getStatusFromStock = (stockQuantity) => {
    if (stockQuantity <= 0) {
      return "non-aktif"; // Out of Stock
    } else if (stockQuantity <= 10) {
      return "low-stock"; // Low Stock
    } else {
      return "aktif"; // In Stock
    }
  };

  // Filter and sort items
  const filteredItems = kitchenItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle nested fields
      if (sortField === "createdAt" || sortField === "updatedAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortField === "stock") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      stock: 0,
      notes: ""
    });
    setCurrentItem(null);
  };

  // Handle modal open for adding new item
  const handleAddItem = () => {
    resetFormData();
    setShowModal(true);
  };

  // Handle modal open for editing an item
  const handleEditItem = (id) => {
    const itemToEdit = kitchenItems.find(item => item._id === id);
    if (itemToEdit) {
      setCurrentItem(itemToEdit);
      setFormData({
        name: itemToEdit.name,
        stock: itemToEdit.stock,
        notes: itemToEdit.notes || ""
      });
      setShowModal(true);
    }
  };

  // Handle showing note details
  const handleShowNote = (item) => {
    setSelectedNote(item);
    setShowNoteModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" ? parseInt(value, 10) : value
    });
  };

  // Save item (create or update)
  const handleSaveItem = async (e) => {
    e.preventDefault();
    
    if (!kitchenCategoryId) {
      alert("Kitchen category not loaded yet");
      return;
    }

    // Get user ID from token if currentUser is not populated
    let userId = null;
    if (currentUser && currentUser._id) {
      userId = currentUser._id;
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          if (tokenPayload && tokenPayload.id) {
            userId = tokenPayload.id;
          }
        } catch (err) {
          console.error("Failed to parse token:", err);
        }
      }
    }

    if (!userId) {
      alert("User information not available. Please refresh the page and try again.");
      return;
    }

    try {
      // Automatically set status based on stock
      const status = getStatusFromStock(formData.stock);
      
      const itemData = {
        ...formData,
        status, // Set the calculated status
        id_kategori: kitchenCategoryId,
      };

      let response;
      
      if (currentItem) {
        // Update existing item
        itemData.updateBy = userId;
        
        response = await authFetch(`http://localhost:5000/api/items/${currentItem._id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemData)
        });
      } else {
        // Create new item - add required createdBy field
        itemData.createdBy = userId;
        itemData.updateBy = userId;
        
        response = await authFetch("http://localhost:5000/api/items", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemData)
        });
      }

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result);
        
        // Refresh items list
        const itemsResponse = await authFetch("http://localhost:5000/api/items");
        if (itemsResponse.ok) {
          const data = await itemsResponse.json();
          const kitchenItems = data.data.filter(item => 
            item.id_kategori && item.id_kategori._id === kitchenCategoryId
          );
          setKitchenItems(kitchenItems);
        }
        
        setShowModal(false);
        resetFormData();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save item");
      }
    } catch (err) {
      console.error("Error saving item:", err);
      alert(err.message || "Failed to save item. Please try again.");
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await authFetch(`http://localhost:5000/api/items/${id}`, {
          method: "DELETE"
        });

        if (response.ok) {
          // Remove item from state
          setKitchenItems(kitchenItems.filter(item => item._id !== id));
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete item");
        }
      } catch (err) {
        console.error("Error deleting item:", err);
        alert(err.message || "Failed to delete item. Please try again.");
      }
    }
  };

  // Calculate inventory statistics
  const totalItems = kitchenItems.length;
  const totalQuantity = kitchenItems.reduce((sum, item) => sum + item.stock, 0);
  const outOfStockItems = kitchenItems.filter(item => item.status === "non-aktif").length;
  const lowStockItems = kitchenItems.filter(item => item.status === "low-stock").length;

  return (
    <div className="kitchen-page">
      <div className="page-header">
        <h1>Kitchen Inventory Management</h1>
        <p className="page-subtitle">Manage your kitchen equipment, tools, and supplies</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <p>Loading kitchen inventory...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
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
                  <label>Status:</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === "aktif" ? "In Stock" : 
                         status === "low-stock" ? "Low Stock" : 
                         status === "non-aktif" ? "Out of Stock" : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="inventory-summary">
            <div className="summary-card">
              <h3>Total Kitchen Items</h3>
              <p>{totalItems}</p>
            </div>
            <div className="summary-card">
              <h3>Total Quantity</h3>
              <p>{totalQuantity}</p>
            </div>
            <div className="summary-card">
              <h3>Out of Stock</h3>
              <p>{outOfStockItems}</p>
            </div>
            <div className="summary-card">
              <h3>Low Stock</h3>
              <p>{lowStockItems}</p>
            </div>
          </div>

          <div className="inventory-table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>
                    Item Name {getSortIcon("name")}
                  </th>
                  <th onClick={() => handleSort("stock")}>
                    Quantity {getSortIcon("stock")}
                  </th>
                  <th onClick={() => handleSort("createdAt")}>
                    Added Date {getSortIcon("createdAt")}
                  </th>
                  <th onClick={() => handleSort("updatedAt")}>
                    Last Updated {getSortIcon("updatedAt")}
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Status {getSortIcon("status")}
                  </th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.stock}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{formatDate(item.updatedAt)}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                          {getStatusDisplay(item.status)}
                        </span>
                      </td>
                      <td>
                        {item.notes ? (
                          <button 
                            className="note-button" 
                            onClick={() => handleShowNote(item)}
                            title="View Notes"
                          >
                            <FaStickyNote />
                          </button>
                        ) : (
                          <span className="no-notes">-</span>
                        )}
                      </td>
                      <td className="action-buttons">
                        <button className="edit-button" onClick={() => handleEditItem(item._id)} title="Edit Item">
                          <FaEdit />
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteItem(item._id)} title="Delete Item">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      No items found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Item Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>{currentItem ? "Edit" : "Add"} Kitchen Item</h2>
                <form onSubmit={handleSaveItem}>
                  <div className="form-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                    <p className="help-text">
                      {formData.stock === 0 ? "Status will be set to Out of Stock" : 
                       formData.stock <= 10 ? "Status will be set to Low Stock" : 
                       "Status will be set to In Stock"}
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Enter any additional information about this item"
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="save-button">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Notes Modal */}
          {showNoteModal && selectedNote && (
            <div className="modal-overlay">
              <div className="modal-content note-modal">
                <h2>Notes for {selectedNote.name}</h2>
                <div className="note-content">
                  {selectedNote.notes}
                </div>
                <div className="modal-actions">
                  <button className="close-button" onClick={() => setShowNoteModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Kitchen;