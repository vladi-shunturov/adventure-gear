//import logo from './logo.svg';
import {Component} from 'react';
import './App.css';
import Product from './Product';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const promise = loadStripe("pk_test_51HnbQwD8eNCjterIwREj2Td5WjmJ7EYSfLJVskDHSW8D8GPvqVw7vKSwD3zO09lNB8blM5WJxidAWurMsTpHtaap00fD9TXHNo");

class App extends Component {
  constructor() {
    super()
    this.state = {
      product: 'Onewheel',
      price: 95000, //in cents
      quantity: 1,
      imageUrl: 'https://cdn.shopify.com/s/files/1/0696/2011/products/Onewheel_Pint_3-4_Rear_Tan_2a850c9c-1d58-4a5d-9f23-7a755051c012.png?v=1565903118'
    }
  }
  
  render() {
    const {product, price, quantity, imageUrl} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h3>Guest Checkout</h3>
        <Product product={product} price={price} quantity={quantity} imageUrl={imageUrl}/>
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
        </header>
      </div>
    );
  }
}

export default App;