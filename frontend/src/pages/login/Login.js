import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Login.css";
import { FaWarehouse, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // React Router's navigate hook for programmatic navigation
  const navigate = useNavigate();
  
  // Refs for input fields to manage focus
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Check if user is already logged in when component mounts
  useEffect(() => {
    // If authenticated, redirect to dashboard
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Handle keyboard navigation in username field
  const handleUsernameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };
  
  // Handle keyboard navigation in password field
  const handlePasswordKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      usernameRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.username || !formData.password) {
      setError("Please enter your username and password");
      setIsLoading(false);
      return;
    }
    
    try {
      // Call backend API for authentication
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        // Store authentication state and token
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userName", formData.username);
        localStorage.setItem("token", data.token);
        
        // Navigate to dashboard on successful login
        navigate("/dashboard", { replace: true });
      } else {
        // Handle login failure
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <FaWarehouse className="logo-icon" />
            <h1 className="logo-text">Inventaste</h1>
          </div>
          <p className="login-subtitle">Restaurant Inventory Management System</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">
              <FaUser className="input-icon" />
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              onKeyDown={handleUsernameKeyDown}
              ref={usernameRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handlePasswordKeyDown}
              ref={passwordRef}
            />
          </div>


          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Nothing will work unless you do</p>
        </div>
      </div>
    </div>
  );
};

export default Login;