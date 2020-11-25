const path = require("path");
const express = require("express");
const app = express();
const { resolve } = require("path");
const dotenv = require('dotenv')
const fs = require('fs');
require('dotenv').config({ path: '.env' })

//Initiate Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.static("public"));

//Permit requests across any origin
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

//Obtain request raw body for the purposes of verifying webhook signatures
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);


//Server side calculation of amount to prevent bad actors
const calculateOrderAmount = items => {
    //Load server-side product catalog (we will use a static JSON) to ensure we are using server-side prices
    let catalogRawdata = fs.readFileSync('./src/productCatalog.json');
    let catalog = JSON.parse(catalogRawdata);

    //Tally up the prices of all items in the cart
    let totalAmount = 0;
    items.forEach((item) => {
        catalog.products.forEach((catalogEntry) => {
            if(item.id===catalogEntry.id) totalAmount+=catalogEntry.price;
        })
    })
  return totalAmount*100;
};

//Payment intent endpoint, initiated when checkout form first loads (main app)
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      description: items[0].name
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
      if(err.type==='StripeAuthenticationError') {
        console.log("ERROR: Your Stripe API key(s) are incorrect.");
        console.log("Please follow the README instructions to ensure you have correctly configured your .env file with your own Stripe keys."); 
      else console.log(err)
    }
});

// Expose an endpoint as a webhook handler for asynchronous events.
app.post("/webhook", async (req, res) => {
    let data, eventType;
    console.log("We got a webhook event!");
console.log(req.body.type)
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
      console.log("Webhook signature successfully verified!");
    } else {
      //Retrieve event data in the event that the Webhook request is not signed.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === "payment_intent.succeeded") {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log("💰 Payment captured!");
    
      //Record transaction in our server-side orders log file
      let logEntry = "\n" + data.object.id + "," + data.object.created + "," + data.object.description + "," + data.object.amount_received + "," + data.object.receipt_email + "," + data.object.status;
      fs.appendFile('logs/ordersLog.csv', logEntry, function (err) {
        if (err) return console.log(err);
        console.log("Order log entry created.");
      });

    } else if (eventType === "payment_intent.payment_failed") {
      console.log("❌ Payment failed.");
    }
    res.sendStatus(200);
  });

app.listen(4242, () => console.log('Node server listening on port 4242!'));