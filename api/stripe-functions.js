require('dotenv').config();
var stripe = require('stripe')(process.env.STRIPE_API_KEY);