import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './HomePage';
import ProductListings from './ProductListings';
import ProductDetailsPage from './ProductDetailsPage';
import ShoppingCart from './ShoppingCart';
import CheckoutProcess from './CheckoutProcess';
import UserDashboard from './UserDashboard';
import PrivateRoute from './PrivateRoute'; // Ensure correct import path
import Return from './Return';
import AboutUs from './AboutUs';
import Contact from './Contact';
import ShippingReturns from './ShippingReturns';
import TermsConditions from './TermsConditions';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductListings />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element= { <PrivateRoute>
          <ShoppingCart />
        </PrivateRoute>}
      />
      <Route path='/checkout' element= { <PrivateRoute >
          <CheckoutProcess />
        </PrivateRoute>}
      />  
      <Route path='/dashboard' element= {  <PrivateRoute>
         <UserDashboard />
        </PrivateRoute>}
      />
      <Route path='/return' element={<Return />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shipping" element={<ShippingReturns />} />
      <Route path='/terms' element={<TermsConditions />} /> {/* Add this route */}
    </Routes>
  );
}

export default App;