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
    const token = getToken();
    
    const headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // If unauthorized, redirect to login
    if (response.status === 401) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      window.location.href = '/';
      return null;
    }
    
    return response;
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