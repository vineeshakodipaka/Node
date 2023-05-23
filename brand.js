const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a brand by id
router.get('/:id', getBrand, (req, res) => {
  res.json(res.brand);
});

// Create a brand
router.post('/', async (req, res) => {
  const brand = new Brand({
    brandname: req.body.brandname,
    prize: req.body.prize
  });
  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a brand by id
router.put('/:id', getBrand, async (req, res) => {
  if (req.body.brandname != null) {
    res.brand.brandname = req.body.brandname;
  }
  if (req.body.prize != null) {
    res.brand.prize = req.body.prize;
  }
  try {
    const updatedBrand = await res.brand.save();
    res.json(updatedBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a brand by id
router.delete('/:id', getBrand, async (req, res) => {
  try {
    await res.brand.remove();
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a brand by id
async function getBrand(req, res, next) {
  try {
    const brand = await Brand.findById(req.params.id);
    if (brand == null) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.brand = brand;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
