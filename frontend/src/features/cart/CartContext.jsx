import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "wondertour-ticket-cart";
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      bookTour(tour) {
        setCart((currentCart) => {
          const existingTour = currentCart.find((item) => item.id === tour.id);
          if (existingTour) {
            return currentCart.map((item) =>
              item.id === tour.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [
            ...currentCart,
            {
              id: tour.id,
              name: tour.name,
              price: tour.price,
              quantity: 1,
            },
          ];
        });
      },
      increaseQuantity(tourId) {
        setCart((currentCart) =>
          currentCart.map((item) =>
            item.id === tourId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      },
      decreaseQuantity(tourId) {
        setCart((currentCart) =>
          currentCart
            .map((item) =>
              item.id === tourId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
      },
      emptyCart() {
        setCart([]);
      },
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
