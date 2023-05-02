// Import necessary modules and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Initialize the application
const app = express();
const port = 3000;

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017';
const dbName = 'restaurant';

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  // Use the restaurant database
  const db = client.db(dbName);

  // Define API endpoints

  // Get all orders
  app.get('/orders', (req, res) => {
    db.collection('orders').find().toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  // Get orders by date range
  app.get('/orders/:start/:end', (req, res) => {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);

    db.collection('orders').find({ date: { $gte: start, $lte: end } }).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  // Get sales by date range
  app.get('/sales/:start/:end', (req, res) => {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);

    db.collection('orders').aggregate([
      { $match: { date: { $gte: start, $lte: end } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Reporting Service listening at http://localhost:${port}`);
  });
});
