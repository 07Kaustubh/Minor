import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './ProductListings.css';
import { getAllProducts } from './services/api';

const ProductListings = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        // If category is provided in the URL, filter products by category
        const filteredProducts = category
          ? productsData.filter(product => product.category_name === category)
          : productsData;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <Header />
      <div className="product-listings">
        <div className="container">
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
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListings;
