const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderitem');

// Controller function to handle fetching all order items
const getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await OrderItem.find({});
    res.json(orderItems);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle fetching a single order item by ID
const getOrderItemById = async (req, res, next) => {
  try {
    const orderItemId = req.params.id;
    const orderItem = await OrderItem.findById(orderItemId);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle creating a new order item
const createOrderItem = async (req, res, next) => {
  try {
    const orderItemData = req.body;
    const orderItem = new OrderItem(orderItemData);
    await orderItem.save();
    res.status(201).json(orderItem);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle updating an order item
const updateOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.id;
    const orderItemData = req.body;
    const updatedOrderItem = await OrderItem.findByIdAndUpdate(
      orderItemId,
      orderItemData,
      { new: true }
    );
    if (!updatedOrderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(updatedOrderItem);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle deleting an order item
const deleteOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.id;
    const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);
    if (!deletedOrderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllOrderItems);
router.get('/:id', getOrderItemById);
router.post('/', createOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

module.exports = router;
