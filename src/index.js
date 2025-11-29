import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider"; // global state
import reducer, { initialState } from "./reducer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthProvider } from "./AuthContext"; //  Import this

const stripePromise = loadStripe("pk_test_51Rdt2aQf9sxHSoJtsr2CydLFCyda3ScinvFyCAh66ngVrMUrrKJoYAKZaeg2NcTWHmfnwixG16FwneW14lKN4DLE00iNDZLVHo");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap here */}
      <StateProvider initialState={initialState} reducer={reducer}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </StateProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
