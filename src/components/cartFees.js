export default function CartFees(props) {
  
  return (
    <div className="cart-fees--container">
      <div className="cart-fees--row">
        <div>Subtotal</div><div>${props.subtotal}</div>
      </div>
      <div className="cart-fees--row">
        <div>Taxes</div><div>${props.taxes}</div>
      </div>
      <div className="cart-fees--row">
        <div>Shipping</div><div>FREE</div>
      </div>
      <div className="cart-fees--row--title">
        <div>Total</div><div>${props.total}</div>
      </div>
    </div>
  )
}