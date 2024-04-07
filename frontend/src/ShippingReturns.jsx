// ShippingReturns.jsx
import React from 'react';
import './ShippingReturns.css'; // Import the CSS file for Shipping & Returns component
import Header from './Header';
import Footer from './Footer';

const ShippingReturns = () => {
  return (
    <div>
        <Header/>
        <div className="shipping-returns">
      <h1>Shipping & Returns</h1>
      <h2>Shipping Policy</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec lectus quis nisi hendrerit consequat. Duis quis diam nec turpis malesuada gravida vel vel enim. Duis rutrum metus sed libero ultricies commodo. Ut euismod lacus non ligula fringilla, sit amet placerat nulla blandit.
      </p>
      <h2>Returns Policy</h2>
      <p>
        Nam consequat felis sit amet consequat laoreet. Nullam in urna lectus. Integer porttitor pharetra lacus nec tincidunt. Nulla nec neque quis dui dapibus consectetur sed vitae lorem. Sed et velit vehicula, malesuada nulla vitae, sagittis lacus.
      </p>
      <h2>Refund Policy</h2>
      <p>
        Proin nec urna quis lacus laoreet consectetur. Nullam eleifend dui non mi bibendum, nec dapibus purus placerat. Mauris hendrerit nisi non orci mattis, nec ultricies nulla dignissim. Fusce dignissim felis non enim laoreet, in congue ipsum tempus.
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default ShippingReturns;
