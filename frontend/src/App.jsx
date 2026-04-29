import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white relative overflow-hidden">

        {/*  GLOBAL TOASTER */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1200,
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #1f1f1f",
            },
          }}
        />

        {/*  BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          {/* BASE */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#050505]" />

          {/* GLOW 1 */}
          <div className="absolute top-[-100px] left-[20%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />

          {/* GLOW 2 */}
          <div className="absolute bottom-[-100px] right-[20%] w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full" />
        </div>

        {/*  NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;