// import React from "react";
import "./Payment.css";
import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // Assuming this is still needed for Stripe integration
import CurrencyFormat from "react-currency-format";
import axios from "./axios"; // <--- This line is crucial!.............................brooooooooooooooooooooooo
import { useNavigate } from "react-router-dom"; // <--- CHANGED: Import useNavigate instead of useHistory
import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore"; // 





const promise = loadStripe("pk_test_51Rdt2aQf9sxHSoJtsr2CydLFCyda3ScinvFyCAh66ngVrMUrrKJoYAKZaeg2NcTWHmfnwixG16FwneW14lKN4DLE00iNDZLVHo");

// import { useStateValue } from "./StateProvider";

// Helper function to calculate the total price of items in the basket
// This is a common pattern in Amazon clone projects
const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => (item.price * (item.quantity || 1)) + amount, 0); // <-- CORRECTEd

function Payment() {
  // Destructure basket and user from the global state
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Initialize stripe and elements
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      const total = Math.floor(getBasketTotal(basket) * 100);
      if (total < 1) return; // 💡 Prevent 0 or negative total

      const response = await axios.post(`/payment/create?total=${total}`);
      setClientSecret(response.data.clientSecret);
    };

    if (basket.length > 0) {
      getClientSecret();
    }
  }, [basket]);

  console.log("This is the client secret:", clientSecret);
      console.log('👱', user)


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (payload.paymentIntent?.status === "succeeded") {
//        const paymentIntent = payload.paymentIntent; 
//   console.log("Payment succeeded!");

//   // Update order status in the database
//  // Save order to Firestore
// await setDoc(
//   doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
//   {
//     basket: basket,
//     amount: paymentIntent.amount,
//     created: paymentIntent.created,
//      status: "Processing",
//   }
// );




//   setSucceeded(true);
//   setError(null);
//   setProcessing(false);

//   // ✅ Empty basket after payment
//   dispatch({
//     type: "EMPTY_BASKET",
//   });
//   // console.log("🧺 Basket should be empty now!");

//   // ✅ Navigate to orders page
//   navigate("/orders", { replace: true });
// } else {
//   console.log("Payment failed or was incomplete");
//   setError("Payment failed");
//   setProcessing(false);
// }


//   };

//   const handleChange = (event) => {
//     // Handle changes in the card element
//     setDisabled(event.empty);
//     setError(event.error ? Event.error.message : " ");
//   };

const handleSubmit = async (event) => {
  event.preventDefault();
  setProcessing(true);

  try {
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(payload.error.message);
      setProcessing(false);
    } else if (payload.paymentIntent?.status === "succeeded") {
      const paymentIntent = payload.paymentIntent;
      console.log("Payment succeeded!", paymentIntent);

      // Save order to Firestore
      await setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
        {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          status: "Processing",
        }
      );

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      // Empty basket
      dispatch({ type: "EMPTY_BASKET" });

      // Redirect
      navigate("/orders", { replace: true });
    }
  } catch (err) {
    setError(err.message);
    setProcessing(false);
  }
};

