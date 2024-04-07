// Contact.jsx
import React from 'react';
import './Contact.css'; // Import the CSS file for Contact component
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  return (
    <div>
        <Header/>
    <div className="contact">
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, feel free to reach out to us:</p>
      <div className="contact-info">
        <p>Email: example@example.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Street, City, Country</p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;
