import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './CheckoutProcess.css'; // Import CSS styles for checkout process
import Header from './Header';
import Footer from './Footer';
import { useCart } from './services/CartContext';
import { handleStripeCheckout, updateUser } from './services/api';
import { useAuth } from './services/auth';

const stripePromise = loadStripe('pk_test_51OuKavSDiZC2cvAQLUSTxx1DcGJA0NYJnF0ZcEktkgDvjSIps500h6Sf4fB8nFWpyM7GjoQAvh8e4GnSS0RNQ7u700Jt1wDvQN');

// ShippingForm component
const ShippingForm = ({ formData, updateFormData, userId, userData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSavedAddressSelect = (selectedAddress) => {
    updateFormData({
      ...formData,
      ...selectedAddress,
    });
  };

  return (
    <div className="form">
      <h2>Shipping Information</h2>
      {/* Option to select saved addresses */}
      <select onChange={(e) => handleSavedAddressSelect(JSON.parse(e.target.value))}>
        <option value="">Select Saved Address</option>
        {userData && userData.address && userData.address.map((address, index) => (
          <option key={index} value={JSON.stringify(address)}>
            {`${address.address}, ${address.city}, ${address.postalCode}, ${address.country}`}
          </option>
        ))}
      </select>
      <div className="form-group">
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      </div>
      <div className="form-group">
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" />
        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
      </div>
    </div>
  );
};

// ShippingMethodForm component
const ShippingMethodForm = ({ shippingMethods }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div className="form">
      <h2>Shipping Method</h2>
      <select value={selectedMethod} onChange={handleMethodChange}>
        <option value="">Select Shipping Method</option>
        {shippingMethods.map(method => (
          <option key={method.id} value={method.id}>{method.name} - ${method.cost} - Estimated Delivery: {method.estimatedDelivery}</option>
        ))}
      </select>
    </div>
  );
};

// OrderReview component
const OrderReview = () => {
  const { cartItems } = useCart();

  return (
    <div className="order-review">
      <h2>Order Review</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <p>{item.name} - ${item.price} - Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// CheckoutProcess component
const CheckoutProcess = () => {
  const { cartItems } = useCart();
  const [sessionId, setSessionId] = useState('');
  const { userData, userId } = useAuth(); // Destructure userId from useAuth
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      try {
        const session = await handleStripeCheckout(cartItems);
        setSessionId(session); // Update state with sessionId
      } catch (error) {
        console.error('Error fetching checkout session:', error);
      }
    };

    fetchCheckoutSession();
  }, [cartItems]);

   const handleCheckout = async () => {
    try {
      await updateUser(userId, { ...userData, address: formData }); // Update user address with formData using userId
    } catch (error) {
      console.error('Error updating user address:', error);
    }
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId, // Pass sessionId to redirectToCheckout
    });

    if (error) {
      console.error('Error during checkout:', error);
    }
  };

  // Function to update formData state
  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  };

  // State for managing current step in the checkout process
  const [currentStep, setCurrentStep] = useState(1);

  // Dummy shipping methods and costs (replace with actual data)
  const shippingMethods = [
    { id: 1, name: 'Standard Shipping', cost: 5.99, estimatedDelivery: '2-5 days' },
    { id: 2, name: 'Express Shipping', cost: 9.99, estimatedDelivery: '1-2 days' },
  ];

  // Function to handle next step
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="checkout-process">
      <Header />
      {/* Checkout steps */}
      <div className="checkout-steps">
        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>Shipping</div>
        <div className={`step ${currentStep === 2 ? 'active' : ''}`}>Shipping Method</div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>Review</div>
      </div>

      {/* Checkout form */}
      <div className="checkout-form">
        {/* Render form components based on current step */}
        {currentStep === 1 && <ShippingForm formData={formData} updateFormData={updateFormData} userId={userId} userData={userData} />}
        {currentStep === 2 && <ShippingMethodForm shippingMethods={shippingMethods} />}
        {currentStep === 3 && <OrderReview />}
      </div>
        {/* Navigation buttons */}
  <div className="navigation-buttons">
    {/* Show previous button if not in the first step */}
    {currentStep !== 1 && <button onClick={handlePrevStep}>Previous</button>}
    {/* Show next button if not in the last step */}
    {currentStep !== 3 && <button onClick={handleNextStep}>Next</button>}
    {/* Show complete button in the last step */}
    {currentStep === 3 && <button className="complete-button" onClick={handleCheckout}>Checkout with Stripe</button>}
  </div>
  <Footer />
</div>
);
};

export default CheckoutProcess;