const handleChange = (event) => {
  setDisabled(event.empty);
  setError(event.error ? event.error.message : "");
};

  return (
    <div className="payment">
      <div className="payment__container">
        <h1 className="payment__heading">Secure checkout</h1>

        {/* Main content and order summary container */}
        <div className="payment__mainContent">
          {/* Left Column: Delivery Address, Payment Method, Review Items */}
          <div className="payment__leftColumn">
            {/* Delivery Address */}
            <div className="payment__section">
              <div className="payment__title">
                <h3>
                  Delivering to: {user?.email}- {user?.name || "User"}
                </h3>
                <p>
                  OUTR (CET), RHR (RAMANUJAN HALL OF RESIDENCE) HOSTEL,
                  Ghatikia, kalinga Nagar, BHUBANESWAR, ODISHA, 751003, India
                </p>
                <a href="#">Add delivery instructions</a>
              </div>
            </div>

            {/* Payment Method */}
            <div className="payment__section">
              <h3>Payment method</h3>
              <div className="payment__options">
                <div className="payment__option">
                  <label>
                    <input type="radio" name="pay" defaultChecked /> Amazon Pay
                    Balance
                  </label>
                  <p className="unavailable">₹0.00 Unavailable</p>
                </div>

                <div className="payment__option">
                  <label>
                    <input type="radio" name="pay" /> Amazon Pay UPI
                  </label>
                  <p>Bank of Baroda **2757 </p>
                </div>

                <div className="payment__option">
                  <label>
                    <input type="radio" name="pay" /> Credit or debit card
                  </label>
                  <div className="card-icons">
                    <img
                      src="https://placehold.co/40x25/000000/FFFFFF?text=VISA"
                      alt="visa"
                    />
                    <img
                      src="https://placehold.co/40x25/000000/FFFFFF?text=MC"
                      alt="mastercard"
                    />
                    <img
                      src="https://placehold.co/40x25/000000/FFFFFF?text=RUPAY"
                      alt="rupay"
                    />
                  </div>
                  {/* <CardElement /> */}
                </div>

                <div className="payment__option">
                  <label>
                    <input type="radio" name="pay" /> Net Banking
                  </label>
                  <select>
                    <option>Choose an Option</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Canara Bank</option>
                    <option>Bank of Baroda</option>
                    <option>Union Bank of India</option>
                  </select>
                </div>

                <div className="payment__option">
                  <label>
                    <input type="radio" name="pay" /> Cash on Delivery / Pay on
                    Delivery
                  </label>
                  <p className="info">
                    Cash, UPI and Cards accepted. <a href="#">Know more</a>
                  </p>
                </div>

                {/* //card element  important part of the section...........*/}
                <div className="functional_Stripe_payment"></div>

                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />

                  <div className="payment__priceContainer">
                    <CurrencyFormat
                      renderText={(value) => <h3>Order Total: {value}</h3>}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <button disabled={processing || disabled || succeeded}>
                      <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button>
                  </div>

                  {/* Errors */}
                  {error && <div>{error}</div>}
                </form>

                {/* <button className="payment__button">
                  Use this payment method
                </button> */}
              </div>
            </div>

            {/* Order Summary (Review items and shipping) */}
            <div className="payment__section">
              <h3>Review items and shipping</h3>
              <div className="payment__items">
                {basket.length === 0 ? (
                  <p>Your basket is empty. Please add items to proceed.</p>
                ) : (
                  basket.map((item) => (
                    <CheckoutProduct
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      quantity={item.quantity}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="payment__rightColumn">
            <div className="payment__orderSummary">
              <button className="payment__orderButton payment__orderButton--top">
                Use this payment method
              </button>
              <div className="payment__orderSummaryDetails">
                <h4>Order Summary</h4>
                <div className="payment__summaryRow">
                  <span>Items:</span>
                  <span>₹{getBasketTotal(basket).toFixed(2)}</span>
                </div>
                <div className="payment__summaryRow">
                  <span>Delivery:</span>
                  <span>₹0.00</span> {/* Assuming free delivery for now */}
                </div>
                <div className="payment__summaryRow">
                  <span>Promotion Applied:</span>
                  <span>₹0.00</span> {/* Placeholder for promotions */}
                </div>
                <div className="payment__summaryTotal">
                  <strong>Order Total:</strong>
                  <strong>₹{getBasketTotal(basket).toFixed(2)}</strong>
                </div>
              </div>
              <button className="payment__orderButton payment__orderButton--bottom">
                Place your order
              </button>
              <p className="payment__terms">
                By placing your order, you agree to Amazon's{" "}
                <a href="#">privacy notice</a> and{" "}
                <a href="#">conditions of use</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Last Part Box (Footer-like section) */}
        <div className="payment__footer">
          <p>
            Need help? Check our <a href="#">help pages</a> or{" "}
            <a href="#">contact us 24x7</a>.
          </p>
          <p>
            When your order is placed, we'll send you an e-mail message
            acknowledging receipt of your order. If you choose to pay using an
            electronic payment method (credit card, debit card, or net banking),
            you will receive a second e-mail message once your payment has been
            processed. If you choose to pay using Cash on Delivery, you will
            receive a third e-mail message confirming dispatch and your payment
            instructions.
          </p>
          <p>
            See Amazon's <a href="#">Return Policy</a>.
          </p>
          <a href="#" className="payment__backToTop">
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
}

export default Payment;
