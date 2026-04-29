import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
  } = useCartStore();

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container-custom py-12 grid md:grid-cols-2 gap-10">

      {/*  LEFT - ITEMS */}
      <div>
        <h1 className="text-2xl font-semibold mb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 items-center border-b border-[#1f1f1f] pb-4"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                className="w-20 h-20 object-contain bg-[#111] rounded-lg p-2"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-sm font-medium">
                  {item.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  ₹{item.price}
                </p>

                {/*  CONTROLS */}
                <div className="flex items-center gap-2 mt-2">

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-7 h-7 flex items-center justify-center border border-[#1f1f1f] rounded hover:bg-white hover:text-black transition"
                  >
                    −
                  </button>

                  <span className="text-sm w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-7 h-7 flex items-center justify-center border border-[#1f1f1f] rounded hover:bg-white hover:text-black transition"
                  >
                    +
                  </button>

                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <p className="text-sm font-medium">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => deleteFromCart(item._id)}
                  className="text-xs text-gray-500 hover:text-red-400 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="bg-[#111] p-6 rounded-2xl border border-[#1f1f1f] h-fit">

        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between mb-2 text-sm">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <span>Shipping</span>
          <span className="text-green-500">Free</span>
        </div>

        <div className="border-t border-[#1f1f1f] pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span className="gradient-text">₹{total}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg text-white hover:opacity-90 transition"
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
};

export default Cart;