const express = require('express');
const app = express();

// Set up middleware for JSON body parsing and URL encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route to handle payment requests
app.post('/payments', (req, res) => {
  const { orderId, amount, cardNumber, expirationDate, cvv } = req.body;

  // Process the payment using a third-party payment provider
  // and return a response indicating whether the payment was successful
  // In this example, we are assuming a successful payment for demonstration purposes
  const paymentId = Math.floor(Math.random() * 1000000);
  res.status(200).json({ paymentId, message: 'Payment successful' });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Payment Service started and listening on port 3000');
});
