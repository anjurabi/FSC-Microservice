const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up body parser middleware
app.use(bodyParser.json());

// Mock data for menu items
let menuItems = [
  {
    id: 1,
    name: "Cheeseburger",
    description: "Beef patty with melted cheese on a sesame bun.",
    price: 9.99,
    available: true
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh tomato sauce with mozzarella cheese and basil.",
    price: 12.99,
    available: false
  }
];

// Get all menu items
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

// Get menu item by id
app.get('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const menuItem = menuItems.find(item => item.id === id);
  if (!menuItem) {
    res.status(404).send('Menu item not found.');
  } else {
    res.json(menuItem);
  }
});

// Add new menu item
app.post('/menu', (req, res) => {
  const newMenuItem = req.body;
  newMenuItem.id = menuItems.length + 1;
  menuItems.push(newMenuItem);
  res.status(201).send('Menu item added successfully.');
});

// Update menu item by id
app.put('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const menuItem = menuItems.find(item => item.id === id);
  if (!menuItem) {
    res.status(404).send('Menu item not found.');
  } else {
    const updatedMenuItem = req.body;
    menuItems = menuItems.map(item => {
      if (item.id === id) {
        return Object.assign({}, item, updatedMenuItem);
      } else {
        return item;
      }
    });
    res.send('Menu item updated successfully.');
  }
});

// Delete menu item by id
app.delete('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const menuItem = menuItems.find(item => item.id === id);
  if (!menuItem) {
    res.status(404).send('Menu item not found.');
  } else {
    menuItems = menuItems.filter(item => item.id !== id);
    res.send('Menu item deleted successfully.');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Menu Service listening on port 3000.');
});
