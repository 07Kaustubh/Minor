const express = require('express');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const verifyToken = require('./utils/authMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Body:', req.body);
    next();
  });

// Routes
const categoryRouter = require('./controllers/categoryController');
const orderRouter = require('./controllers/orderController');
const orderItemRouter = require('./controllers/orderItemController');
const productRouter = require('./controllers/productController');
const authRouter = require('./controllers/authController');
const stripeRouter = require('./controllers/stripeController');
const userRouter = require('./controllers/userController');

app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/orderitems', orderItemRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/users', verifyToken, userRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
