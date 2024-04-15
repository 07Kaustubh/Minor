import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from './services/auth';
import { getAllOrders, getUserById, updateUser, getAllOrderItems, getProductById } from './services/api'; // Make sure to import the correct API module

const UserDashboard = () => {
  // State to store user data
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addressBook, setAddressBook] = useState([]);
  const { userId } = useAuth();
  const [orderItemsMap, setOrderItemsMap] = useState(new Map());

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
        console.log('Order History:', orderHistoryResponse);

        const orderItemResponses = await Promise.all(orderHistoryResponse.map(order => getAllOrderItems(order.order_id)));
        const orderItemsMap = new Map();
        orderItemResponses.forEach((orderItems, index) => {
          orderItemsMap.set(orderHistoryResponse[index].order_id, orderItems);
        });
        setOrderItemsMap(orderItemsMap);
      } catch (error) {
        console.error('Error fetching additional user data:', error);
      }
    };
  
    fetchUserData();
    fetchAdditionalUserData();
  }, [userId]); // Fetch user data and additional user data whenever userId changes
   // Fetch user data and additional user data whenever userId changes

   const renderOrderItems = (order) => {
    const orderItems = orderItemsMap.get(order.order_id) || [];
    console.log('Order Items:', orderItems);
  
    return (
      <ul>
        {orderItems.map((item) => {
          const productPromise = getProductById(item.product_id); // Fetch product data
          return (
            <ProductItem key={item.order_item_id} productPromise={productPromise} item={item} />
          );
        })}
      </ul>
    );
  };
  
  const ProductItem = ({ productPromise, item }) => {
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const productData = await productPromise;
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }, [productPromise]);
  
    if (!product) {
      return <li>Loading...</li>;
    }
  
    return (
      <li>
        {item.quantity} x {product.name} - ${item.price.toFixed(2)}
      </li>
    );
  };
  
  

   const handleNameChange = async () => {
    const newName = prompt('Enter your new name:');
    if (newName) {
      const [firstName, lastName] = newName.split(' ');
      try {
        await updateUser(userId, { firstName, lastName });
        setUserData({ ...userData, firstName, lastName });
      } catch (error) {
        console.error('Error updating name:', error);
      }
    }
  };

  const handleEditAddress = async (addressId) => {
    const addressToUpdate = addressBook.find(address => address.id === addressId);
  
    // Prompt for each part of the address separately
    const newAddress = prompt('Enter your new address:', addressToUpdate.address);
    const newCity = prompt('Enter your new city:', addressToUpdate.city);
    const newPostalCode = prompt('Enter your new postal code:', addressToUpdate.postalCode);
    const newCountry = prompt('Enter your new country:', addressToUpdate.country);
  
    if (newAddress && newCity && newPostalCode && newCountry) {
      const updatedAddress = {
        address: newAddress,
        city: newCity,
        postalCode: newPostalCode,
        country: newCountry
      };
  
      try {
        const updatedAddressBook = addressBook.map(address => {
          if (address.id === addressId) {
            return updatedAddress;
          }
          return address;
        });
  
        await updateUser(userId, { address: updatedAddressBook });
        setAddressBook(updatedAddressBook);
      } catch (error) {
        console.error('Error updating address:', error);
      }
    }
  };
  

  const handleDeleteAddress = async (addressId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this address?');
    if (confirmDelete) {
      try {
        const updatedAddressBook = addressBook.filter(address => address.id !== addressId);
        await updateUser(userId, { address: updatedAddressBook });
        setAddressBook(updatedAddressBook);
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // Render a loading indicator while fetching user data
  }

  return (
    <div>
    <Header />
    <div className="user-dashboard">

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
          <button className="action-button" onClick={handleNameChange}>Change Name</button>
          <button className="action-button">Change Email</button>
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
                <th>Items</th> {/* Added table header for items */}
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_date}</td>
                  <td>${order.total_price}</td>
                  <td>{order.status}</td>
                  <td>{renderOrderItems(order)}</td> {/* Render order items */}
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
      {addressBook.map((address, index) => (
        <li key={index} className="address-item">
          <span><strong>Address:</strong> {address.address}</span>
          <span><strong>City:</strong> {address.city}</span>
          <span><strong>Postal Code:</strong> {address.postalCode}</span>
          <span><strong>Country:</strong> {address.country}</span>
          {/* Add buttons to edit, delete, or set as default address */}
          <button className="action-button" onClick={() => handleEditAddress(address.id)}>Edit</button>
          <button className="action-button" onClick={() => handleDeleteAddress(address.id)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No saved addresses.</p>
  )}
</div>

      {/* ... */}

    </div>
    <Footer />
    </div>
  );
};

export default UserDashboard;
