import React, { useState, useEffect } from 'react';
import { useAuth } from './services/auth'; // Import useAuth hook
import { getAllOrders, getAllOrderItems, getProductById } from './services/api'; // Import API functions

const DataFetchingComponent = () => {
  const { userId } = useAuth(); // Get userId from useAuth hook
  const [isLoading, setIsLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call API functions to fetch data
        const allOrders = await getAllOrders();
        const ordersForUser = allOrders.filter(order => order.user_id === userId); // Filter orders by user ID
        const orderItems = await getAllOrderItems();

        // Match order items to each order based on order ID
        const ordersWithItems = await Promise.all(ordersForUser.map(async order => {
          const itemsForOrder = orderItems.filter(item => item.order_id === order.order_id);
          const itemsWithProductDetails = await Promise.all(itemsForOrder.map(async item => {
            const product = await getProductById(item.product_id);
            return { ...item, product };
          }));
          return { ...order, orderItems: itemsWithProductDetails };
        }));

        // Log fetched data (for demonstration)
        console.log('Fetched Orders with Items:', ordersWithItems);

        setFilteredOrders(ordersWithItems); // Set filtered orders with items
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); // Fetch data when the user ID changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display fetched data here */}
      <h2>Data Fetched Successfully!</h2>
      {filteredOrders.map(order => (
        <div key={order.order_id}>
          <h3>Order ID: {order.order_id}</h3>
          <ul>
            {order.orderItems.map(item => (
              <li key={item.order_item_id}>
                Product Name: {item.product.name}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DataFetchingComponent;
