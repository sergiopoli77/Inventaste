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