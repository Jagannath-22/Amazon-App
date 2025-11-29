import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";
// import PaymentPage from './Payment'; // adjust path as needed
// import {useHistiry} from "react-router-dom"

function Subtotal() {
  // const history = useHistory();
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      {/* Button to proceed to checkout */}
      <button
        onClick={() => navigate("/payment")}
        disabled={basket.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
