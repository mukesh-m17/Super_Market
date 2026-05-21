import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.id === action.product.id
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.product,
            qty: 1,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };

    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, qty: i.qty + 1 }
            : i
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.id
              ? { ...i, qty: i.qty - 1 }
              : i
          )
          .filter((i) => i.qty > 0),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "LOAD":
      return {
        ...state,
        items: action.items,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {

  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("muruganmart_cart");

      if (saved) {
        dispatch({
          type: "LOAD",
          items: JSON.parse(saved),
        });
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    localStorage.setItem(
      "muruganmart_cart",
      JSON.stringify(state.items)
    );
  }, [state.items]);

  const totalItems = state.items.reduce(
    (sum, i) => sum + i.qty,
    0
  );

  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,

        totalItems,

        totalPrice,

        isDrawerOpen,

        openDrawer: () => setIsDrawerOpen(true),

        closeDrawer: () => setIsDrawerOpen(false),

        addItem: (product) =>
          dispatch({
            type: "ADD_ITEM",
            product,
          }),

        removeItem: (id) =>
          dispatch({
            type: "REMOVE_ITEM",
            id,
          }),

        increaseQty: (id) =>
          dispatch({
            type: "INCREASE_QTY",
            id,
          }),

        decreaseQty: (id) =>
          dispatch({
            type: "DECREASE_QTY",
            id,
          }),

        clearCart: () =>
          dispatch({
            type: "CLEAR_CART",
          }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return ctx;
}