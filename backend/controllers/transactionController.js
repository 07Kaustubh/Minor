const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Controller function to handle fetching all transactions
const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle fetching a single transaction by ID
const getTransactionById = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle creating a new transaction
const createTransaction = async (req, res, next) => {
  try {
    const transactionData = req.body;
    const transaction = new Transaction(transactionData);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle updating a transaction
const updateTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const transactionData = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      transactionData,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle deleting a transaction
const deleteTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
