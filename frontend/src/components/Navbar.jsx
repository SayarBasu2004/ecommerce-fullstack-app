import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useSearchStore } from "../store/searchStore";
import { Home, ShoppingCart, User, Search, LogOut } from "lucide-react";

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const { search, setSearch } = useSearchStore();
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const linkStyle = (path) =>
    `group flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-[#111] text-white"
        : "text-gray-400 hover:text-white hover:bg-[#111]"
    }`;

  // LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/5">

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20"></div>

      <div className="container-custom flex items-center justify-between py-3">

        <Link to="/" className="text-3xl font-semibold">
          Electro<span className="text-gray-500 text-3xl">Shop</span>
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-[#111] border border-[#1f1f1f] px-4 py-2 rounded-xl w-[350px]">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <div className="flex gap-2 items-center">

          {/* HOME */}
          <Link to="/" className={linkStyle("/")}>
            <Home size={18} />
          </Link>

          {/* CART */}
          <Link to="/cart" className={linkStyle("/cart")}>
            <div className="relative">
              <ShoppingCart size={18} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-[10px] px-1.5 py-[1px] rounded-full text-white">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          {/* ADMIN */}
          {user?.isAdmin && (
            <Link to="/admin" className={linkStyle("/admin")}>
              Admin
            </Link>
          )}

          {/* USER / LOGOUT */}
          {user ? (
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#111]"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <Link to="/login" className={linkStyle("/login")}>
              <User size={18} />
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;