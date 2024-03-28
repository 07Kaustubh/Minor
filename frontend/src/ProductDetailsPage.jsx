import React, { useState, useEffect } from 'react';
import './ProductDetailsPage.css';
import Header from './Header';
import Footer from './Footer';
import { getProductById } from './services/api';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useCart } from './services/CartContext'; // Import useCart hook

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useCart(); // Destructure addToCart function from useCart hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        // Prepend base URL to image paths
        const updatedProductData = {
          ...productData,
          image: `${productData.image}`,
          relatedProducts: productData.relatedProducts.map(relatedProduct => ({
            ...relatedProduct,
            image: `${relatedProduct.image}`
          }))
        };
        setProduct(updatedProductData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleVariationChange = (e) => {
    setSelectedVariation(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Check if a variation is selected
    if (!selectedVariation) {
      console.error('Please select a variation');
      return;
    }
    // Check if quantity is greater than 0
    if (quantity <= 0) {
      console.error('Please enter a valid quantity');
      return;
    }
    // Create an item object
    const item = {
      id: product.product_id, // Assuming product id uniquely identifies a product
      name: product.name,
      variation: selectedVariation,
      quantity: quantity,
      price: product.price,
    };
    // Add the item to the cart
    addToCart(item);
    // Reset selected variation and quantity
    setSelectedVariation('');
    setQuantity(1);
    console.log(`Added ${quantity} ${selectedVariation} to cart`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="product-details">
          <div className="product-image">
            {/* Render the main product image */}
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <div className="variation-options">
              <label>Select Variation:</label>
              <select value={selectedVariation} onChange={handleVariationChange}>
                <option value="">Select</option>
                {product.variations.map((variation, index) => (
                  <option key={index} value={variation}>{variation}</option>
                ))}
              </select>
              <label>Quantity:</label>
              <input type="number" value={quantity} min="1" onChange={handleQuantityChange} />
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="related-product-list">
            {/* Render related products */}
            {product.relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-product">
                {/* Render the related product image */}
                <Link to={`/product/${relatedProduct.id}`}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <p>{relatedProduct.name}</p>
                  <p className="price">${relatedProduct.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
