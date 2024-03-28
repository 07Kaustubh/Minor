import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from './services/auth';
import { getAllOrders, getUserById } from './services/api'; // Make sure to import the correct API module

const UserDashboard = () => {
  // State to store user data
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addressBook, setAddressBook] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
        console.log('User Data:', userData);
        setUserData(userData); // Update state with user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const fetchAdditionalUserData = async () => {
      try {
        const userData = await getUserById(userId); // Fetch user data again to get updated wishlist and address
        setWishlist(userData.wishlist);
        setAddressBook(userData.address);
  
        const orderHistoryResponse = await getAllOrders();
        setOrderHistory(orderHistoryResponse);
      } catch (error) {
        console.error('Error fetching additional user data:', error);
      }
    };
  
    fetchUserData();
    fetchAdditionalUserData();
  }, [userId]); // Fetch user data and additional user data whenever userId changes
   // Fetch user data and additional user data whenever userId changes

  if (!userData) {
    return <div>Loading...</div>; // Render a loading indicator while fetching user data
  }

  return (
    <div className="user-dashboard">
      <Header />
      <h2 className="dashboard-title">Welcome, {userData.firstName} {userData.lastName}!</h2>
      {/* User profile section */}
      <div className="dashboard-section profile-section">
        <h3 className="section-title">Profile Information</h3>
        <div className="profile-details">
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add more profile information fields as needed */}
        </div>
        {/* Add buttons to edit profile, change password, etc. */}
        <div className="profile-actions">
          <button className="action-button">Edit Profile</button>
          <button className="action-button">Change Password</button>
        </div>
      </div>
      {/* Order history section */}
      <div className="dashboard-section order-history-section">
        <h3 className="section-title">Order History</h3>
        {orderHistory.length > 0 ? (
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                  {/* Add more table cells for order details */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
      {/* Wishlist section */}
      <div className="dashboard-section wishlist-section">
        <h3 className="section-title">Wishlist</h3>
        {wishlist.length > 0 ? (
          <ul className="wishlist-items">
            {wishlist.map(item => (
              <li key={item.id} className="wishlist-item">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                {/* Add buttons to remove item from wishlist, move to cart, etc. */}
                <button className="action-button">Remove</button>
                <button className="action-button">Add to Cart</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in wishlist.</p>
        )}
      </div>
      {/* Address book section */}
<div className="dashboard-section address-book-section">
  <h3 className="section-title">Address Book</h3>
  {addressBook.length > 0 ? (
    <ul className="address-list">
      {addressBook.map(address => (
        <li key={address.id} className="address-item">
          <span><strong>Address:</strong> {address.address}</span>
          <span><strong>City:</strong> {address.city}</span>
          <span><strong>Postal Code:</strong> {address.postalCode}</span>
          <span><strong>Country:</strong> {address.country}</span>
          {/* Add buttons to edit, delete, or set as default address */}
          <button className="action-button">Edit</button>
          <button className="action-button">Delete</button>
          <button className="action-button">Set as Default</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No saved addresses.</p>
  )}
</div>

      {/* ... */}
      <Footer />
    </div>
  );
};

export default UserDashboard;
