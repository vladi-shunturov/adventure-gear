import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}

/*
import { Component } from 'react';
import './CheckoutForm.css'

class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
      name: '',
      country: '',
      zip: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log("STATE ON SUBMIT: ", this.state)
    event.preventDefault(); //Prevents browser refresh
    this.setState({
      email: '',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
      name: '',
      country: '',
      zip: ''
    })
  }

  render() {
    return (
      <div className="Checkout">
        <form className="Checkout-form" onSubmit={this.handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Card Information
            <input type="text" placeholder="Card number" name="cardNumber" value={this.state.cardNumber} onChange={this.handleChange} />
            <input type="text" placeholder="MM/YY" name="expirationDate" value={this.state.expirationDate} onChange={this.handleChange} />
            <input type="text" placeholder="CVC" name="cvc" value={this.state.cvc} onChange={this.handleChange} />
          </label>
          <label>
            Name on Card
            <input type="text" placeholder="Name on Card" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Address
            <input type="text" name="country" value={this.state.country} onChange={this.handleChange} />
            <input type="text" name="zip" value={this.state.zip} onChange={this.handleChange} />
          </label>
          <button type="submit">Place Order</button>
        </form>
      </div>
    )
  }
}

export default CheckoutForm;*/