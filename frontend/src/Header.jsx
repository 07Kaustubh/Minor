// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useCart } from './services/CartContext'; // Import useCart hook
import PopupForm from './PopupForm'; // Import the PopupForm component
import { useAuth } from './services/auth'; // Import useAuth hook

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage the visibility of the popup form
  const { cartItems } = useCart(); // Access cart items from CartContext
  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout function from the context
  const [isLoggedInStatus, setIsLoggedInStatus] = useState(false); // State to manage user's login status

  useEffect(() => {
    // Update isLoggedInStatus whenever isLoggedIn changes
    console.log('isLoggedIn changed:', isLoggedIn);
    setIsLoggedInStatus(isLoggedIn);
  }, [isLoggedIn]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Function to toggle the visibility of the popup form
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Clear authentication token from local storage
    logout(); // Call the logout function from the context
  };

  const handleLoginSuccess = () => {
    setIsLoggedInStatus(true);
    setIsPopupOpen(false); // Close the popup after successful login
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/src/logo.png" alt="Company Logo" />
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li className="cart-link"><Link to="/cart">Cart <span className="cart-count">{cartItems.length}</span></Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditionally render login/logout button based on isLoggedInStatus */}
      {isLoggedInStatus ? (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="login-button" onClick={togglePopup}>Login/Signup</button>
      )}
      
      {/* Render the PopupForm component if isPopupOpen is true */}
      {isPopupOpen && <PopupForm onClose={togglePopup} onLoginSuccess={handleLoginSuccess} />}
    </header>
  );
};

export default Header;