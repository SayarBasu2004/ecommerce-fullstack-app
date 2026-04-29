import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group bg-[#111] border border-[#1f1f1f] rounded-2xl p-4 transition hover:border-gray-500">
      
      <Link to={`/product/${product._id}`}>
        <div className="h-52 flex items-center justify-center bg-black rounded-xl overflow-hidden">
          <img
            src={product.image}
            className="h-full object-contain group-hover:scale-105 transition duration-300"
          />
        </div>

        <h2 className="mt-4 text-base font-medium tracking-tight">
          {product.name}
        </h2>
      </Link>

      <p className="text-xs text-gray-500 mt-1">{product.category}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-white font-semibold">
          ₹{product.price}
        </span>

        <button
            onClick={() => {
            addToCart(product);
            toast.success("Added to cart");
          }}          
          className="text-sm px-4 py-1.5 rounded-md border border-gray-700 hover:bg-white hover:text-black transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;