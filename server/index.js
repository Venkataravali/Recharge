// server.js
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NHL0bSEBfD69PbdovxAbqz1cAOrqpYdV2Qrbd7zQYgwLGDZ5v4lL8ObSn68haUFnxYipQol4L4SEhRr5GTL78or0063LuSoMq');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000/'
  }));
  
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://cluster0.txbjaaw.mongodb.net/mobile_recharge', {
  useNewUrlParser: true,
  user: 'Ravalionpassive',
  pass: 'WpVUFYN0S890cVFL',
});


// Define a schema for transactions
const transactionSchema = new mongoose.Schema({
  provider: String,
  mobileNumber: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  status: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.use(bodyParser.json());

app.post('/api/recharge', async (req, res) => {
  const { provider, mobileNumber, token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: 1000, // Example amount in cents (adjust as needed)
      currency: 'usd',
      description: `Mobile recharge for ${provider} - ${mobileNumber}`,
      source: token,
    });

    // Create a new transaction and save it to the database
    const newTransaction = new Transaction({
      provider,
      mobileNumber,
      amount: 1000, // Example amount
      status: 'completed',
    });

    // Save the transaction to the database
    newTransaction.save();

    res.json({ transactionId: newTransaction._id });
  } catch (error) {
    res.status(400).json({ error: 'Payment failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
