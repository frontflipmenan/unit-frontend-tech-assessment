import './App.css';
import CartLineItem from './components/cartLineItem'
import CartFees from './components/cartFees';
import { useEffect, useState } from 'react';
import axios from 'axios';

//Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";


const SUBTOTAL = 2094.97;
const HST = 272.3461;
const TOTAL = 2382.3161;
const ESTIMATED_DELIVERY = "Nov 24, 2021";

function App() {
  const [cartItems, setCartItems] = useState(null)
  const [cartFees, setCartFees] = useState(null)
  const [lineItems, setLineItems] = useState([])
  const [shippingLocation, setShippingLocation] = useState('V')

  function getApiData() {
    axios.get(`http://localhost:3005/items?loc=${shippingLocation}`)
    .then(res => {
      setLineItems(res.data);
    })
    .then(() => {
      updateCart();
    })
  }

  useEffect(() => {
    getApiData();
  }, [])

  function getCartItems() {
    setCartItems((lineItems.length > 0) ? lineItems.map((item, index) => {
      return <CartLineItem
        key={`cart-line-item-${index}`}
        item={item}
        estimatedDelivery={ESTIMATED_DELIVERY}
        removeItem={removeLineItem}
      />
    }) : 'Add items to cart to continue shopping.')
  }

  function getCartFees() {
    let subTotal = 0;
    lineItems.forEach((item) => {
      subTotal = parseFloat(subTotal + item.price);
    })
    setCartFees(
      <CartFees subTotal={subTotal} />
    )
  }

  function updateCart() {
    getCartItems();
    getCartFees();
  }

  useEffect(() => {
    updateCart();
  }, [lineItems]);

  function removeLineItem(lineItemId) {
    //There's no quantity indicator on the provided screenshot, so this will essentially
    //remove all items with the specified ID as if they were stacked with a quantity indicator.
    let updatedArray = lineItems;
    updatedArray.forEach((item, index) => {
      (item.id == lineItemId) && updatedArray.splice(index, 1);
    });
    setLineItems(updatedArray);
    updateCart();
  }

  function addLineItem(lineItem) {
    let updatedArray = lineItems;
    updatedArray.push(lineItem);
    setLineItems(updatedArray);
    updateCart();
  }

  const handlePostalCodeInput = (event) => {
    if ((event.target.value).charAt(0) == shippingLocation) {
      return
    } else {
      console.log('Shipping location changed.')
      setShippingLocation((event.target.value).charAt(0));
      getApiData(shippingLocation);
    }
  };

  return (
    <div className="App">
      <div className="cart-container">
        <h1 className="cart-heading">
          Your Cart
        </h1>
      <div className="cart-grid">
        { cartItems }
        { cartFees }
      </div>
      <br />
      <h4>Input Postal Code</h4>
      <input
        type="text"
        placeholder="X1X 1X1"
        id="postalCode"
        onBlur={handlePostalCodeInput}
      />
      <br /><br />
      {/* I gave this Grey Sofa a randomized ID so it doesn't remove all the other Grey Sofa's when removed. */}
      <button onClick={() => addLineItem({id: Math.random(),title: "Grey Sofa",price: 499.99,quantity: 1,image: "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",swatchColor: "#959392",swatchTitle: "Grey"})}>Add Grey Sofa</button>
    </div>
    <style>
      {/*
      I normally wouldn't ever use a style element in React,
      but since there's a 2 hour time limit on this I'm not going to
      install Tailwind or Material UI or setting up any other CSS processing.
      */}
      {`
        .App {
          margin: auto;
          max-width: 1200px;
          font-family: sans-serif
        }

        h1 { 
          font-family: serif
        }

        h4 {
          color: ${BLUE};
          margin: 0;
        }
        
        .cart-heading {
          color: ${BLUE}
        }

        .line-item--image {
          width: 200px;
          margin-top: 1rem;
        }

        .cart--line-item {
          display: grid;
          grid-template-columns: 2fr 6fr;
          margin-top: 3rem;
        }

        .information--container {
          display: flex;
          justify-content: space-between;
        }

        .line-item--information-container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .line-item--swatch-container {
          display: flex;
          align-items: center;
        }

        .line-item--delivery-date, .line-item--remove-button {
          text-align: right;
        }

        .line-item--remove-button {
          font-size: 0.9rem;
          text-decoration: underline;
        }

        .cart-fees--row, .cart-fees--row--title {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .cart-fees--row--title {
          color: ${BLUE}
        }

        .cart-fees--container {
          margin-inline: auto;
          margin-top: 3rem;
          max-width: 800px;
        }
      `}
    </style>
    </div>
  );
}

export default App;
