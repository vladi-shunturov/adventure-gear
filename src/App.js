//import logo from './logo.svg';
import {Component} from 'react';
import './App.css';
import Product from './Product';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import catalog from './productCatalog.json'; //Load product catalog
const promise = loadStripe("pk_test_51HnbQwD8eNCjterIwREj2Td5WjmJ7EYSfLJVskDHSW8D8GPvqVw7vKSwD3zO09lNB8blM5WJxidAWurMsTpHtaap00fD9TXHNo");


class App extends Component {
  constructor() {
    super()
    
    //Automatically load 1st item in list into shopping card
    this.state = {
      product: catalog.products[0].name,
      price: catalog.products[0].price,
      quantity: 1,
      imageUrl: catalog.products[0].imgUrl
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