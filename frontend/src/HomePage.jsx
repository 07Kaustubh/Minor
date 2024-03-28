import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import { getAllCategories } from './services/api';


  const HomePage = () => {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      getAllCategories()
        .then((data) => setCategories(data))
        .catch((error) => console.error('Error fetching categories:', error));
    }, []);

  return (
    <div className="homepage">
      <Header />

      <section className="hero">
        <div className="hero-content">
          <h1>Discover Our Latest Products</h1>
          <p>Shop now and enjoy great discounts!</p>
          <button className="cta-button"><Link to="/products">Shop Now</Link></button>
        </div>
        <img src="/src/promotional-banner.jpg" alt="Promotional Banner" />
      </section>

      <section className="categories">
        <h2>Explore Our Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${encodeURIComponent(category.name)}`}
              key={category.id}
              className="category-link"
            >
              <div className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"Great products and excellent customer service!"</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial">
            <p>"Great products and excellent customer service!"</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial">
            <p>"Great products and excellent customer service!"</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial">
            <p>"Great products and excellent customer service!"</p>
            <span>- John Doe</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
