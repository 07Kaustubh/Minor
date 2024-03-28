import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProductById } from './api'; // Import getProductById function

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage on component mount
  useEffect(() => {
    console.log('Loading cart data from localStorage...');
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving cart data to localStorage...');
    const saveCartToLocalStorage = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    // Call the function to save cart items to localStorage
    saveCartToLocalStorage();
  }, [cartItems]);

  const addToCart = async (item) => {
    console.log('Adding item to cart:', item);
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.product_id === item.product_id && cartItem.variation === item.variation
    );
  
    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      console.log('Item already exists in cart. Updating quantity...');
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      console.log('Cart before update:', cartItems);
      setCartItems(updatedCartItems);
      console.log('Cart after update:', updatedCartItems);
    } else {
      // Fetch product data before adding it to the cart
      try {
        console.log('Fetching product data for item:', item);
        const productData = await getProductById(item.id);
        const cartItem = { ...item, ...productData }; // Merge product data with item
        setCartItems([...cartItems, cartItem]);
        console.log('Cart before update:', cartItems);
        console.log('Cart after update:', [...cartItems, cartItem]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  };
  

  const removeFromCart = (itemId, variationId) => {
    console.log('Removing item from cart:', itemId, variationId);
    setCartItems(cartItems.filter(item => !(item.product_id === itemId && item.variation === variationId)));
    console.log('Cart after removal:', cartItems);
  };

  const updateCartItemQuantity = (itemId, variationId, newQuantity) => {
    console.log('Updating quantity of item in cart:', itemId, variationId, newQuantity);
    const updatedCartItems = cartItems.map(item => {
      if (item.product_id === itemId && item.variation === variationId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    console.log('Cart before update:', cartItems);
    console.log('Cart after update:', updatedCartItems);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    console.log('Clearing cart...');
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
