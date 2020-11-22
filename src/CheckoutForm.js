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

export default CheckoutForm;