import { useState, useRef } from "react";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const placingRef = useRef(false);

  const { cartItems, clearCart } = useCartStore();

  const [payment, setPayment] = useState("COD");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PLACE ORDER
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    
    if (placingRef.current) return;
    placingRef.current = true;

    // VALIDATION
    if (
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.phone
    ) {
      toast.error("Please fill all required fields");
      placingRef.current = false;
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: formData,
        paymentMethod: payment,
        totalPrice: total,
      };

      await createOrder(orderData);

      toast.success("Order placed successfully");

      clearCart();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Order failed");
    } finally {
      placingRef.current = false;
    }
  };

  return (
    <div className="container-custom py-16 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

      {/* LEFT SIDE */}
      <form onSubmit={handlePlaceOrder} className="space-y-12">

        {/* SHIPPING */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Shipping Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input name="fullName" onChange={handleChange} placeholder="Full Name" className="input" />
            <input name="phone" onChange={handleChange} placeholder="Phone Number" className="input" />

            <input name="address" onChange={handleChange} placeholder="Address" className="input md:col-span-2" />

            <input name="city" onChange={handleChange} placeholder="City" className="input" />
            <input name="postalCode" onChange={handleChange} placeholder="Postal Code" className="input" />

            <input name="country" onChange={handleChange} placeholder="Country" className="input md:col-span-2" />

          </div>
        </div>

        {/* PAYMENT */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Payment Method
          </h2>

          <div className="space-y-3">

            <label className="flex items-center justify-between p-4 border border-[#1f1f1f] rounded-xl cursor-pointer hover:border-white transition">
              <div>
                <p className="text-sm font-medium">Cash on Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when your order arrives
                </p>
              </div>

              <input
                type="radio"
                checked={payment === "COD"}
                onChange={() => setPayment("COD")}
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-[#1f1f1f] rounded-xl cursor-pointer hover:border-white transition">
              <div>
                <p className="text-sm font-medium">
                  Credit / Debit Card
                </p>
                <p className="text-xs text-gray-500">
                  Secure online payment
                </p>
              </div>

              <input
                type="radio"
                checked={payment === "CARD"}
                onChange={() => setPayment("CARD")}
              />
            </label>

          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl text-white font-medium hover:opacity-90 transition"
        >
          Place Order
        </button>

      </form>

      {/* RIGHT SIDE */}
      <div className="bg-[#111] p-6 rounded-2xl border border-[#1f1f1f] h-fit">

        <h2 className="text-xl font-semibold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">

          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-3 items-center">

              <img
                src={item.image}
                className="w-16 h-16 object-contain bg-[#0a0a0a] rounded-lg p-2"
              />

              <div className="flex-1">
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="text-sm">
                ₹{item.price * item.quantity}
              </p>

            </div>
          ))}

        </div>

        {/* TOTAL */}
        <div className="border-t border-[#1f1f1f] mt-6 pt-4 space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-500">Free</span>
          </div>

          <div className="flex justify-between font-semibold text-base mt-2">
            <span>Total</span>
            <span className="gradient-text">₹{total}</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;