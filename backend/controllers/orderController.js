const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Controller function to handle fetching all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle fetching a single order by ID
const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle creating a new order
const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle updating an order
const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderData, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle deleting an order
const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
