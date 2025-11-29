import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  if (!order || !order.data) {
    return (
      <div className="order">
        <h2>⚠️ Order data not found.</h2>
      </div>
    );
  }

  // Extracting order details from the order object
  return (
    <div className="order">
      <h2>Order</h2>
      {/* // Displaying order details */}
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>

      <p className="order__id">
        <small>{order.id}</small>
      </p>

      {order.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={item.id || index}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          quantity={item.quantity} 
          hideButton // Hide the 'Add to Basket' button for this item
          />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
