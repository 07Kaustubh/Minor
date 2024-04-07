// AboutUs.jsx
import React from 'react';
import './AboutUs.css'; // Import CSS file for styling
import Header from './Header';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div>
        <Header />
    <div className="about-us">
      <h1>About Us</h1>
      <p>Welcome to EasifyMart, your go-to destination for all your online shopping needs. We strive to provide you with the best shopping experience by offering a wide range of products, secure payment options, and excellent customer service.</p>
      <p>Our mission is to make online shopping convenient, enjoyable, and hassle-free for our customers. Whether you're looking for electronics, fashion, home essentials, or anything in between, we've got you covered.</p>
      <p>At EasifyMart, we believe in building long-lasting relationships with our customers based on trust, reliability, and satisfaction. Join us on this journey and experience the ease of shopping with EasifyMart!</p>
    </div>
    <Footer />
    </div>
  );
};

export default AboutUs;
