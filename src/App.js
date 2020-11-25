import {Component} from 'react';
import './App.css';
import Product from './Product';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import catalog from './productCatalog.json'; //Load product catalog
const promise = loadStripe("pk_test_12345"); //Update with your Sripe API Publishable key



class App extends Component {
  constructor() {
    super()
    
    //Put first item sitting in our "shopping cart" on state 
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
          <CheckoutForm cartContents={catalog.products} /> 
        </Elements>
        </header>
      </div>
    );
  }
}

export default App;