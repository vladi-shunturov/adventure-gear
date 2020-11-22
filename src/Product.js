import './App.css';

function Product({product, price, quantity, imageUrl}) {
  return (
    <div className="Product">
      <p>{`(${quantity}) ${product}`}</p>
      <p>{formatter.format(price/100)}</p>
      <img src={imageUrl} className="App-logo" alt="onewheel" />
      <p>Total: {formatter.format(quantity*price/100)}</p>
    </div>
  );
}

export default Product;

//Utility function
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})