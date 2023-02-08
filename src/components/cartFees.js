export default function CartFees(props) {
  
  const taxes = parseFloat(props.subTotal * 0.13).toFixed(2);
  const total = (parseFloat(props.subTotal) + parseFloat(taxes) + 15).toFixed(2)

  return (
    <div className="cart-fees--container">
      <div className="cart-fees--row">
        <div>Subtotal</div>
        <div>${parseFloat(props.subTotal).toFixed(2)}</div>
      </div>
      <div className="cart-fees--row">
        <div>Taxes</div>
        <div>${taxes}</div>
      </div>
      <div className="cart-fees--row">
        <div>Shipping</div>
        <div>$15</div>
      </div>
      <div className="cart-fees--row--title">
        <div>Total</div>
        <div>${total}</div>
      </div>
    </div>
  )
}