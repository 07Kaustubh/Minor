// frontend/src/Return.jsx

import React, { useState, useEffect } from 'react';
import { getSessionStatus, createOrder, createOrderItem, createTransaction } from './services/api'; // Import necessary API functions
import { useCart } from './services/CartContext'; // Import useCart hook
import { useAuth } from './services/auth'; // Import useAuth hook
import Header from './Header';
import Footer from './Footer';

const Return = () => {
  const { cartItems, clearCart } = useCart(); // Destructure cartItems and clearCart from useCart hook
  const { userId } = useAuth(); // Get userId from AuthContext
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  console.log('User ID:', userId); // Log the userId obtained from AuthContext
  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        const sessionData = await getSessionStatus(sessionId);
        setStatus(sessionData.status);
        setCustomerEmail(sessionData.customer_email);
        console.log('User ID:', userId); // Log the userId obtained from AuthContext

        // If payment is successful, update the database with order, order items, and transaction details
        if (sessionData.status === 'complete' && userId) {
          // Create order
          const orderData = {
            user_id: userId, // Use actual userId obtained from AuthContext
            order_date: new Date(),
            status: 'pending', // Set initial status to 'pending'
            total_price: cartItems.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total price
            shipping_address: 'shipping_address_placeholder', // Replace with actual shipping address
            payment_method: 'stripe', // Assuming payment method is Stripe
          };
          const createdOrder = await createOrder(orderData);

          // Create order items
          for (const item of cartItems) {
            const orderItemData = {
              order_id: createdOrder.order_id,
              product_id: String(item.product_id),
              quantity: item.quantity,
              price: item.price,
              subtotal: item.price * item.quantity,
              tax: 0, // Assuming no tax for simplicity
            };
            await createOrderItem(orderItemData);
          }

          // Create transaction
          const transactionData = {
            order_id: createdOrder.order_id,
            transaction_date: new Date(),
            payment_method: 'stripe', // Assuming payment method is Stripe
            amount: createdOrder.total_price,
            status: 'success', // Assuming transaction is successful
            transaction_type: 'sale', // Assuming transaction is a sale
            response_code: '200', // Assuming successful response code
          };
          await createTransaction(transactionData);

          // Clear cart after updating the database
          clearCart();
        }
      } catch (error) {
        console.error('Error retrieving session status or updating database:', error);
      }
    };

    fetchSessionStatus();
  }, [userId]); // Add userId to the dependencies array

  if (status === 'open') {
    // Redirect back to the checkout page if the session is still open
    window.location.href = '/checkout';
    return null; // Render nothing while redirecting
  }

  if (status === 'complete') {
    return (
      <div>
        <Header/>
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
      <Footer/>
    </div>
    );
  }

  // Render nothing if the status is not available yet
  return null;
};

export default Return;
