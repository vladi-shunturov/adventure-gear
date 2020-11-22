//import logo from './logo.svg';
import {Component} from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements'
import './App.css';
import Product from './Product';
import CheckoutForm from './CheckoutForm';

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
        <StripeProvider apiKey="pk_test_51HnbQwD8eNCjterIwREj2Td5WjmJ7EYSfLJVskDHSW8D8GPvqVw7vKSwD3zO09lNB8blM5WJxidAWurMsTpHtaap00fD9TXHNo">
        <Product product={product} price={price} quantity={quantity} imageUrl={imageUrl}/>
        <CheckoutForm />
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
      </div>
    );
  }
}

export default App;