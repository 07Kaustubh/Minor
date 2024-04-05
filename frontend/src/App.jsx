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
    </Routes>
  );
}

export default App;