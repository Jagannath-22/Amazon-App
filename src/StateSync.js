// src/StateSync.js
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";

const StateSync = () => {
  const [{ basket, likedProducts, user }] = useStateValue();

  useEffect(() => {
    if (user) {
      localStorage.setItem(`basket_${user.uid}`, JSON.stringify(basket));
      localStorage.setItem(`liked_${user.uid}`, JSON.stringify(likedProducts));
    } else {
      // Optional: clear data on logout
      localStorage.removeItem("basket_guest");
      localStorage.removeItem("liked_guest");
    }
  }, [basket, likedProducts, user]);

  return null; // invisible helper component
};

export default StateSync;
