import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('Request Headers:', config.headers);
    console.log('Request URL:', config.url);
    console.log('Request Method:', config.method);
    console.log('Request Data:', config.data);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

// Function to handle errors
const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

export const setAuthToken = (token) => {
  if (token) {
    console.log('Setting token in headers:', token); // Log token for verification
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Headers after setting token:', api.defaults.headers); // Log headers after setting token
  } else {
    console.log('Token is null or undefined, not removing from headers'); // Log token removal for verification
    delete api.defaults.headers.common['Authorization'];
  }
};




// Function to handle success response
const handleSuccess = (response) => response.data;

// Function to fetch all categories
export const getAllCategories = () =>
  api.get('/categories').then(handleSuccess).catch(handleError);

// Function to fetch a single category by name
export const getCategoryByName = (name) =>
  api.get(`/categories/${name}`).then(handleSuccess).catch(handleError);

// Function to create a new category
export const createCategory = (categoryData) =>
  api.post('/categories', categoryData).then(handleSuccess).catch(handleError);

// Function to update a category
export const updateCategory = (name, categoryData) =>
  api.put(`/categories/${name}`, categoryData).then(handleSuccess).catch(handleError);

// Function to delete a category
export const deleteCategory = (name) =>
  api.delete(`/categories/${name}`).then(handleSuccess).catch(handleError);

// Function to fetch all orders
export const getAllOrders = () =>
  api.get('/orders').then(handleSuccess).catch(handleError);

// Function to fetch a single order by ID
export const getOrderById = (id) =>
  api.get(`/orders/${id}`).then(handleSuccess).catch(handleError);

// Function to create a new order
export const createOrder = (orderData) =>
  api.post('/orders', orderData).then(handleSuccess).catch(handleError);

// Function to update an order
export const updateOrder = (id, orderData) =>
  api.put(`/orders/${id}`, orderData).then(handleSuccess).catch(handleError);

// Function to delete an order
export const deleteOrder = (id) =>
  api.delete(`/orders/${id}`).then(handleSuccess).catch(handleError);

// Function to fetch all order items
export const getAllOrderItems = () =>
  api.get('/orderItems').then(handleSuccess).catch(handleError);

// Function to fetch a single order item by ID
export const getOrderItemById = (id) =>
  api.get(`/orderItems/${id}`).then(handleSuccess).catch(handleError);

// Function to create a new order item
export const createOrderItem = (orderItemData) =>
  api.post('/orderItems', orderItemData).then(handleSuccess).catch(handleError);

// Function to update an order item
export const updateOrderItem = (id, orderItemData) =>
  api.put(`/orderItems/${id}`, orderItemData).then(handleSuccess).catch(handleError);

// Function to delete an order item
export const deleteOrderItem = (id) =>
  api.delete(`/orderItems/${id}`).then(handleSuccess).catch(handleError);

// Function to fetch all products
export const getAllProducts = () =>
  api.get('/products').then(handleSuccess).catch(handleError);

// Function to fetch a single product by ID
export const getProductById = (product_id) =>
  api.get(`/products/${product_id}`).then(handleSuccess).catch(handleError);

// Function to create a new product
export const createProduct = (productData) =>
  api.post('/products', productData).then(handleSuccess).catch(handleError);

// Function to update a product
export const updateProduct = (product_id, productData) =>
  api.put(`/products/${product_id}`, productData).then(handleSuccess).catch(handleError);

// Function to delete a product
export const deleteProduct = (product_id) =>
  api.delete(`/products/${product_id}`).then(handleSuccess).catch(handleError);

// Function to fetch all transactions
export const getAllTransactions = () =>
  api.get('/transactions').then(handleSuccess).catch(handleError);

// Function to fetch a single transaction by ID
export const getTransactionById = (id) =>
  api.get(`/transactions/${id}`).then(handleSuccess).catch(handleError);

// Function to create a new transaction
export const createTransaction = (transactionData) =>
  api.post('/transactions', transactionData).then(handleSuccess).catch(handleError);

// Function to update a transaction
export const updateTransaction = (id, transactionData) =>
  api.put(`/transactions/${id}`, transactionData).then(handleSuccess).catch(handleError);

// Function to delete a transaction
export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`).then(handleSuccess).catch(handleError);

// Function to fetch all users
export const getAllUsers = () =>
  api.get('/users').then(handleSuccess).catch(handleError);

// Function to fetch a single user by ID
export const getUserById = (id) =>
  api.get(`/users/${id}`).then(handleSuccess).catch(handleError);

// Function to create a new user
export const createUser = (userData) =>
  api.post('/users', userData).then(handleSuccess).catch(handleError);

// Function to update a user
export const updateUser = (id, userData) =>
  api.put(`/users/${id}`, userData).then(handleSuccess).catch(handleError);

// Function to delete a user
export const deleteUser = (id) =>
  api.delete(`/users/${id}`).then(handleSuccess).catch(handleError);

// Authentication APIs
export const loginUser = (userData) => {
  console.log('Attempting login with data:', userData);
  return api.post('/auth/login', userData).then(handleSuccess).catch(handleError);
};

export const signupUser = (userData) => {
  console.log('Attempting signup with data:', userData);
  return api.post('/auth/signup', userData).then(handleSuccess).catch(handleError);
};

export const handleStripeCheckout = async (cartItems) => {
  try {
    const response = await api.post('/stripe/create-checkout-session', { cartItems });
    return response.data.sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Function to retrieve session status
export const getSessionStatus = async (sessionId) => {
  try {
    const response = await api.get('/stripe/session-status', {
      params: {
        session_id: sessionId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving session status:', error);
    throw error;
  }
};


export default api;