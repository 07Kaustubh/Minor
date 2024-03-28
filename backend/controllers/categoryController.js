const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Controller function to handle fetching all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle fetching a single category by name
const getCategoryByName = async (req, res, next) => {
  try {
    const categoryName = req.params.name;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle creating a new category
const createCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;
    const category = new Category(categoryData);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle updating a category
const updateCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.name;
    const categoryData = req.body;
    const updatedCategory = await Category.findOneAndUpdate(
      { name: categoryName },
      categoryData,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle deleting a category
const deleteCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.name;
    const deletedCategory = await Category.findOneAndDelete({ name: categoryName });
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllCategories);
router.get('/:name', getCategoryByName);
router.post('/', createCategory);
router.put('/:name', updateCategory);
router.delete('/:name', deleteCategory);

module.exports = router;
