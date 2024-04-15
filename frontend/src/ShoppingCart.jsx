import React, { useState, useEffect } from 'react';
import './ShoppingCart.css'; // Import CSS styles for shopping cart
import { useCart } from './services/CartContext'; // Import useCart hook
import Header from './Header';
import Footer from './Footer';
import { getProductById } from './services/api'; // Update the path as needed
import { Link } from 'react-router-dom'; // Import Link component for routing

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details for each cart item
        const details = await Promise.all(
          cartItems.map(async (item) => {
            const productData = await getProductById(item.product_id);
            console.log('Product data:', productData);
            return { ...item, ...productData }; // Merge product data with item
          })
        );
        setProductDetails(details.filter(Boolean)); // Filter out null values
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductDetails();
  }, [cartItems]); // Remove productDetails from the dependency array

  // Calculate subtotal
  const subtotal = productDetails.reduce((total, item) => total + item.price * item.quantity, 0);

  // Dummy tax and shipping values (replace with actual calculations)
  const tax = 0.1 * subtotal;
  const shipping = 5.99;

  // Calculate total order amount
  const total = subtotal + tax + shipping;

  // Function to handle increasing quantity
  const handleIncreaseQuantity = (itemId, variationId) => {
    console.log('Increasing quantity:', itemId, variationId);
    const currentItem = productDetails.find(item => item.product_id === itemId && item.variation === variationId);
    if (currentItem) {
      const newQuantity = currentItem.quantity + 1;
      updateCartItemQuantity(itemId, variationId, newQuantity);
    }
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = (itemId, variationId) => {
    console.log('Decreasing quantity:', itemId, variationId);
    const currentItem = productDetails.find(item => item.product_id === itemId && item.variation === variationId);
    if (currentItem && currentItem.quantity > 1) {
      const newQuantity = currentItem.quantity - 1;
      updateCartItemQuantity(itemId, variationId, newQuantity);
    }
  };

  return (
    <div>
    <Header />
    <div className="shopping-cart">

      <div className="container">
        <h2 className="cart-title">Shopping Cart</h2>
        {productDetails.length === 0 ? ( // Check if cart is empty
          <p>No items in cart.</p>
        ) : (
          productDetails.map(item => (
            <div key={`${item.id}-${item.variation}`} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="variation">Variation: {item.variation}</p>
                <p className="price">${item.price.toFixed(2)}</p>
                <div className="quantity">
                  <button onClick={() => handleDecreaseQuantity(item.product_id, item.variation)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.product_id, item.variation)}>+</button>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.product_id, item.variation)}>Remove</button>
              </div>
              <div className="item-total">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {productDetails.length > 0 && ( // Conditionally render the summary and checkout button if cart is not empty
        <div className="summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
          </div>
          <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
        </div>
      )}

    </div>
    <Footer />
    </div>
  );
};

export default ShoppingCart;