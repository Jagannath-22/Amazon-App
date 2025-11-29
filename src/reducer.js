export const initialState = {
  basket: [],
  likedProducts: [],
  user: null,
};

// Selector to calculate total cost
export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => amount + item.price * (item.quantity || 1),
    0
  );

const reducer = (state, action) => {
  console.log("Reducer Action:", action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        basket: action.user ? state.basket : [], // Clear basket on logout
        likedProducts: action.user ? state.likedProducts : [], // Also clear liked if needed
      };

    case "SET_BASKET":
      return {
        ...state,
        basket: action.basket,
      };

    case "SET_LIKED":
      return {
        ...state,
        likedProducts: action.likedProducts,
      };

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

    case "INCREMENT_QUANTITY": {
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        const newBasket = [...state.basket];
        newBasket[index] = {
          ...newBasket[index],
          quantity: (newBasket[index].quantity || 1) + 1,
        };
        return { ...state, basket: newBasket };
      }
      return state;
    }

    case "DECREMENT_QUANTITY": {
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        const newBasket = [...state.basket];
        const currentQty = newBasket[index].quantity || 1;
        if (currentQty > 1) {
          newBasket[index] = {
            ...newBasket[index],
            quantity: currentQty - 1,
          };
        } else {
          newBasket.splice(index, 1); // Remove item
        }
        return { ...state, basket: newBasket };
      }
      return state;
    }

    case "REMOVE_ITEM_COMPLETELY":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "LIKE_PRODUCT":
      if (state.likedProducts.some((p) => p.id === action.product.id)) {
        return state; // already liked
      }
      return {
        ...state,
        likedProducts: [...state.likedProducts, action.product],
      };

    case "UNLIKE_PRODUCT":
      return {
        ...state,
        likedProducts: state.likedProducts.filter(
          (product) => product.id !== action.id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
