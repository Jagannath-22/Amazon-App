import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
// import{ stripePromise }from "./stripe/stripe";

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  quantity, // Ensure quantity prop is received
  hideButton,
}) {
  const [{ basket }, dispatch] = useStateValue();

  // Ensure quantity is a valid number, defaulting to 1 if not provided or invalid.
  // This helps prevent issues if 'quantity' is undefined, null, or zero.
  const itemQuantity =
    typeof quantity === "number" && !isNaN(quantity) && quantity > 0
      ? quantity
      : 1;

  // Calculate the total price for this specific product (unit price * quantity).
  // This ensures the displayed price for the item reflects its total quantity.
  const itemTotalPrice = price * itemQuantity;

  // Function to dispatch an action to remove ALL instances of this item from the basket.
  // This is typically used for a "Delete" or "Remove" button that clears the item entirely.
  const removeFromBasket = () => {
    console.log("Dispatching REMOVE_FROM_BASKET for item id:", id);
    dispatch({
      type: "REMOVE_ITEM_COMPLETELY", // This is the correct action type for your reducer.js
      id: id,
    });
  };

  // Function to dispatch an action to decrement the quantity of this item by one.
  // The reducer will handle reducing the quantity or removing the item if quantity becomes 0.
  const decrementQuantity = () => {
    console.log("Dispatching DECREMENT_QUANTITY for item id:", id);
    dispatch({
      type: "DECREMENT_QUANTITY",
      id: id,
    });
  };

  // Function to dispatch an action to increment the quantity of this item by one.
  // The reducer will simply increase the quantity of the existing item.
  const incrementQuantity = () => {
    console.log("Dispatching INCREMENT_QUANTITY for item id:", id);
    dispatch({
      type: "INCREMENT_QUANTITY",
      id: id,
    });
  };

  // Function to generate a shareable link for the product (for future enhancement)
  const shareProduct = () => {
    const shareUrl = `https://amazon-clone.com/product/${id}`;
    navigator.share
      ? navigator.share({
          title: title,
          text: `Check this out on Amazon Clone: ${title}`,
          url: shareUrl,
        })
      : alert("Sharing not supported on this device");
  };

  return (
    <div className="checkoutProduct">
      {/* Product Image: Uses the image prop and provides an alt attribute for accessibility */}
      <img
        className="checkoutProduct__image"
        src={image}
        alt={title || "Product Image"}
      />

      <div className="checkoutProduct__info">
        {/* Product Title */}
        <p className="checkoutProduct__title">{title}</p>
        {/* Product Price: Displays the total price for the item (unit price * quantity) */}
        <p className="checkoutProduct__price">
          <small>₹</small> {/* Currency symbol */}
          <strong>{itemTotalPrice.toFixed(2)}</strong>{" "}
          {/* Display calculated total price, formatted to 2 decimal places */}
          {/* Optional: Show unit price and quantity in parentheses if quantity is more than 1 */}
          {itemQuantity > 1 && (
            <small>
              {" "}
              ({price.toFixed(2)} x {itemQuantity})
            </small>
          )}
        </p>

        {/* --- START: MODIFIED CODE FOR ALWAYS DISPLAYING QUANTITY --- */}
        {/* Moved quantity display here, outside of the quantityControls div,
            so it's always visible regardless of hideButton. */}
        <p className="checkoutProduct__itemQuantity">
          Quantity: <strong>{itemQuantity}</strong>
        </p>
        {/* --- END: MODIFIED CODE FOR ALWAYS DISPLAYING QUANTITY --- */}

        {/* Container for quantity controls and action links to match Amazon's layout */}
        <div className="checkoutProduct__controlsAndActions">
          {/*  Quantity controls (buttons): Show ONLY if hideButton is false (i.e., in Cart) */}
          {!hideButton && (
            <div className="checkoutProduct__quantityControls">
              <button onClick={decrementQuantity} disabled={itemQuantity <= 1}>
                -
              </button>
              {/* The quantity display span inside controls is now redundant if the above <p> is used */}
              <span className="checkoutProduct__quantityDisplay">
                {itemQuantity}
              </span>
              <button onClick={incrementQuantity}>+</button>
            </div>
          )}

          {/* ✅ Action links: Show Save/Delete/See More ONLY in Cart. Share is always visible. */}
          <div className="checkoutProduct__actionLinks">
            {!hideButton && (
              <>
                {/* Delete button: Calls removeFromBasket to remove all quantities of this item */}
                <button
                  onClick={removeFromBasket}
                  className="checkoutProduct__actionLink"
                >
                  Delete
                </button>
                <span className="checkoutProduct__actionSeparator">|</span>
                {/* Placeholder links */}
                <a href="#" className="checkoutProduct__actionLink">
                  Save for later
                </a>
                <span className="checkoutProduct__actionSeparator">|</span>
                <a href="#" className="checkoutProduct__actionLink">
                  See more like this
                </a>
                <span className="checkoutProduct__actionSeparator">|</span>
              </>
            )}
            {/*  Share link is always visible */}
            <button
              onClick={shareProduct}
              className="checkoutProduct__actionLink"
            >
              Share
            </button>
          </div>
        </div>{" "}
        {/* End of checkoutProduct__controlsAndActions */}
        <div
          className={`checkoutProduct__ratingStars star-${(
            Math.round(rating * 2) / 2
          )
            .toFixed(1)
            .replace(".", "_")}`}
          aria-label={`${rating} out of 5 stars`}
        ></div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
