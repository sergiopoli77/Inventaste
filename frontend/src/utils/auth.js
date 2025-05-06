// frontend/src/utils/auth.js

/**
 * Get the authentication token from local storage
 * @returns {string|null} The token or null if not authenticated
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check if the user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

/**
 * Check if the user has admin role
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Decode token to check role
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return tokenPayload && tokenPayload.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Get the user's role from token
 * @returns {string} User's role or null if not found
 */

/**
 * Perform an authenticated API request
 * @param {string} url - The API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} Fetch promise
 */
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  
  const updatedOptions = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, updatedOptions);
    
    // Check if response is OK
    if (!response.ok) {
      // If token is invalid (unauthorized), redirect to login
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userName");
        
        // Only redirect if we're in a browser environment
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      
      // If forbidden (insufficient permissions)
      if (response.status === 403) {
        console.error('Access denied: Insufficient permissions');
        // You could show a notification here or handle the forbidden status
      }
    }
    
    return response;
  } catch (error) {
    console.error("Auth fetch error:", error);
    throw error;
  }
};

/**
 * Logout user and clear authentication data
 */
export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  // Redirect to login page
  window.location.href = '/';
};