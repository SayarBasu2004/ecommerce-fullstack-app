import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { fetchProductById } from "../api/productApi";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  //  LOADING STATE
  if (loading) {
    return (
      <div className="container-custom py-20 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  //  PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="container-custom py-20 text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="container-custom py-16 relative overflow-hidden">

      {/*  BACKGROUND */}
      <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-14 items-center relative z-10">

        {/* IMAGE */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-10 flex justify-center hover:border-white/20 transition">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div>
          <p className="text-sm text-gray-500">{product.category}</p>

          <h1 className="text-4xl md:text-5xl font-semibold mt-2">
            {product.name}
          </h1>

          <p className="text-gray-400 mt-5 max-w-md">
            {product.description || "Premium product"}
          </p>

          <h2 className="text-3xl mt-8 font-semibold gradient-text">
            ₹{product.price}
          </h2>

          <div className="mt-8 flex gap-4">

            {/* ADD TO CART */}
            <button
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart", { duration: 900 });
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl"
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
              className="border border-[#1f1f1f] px-6 py-3 rounded-xl"
            >
              Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;