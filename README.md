# Adventure Gear - Payment Intents Workflow

Developed by Vladi Shunturov using [Create React App](https://github.com/facebook/create-react-app), NodeJS, Stripe Payment Intents API & Stripe Elements.

## Requirements

You will need the following:

- [Node.js](http://nodejs.org) >=14.15.1
- Modern browser that supports ES6 (Chrome preferred)
- Stripe account to accept payments ([sign up](https://dashboard.stripe.com/register) for free)
- Stripe CLI to enable routing for webhooks:  [Stripe CLI Install guide](https://stripe.com/docs/stripe-cli#install)

**Note**: The app client uses localhost port 3000 and the app server uses port 4242 - please ensure you have no other processes using any of those two ports prior to testing

## Installation

**1.** Clone the repository and install npm dependencies
```
git clone https://github.com/vladi-shunturov/adventure-gear.git
cd adventure-gear
npm install
```

**2.** Use Stripe CLI to enable Webhook routing to localhost:4242
* Login with your Stripe account ```stripe login```
* Establish the webbooks routes using the _listen_ Stripe CLI command and forward webbook events to port 4242 at /webhook
```
stripe listen --forward-to localhost:4242/webhook
```
* Copy the webhook signing secret the Stripe CLI will provide you with and use it in step 3 below

**3.** Configure your .env file and App.js with your keys and secret
* Rename the provided .env.example template file to .env ```mv .env.example .env```
* Set the STRIPE_PUBLISHABLE_KEY to your Stripe test publishable key
* Set the STRIPE_SECRET_KEY to your Stripe test secret key
* Set the STRIPE_WEBHOOK_SECRET to the webhook signing secret provided to you by the Stripe CLI in step 2 above
* Edit src/App.js and update line 8 with your Stripe API Publishable Key

**4.** Start the application 
* Run `npm start` to launch the app in development mode
* Open a browser (Chrome) and navigate to _localhost:3000_
* The server will be running on _localhost:4242_ and accept requests from the front-end client, as well as from webhook events relayed through Stripe CLI


## Usage
* The app is very simple and begins with the state of a customer who has already added a single item to her shopping cart and clicked on the checkout button. 
* The app renders the checkout form, allowing the customer to enter their name, email and payment information to complete the purchase. 
* Because the screen the app loads into is the checkout screen itself, the app initiates a Payment Intent as soon as the checkout form loads, which happens immediately after the app loads.
* Upon the successful completion of a payment the app logs important details about the confirmed purchase in /logs/ordersLog.csv.
