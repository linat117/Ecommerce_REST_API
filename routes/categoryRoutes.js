// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one category
router.get('/:id', getCategory, (req, res) => {
    res.json(res.category);
});

// POST a new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a category
router.patch('/:id', getCategory, async (req, res) => {
    if (req.body.name != null) {
        res.category.name = req.body.name;
    }
    if (req.body.description != null) {
        res.category.description = req.body.description;
    }
    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a category
router.delete('/:id', getCategory, async (req, res) => {
    try {
        await res.category.remove();
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get category by ID
async function getCategory(req, res, next) {
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.category = category;
    next();
}

module.exports = router;
