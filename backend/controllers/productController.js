const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Controller function to handle fetching all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle fetching a single product by ID
const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ product_id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle creating a new product
const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const existingProduct = await Product.findOne({
      product_id: productData.product_id,
    });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product ID already exists' });
    }
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle updating a product
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: productId },
      productData,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle deleting a product
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({
      product_id: productId,
    });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct );

module.exports = router;