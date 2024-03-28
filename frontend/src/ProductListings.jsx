import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from './Header';
import Footer from './Footer';
import './ProductListings.css'; // Import CSS styles for product listings
import { getAllProducts } from './services/api'; // Import getAllProducts function

const ProductListings = () => {
  // State for storing products data
  const [products, setProducts] = useState([]);

  // Dummy products data (replace with actual data from API or database)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="product-listings">
        <div className="container">
          {/* Product grid layout */}
          <div className="product-grid">
            {products.map(product => (
              <Link to={`/product/${product.product_id}`} key={product.id}>
                <div className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                    <button className="add-to-cart">View Details</button>
                  </div>
                </div>
              </Link>
            ))}``
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListings;
