import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal"; // Add this
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
// import stripePromise from "./stripe/stripe";

function Checkout() {
  const [{ basket,user }] = useStateValue();

  // ✅ Group same items by ID
  const groupedBasket = basket.reduce((acc, item) => {
    const found = acc.find((x) => x.id === item.id);
    if (found) {
      found.quantity += item.quantity || 1;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div >
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {groupedBasket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity || 1}
            />
          ))}

          {/* BasketItems go here */}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
        {/* <h2>The subTotal.. buy now your product....</h2> */}
      </div>
    </div>
  );
}

export default Checkout;
