export default function CartLineItem(props) {
  const details = props.item;

    return (
      <div className="cart--line-item">
        <div className="line-item--image-container">
          <img
            src={details.image}
            alt={'Alt text'}
            className="line-item--image"
          />
        </div>
        <div className="line-item--information-container">
          <div className="information--container">
            <h4 className="information--title">
              { details.title }
            </h4>
            <div>
              { details.price }
            </div>
          </div>
          <div className="line-item--swatch-container">
            {/* If this were a production component I'd make a reusable component
            that makes the color circle. */}
            <div style={{borderRadius:'50%', backgroundColor: details.swatchColor, width: '2rem', height: '2rem', border: '2px solid #6e7484', marginRight: '1rem'}}></div>
            <div>{ details.swatchTitle }</div>
          </div>
          <div className="line-item--delivery-date">
            Estimated Delivery Date: { props.estimatedDelivery }
          </div>
          <a className="line-item--remove-button">
            Remove
          </a>
        </div>
      </div>
  )
}