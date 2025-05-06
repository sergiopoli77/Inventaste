// middleware/authRoles.js

/**
 * Middleware to check if user has admin role
 * Only allow access to route if user is an admin
 */
const isAdmin = (req, res, next) => {
    // Check if user exists on request (set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({ 
        status: "fail", 
        message: "Authentication required" 
      });
    }
    
    // Check if user has admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        status: "fail", 
        message: "Access denied. Admin privileges required." 
      });
    }
    
    // User is authenticated and has admin role, proceed
    next();
  };
  
  /**
   * Middleware to check if user is authenticated (either admin or staff)
   * This will be used for routes accessible to all authenticated users
   */
  const isAuthenticated = (req, res, next) => {
    // Check if user exists on request (set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({ 
        status: "fail", 
        message: "Authentication required" 
      });
    }
    
    // User is authenticated, proceed
    next();
  };
  
  module.exports = {
    isAdmin,
    isAuthenticated
  };