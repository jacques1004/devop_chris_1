const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory data store (in production, use a database)
let products = [
  { id: '1', name: 'Wireless Bluetooth Headphones', price: 79.99, description: 'High-quality wireless headphones with noise cancellation' },
  { id: '2', name: 'Smart Fitness Watch', price: 199.99, description: 'Track your fitness goals with this advanced smartwatch' },
  { id: '3', name: 'Portable Power Bank', price: 49.99, description: '20000mAh power bank for charging on the go' },
  { id: '4', name: 'USB-C Charging Cable', price: 19.99, description: 'Fast charging USB-C cable, 6ft length' },
  { id: '5', name: 'Gaming Mechanical Keyboard', price: 129.99, description: 'RGB backlit mechanical keyboard for gaming' },
  { id: '6', name: 'Wireless Mouse', price: 39.99, description: 'Ergonomic wireless mouse with precision tracking' }
];

let carts = {}; // In-memory cart storage

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Get cart for a user (using session-like ID)
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];
  res.json(cart);
});

// Add item to cart
app.post('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({
      id: uuidv4(),
      productId,
      name: product.name,
      price: product.price,
      quantity
    });
  }

  res.json(carts[userId]);
});

// Update cart item quantity
app.put('/api/cart/:userId/:itemId', (req, res) => {
  const { userId, itemId } = req.params;
  const { quantity } = req.body;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const item = carts[userId].find(item => item.id === itemId);
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  if (quantity <= 0) {
    carts[userId] = carts[userId].filter(item => item.id !== itemId);
  } else {
    item.quantity = quantity;
  }

  res.json(carts[userId]);
});

// Remove item from cart
app.delete('/api/cart/:userId/:itemId', (req, res) => {
  const { userId, itemId } = req.params;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  carts[userId] = carts[userId].filter(item => item.id !== itemId);
  res.json(carts[userId]);
});

// Clear cart
app.delete('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  carts[userId] = [];
  res.json(carts[userId]);
});

// Checkout (simulate order processing)
app.post('/api/checkout/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!carts[userId] || carts[userId].length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const order = {
    id: uuidv4(),
    userId,
    items: carts[userId],
    total: carts[userId].reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  // Clear cart after checkout
  carts[userId] = [];

  res.json({ message: 'Order placed successfully', order });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for testing
