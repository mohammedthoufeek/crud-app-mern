const express = require('express');
const router = express.Router();
const Item = require('../models/item.js');

// Get all items
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items.reverse()))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new item
router.post('/', (req, res) => {
  const newItem = new Item(req.body);

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get an item by ID
router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update an item by ID
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Item updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete an item by ID
router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
