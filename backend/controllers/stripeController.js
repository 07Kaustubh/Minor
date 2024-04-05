const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.cartItems.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}',
    });
    
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

// Retrieve a Checkout Session status
router.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (error) {
    console.error('Error retrieving checkout session status:', error);
    res.status(500).json({ error: 'Error retrieving checkout session status' });
  }
});

module.exports = router;
