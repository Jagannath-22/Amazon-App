import React, { createContext, useContext, useReducer, useEffect } from "react";
import { db } from "./firebase"; // Make sure your firebase.js is correctly configured
import { doc, getDoc, setDoc } from "firebase/firestore";

// 1. Create Context
export const StateContext = createContext();

// 2. Initial State
export const initialState = {
  basket: [],
  viewedProducts: [],
  savedProducts: [], // Consider if this is distinct from likedProducts
  products: [], // This would typically be fetched from an API/DB, not stored globally like this
  user: null,
  likedProducts: [], // for like page
};

// Selector: Calculates the total price of all items in the basket
// It correctly accounts for item price multiplied by its quantity.
export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => item.price * (item.quantity || 1) + amount,
    0
  );

// Selector: Calculates the total number of items by quantity in the basket.
export const getBasketProductCount = (basket) =>
  basket?.reduce((totalCount, item) => totalCount + (item.quantity || 1), 0);

// 3. The Reducer logic (PURE FUNCTION - NO HOOKS HERE)
const reducer = (state, action) => {
  console.log("Reducer Action:", action); // Log all dispatched actions for debugging

  switch (action.type) {
    case "ADD_TO_BASKET": {
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex >= 0) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex] = {
          ...updatedBasket[existingItemIndex],
          quantity: (updatedBasket[existingItemIndex].quantity || 1) + 1,
        };
        return { ...state, basket: updatedBasket };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, quantity: 1 }],
        };
      }
    }

    case "ADD_TO_VIEWED": {
      // Ensure no duplicates and handle view count if necessary (though INCREMENT_VIEW_COUNT exists)
      const exists = state.viewedProducts.find((p) => p.id === action.item.id);
      if (exists) {
        return state; // No duplicates in viewedProducts
      }
      return {
        ...state,
        viewedProducts: [...state.viewedProducts, action.item],
      };
    }

    case "INCREMENT_VIEW_COUNT": {
      return {
        ...state,
        viewedProducts: state.viewedProducts.map((p) =>
          p.id === action.id
            ? { ...p, views: (p.views || 0) + 1 }
            : p
        ),
      };
    }

    case 'ADD_TO_LIKED': {
       if (!state.user) return state;// Prevents cart manipulation when no user
  // ... proceed
      const existsInLiked = state.likedProducts.some(
        (likedItem) => likedItem.id === action.item.id
      );
      if (existsInLiked) {
        console.log('Item already liked:', action.item.id);
        return state;
      } else {
        return {
          ...state,
          likedProducts: [...state.likedProducts, action.item],
        };
      }
    }

    case "REMOVE_FROM_LIKED": {
      return {
        ...state,
        likedProducts: state.likedProducts.filter(
          (item) => item.id !== action.id
        ),
      };
    }

    case "EMPTY_BASKET": {
      return {
        ...state,
        basket: [],
      };
    }

    case "DECREMENT_QUANTITY": {
      const indexToDecrement = state.basket.findIndex(
        (item) => item.id === action.id
      );

      let newBasket = [...state.basket];

      if (indexToDecrement >= 0) {
        const currentQuantity = newBasket[indexToDecrement].quantity || 1;
        if (currentQuantity > 1) {
          newBasket[indexToDecrement] = {
            ...newBasket[indexToDecrement],
            quantity: currentQuantity - 1,
          };
        } else {
          newBasket.splice(indexToDecrement, 1); // Remove if quantity is 1
        }
      } else {
        console.warn(
          `Cannot decrement quantity: Product with id ${action.id} not found in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    }

    case "INCREMENT_QUANTITY": {
      const indexToIncrement = state.basket.findIndex(
        (item) => item.id === action.id
      );

      let newBasket = [...state.basket];

      if (indexToIncrement >= 0) {
        newBasket[indexToIncrement] = {
          ...newBasket[indexToIncrement],
          quantity: (newBasket[indexToIncrement].quantity || 1) + 1,
        };
      } else {
        console.warn(
          `Cannot increment quantity: Product with id ${action.id} not found in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    }

    case "REMOVE_ITEM_COMPLETELY": {
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };
    }

    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }

    // NEW CASES FOR SYNCHRONIZATION
    case "SET_BASKET": {
        return {
            ...state,
            basket: action.basket,
        };
    }
    case "SET_LIKED": {
        return {
            ...state,
            likedProducts: action.likedProducts,
        };
    }

    default:
      return state;
  }
};

// 4. StateProvider Component
// This component wraps your application and provides the state context.
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// 5. useStateValue Hook
// This custom hook makes it easy to access the state and dispatch function.
export const useStateValue = () => useContext(StateContext);

// 6. StateSync Component
// This component handles the side effects (Firebase interactions)
// and should be rendered inside a component that has access to the context,
// for example, as a child of StateProvider in your App.js or similar top-level component.
export function StateSync() {
  const [{ user, basket, likedProducts }, dispatch] = useStateValue(); // Access basket and likedProducts here

  // Effect to FETCH user data from Firebase when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Dispatch actions to update the local state with fetched data
            dispatch({ type: "SET_BASKET", basket: userData.basket || [] });
            dispatch({
              type: "SET_LIKED",
              likedProducts: userData.likedProducts || [],
            });
            console.log("Fetched user data:", userData);
          } else {
            // If user document doesn't exist, create it with initial empty arrays
            console.log("User document does not exist, creating new one.");
            await setDoc(docRef, { basket: [], likedProducts: [] }, { merge: true });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, dispatch]); // Depend on user and dispatch

  // Effect to SAVE user data to Firebase when basket or likedProducts change
  useEffect(() => {
    const saveUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          await setDoc(
            docRef,
            {
              basket: basket,
              likedProducts: likedProducts,
            },
            { merge: true } // Use merge: true to avoid overwriting other fields
          );
          console.log("User data saved to Firebase.");
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
    };

    // Only save if basket or likedProducts have content or if user is logged out (to clear data)
    // You might want to debounce this save operation in a real app to prevent too many writes
    // or add a check to only save if the data has actually changed from the last saved state.
    saveUserData();
  }, [basket, likedProducts, user]); // Depend on basket, likedProducts, and user

  return null; // This component doesn't render any UI
}


// This 'export default reducer;' is often not needed if you only use the named exports
// via StateProvider. However, if other files import 'reducer' directly, keep it.
// For a typical context API setup, it's often not needed.
export default reducer;