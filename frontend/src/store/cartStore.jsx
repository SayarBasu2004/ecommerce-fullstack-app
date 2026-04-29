import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],

  //  Add to cart
  addToCart: (product) => {
    const cart = get().cartItems;

    const existing = cart.find((item) => item._id === product._id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cartItems: updatedCart });
  },

  //  Decrease quantity
  removeFromCart: (id) => {
    const cart = get().cartItems;

    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cartItems: updatedCart });
  },

  //  Remove completely
  deleteFromCart: (id) => {
    const updatedCart = get().cartItems.filter(
      (item) => item._id !== id
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cartItems: updatedCart });
  },

  // Total
  totalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },


  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cartItems: [] });
  },
}));