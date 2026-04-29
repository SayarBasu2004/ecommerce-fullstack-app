import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/productApi";
import { useSearchStore } from "../store/searchStore";
import { SlidersHorizontal } from "lucide-react";

const categories = [
  "All",
  "Smartphone",
  "Laptop",
  "Headphones",
  "Accessories",
];

const Home = () => {
  const { search } = useSearchStore();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const filterRef = useRef();

  //  FIXED STATES
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //  FETCH PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  //  SEARCH FILTER
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  //  CATEGORY FILTER
  if (selectedCategory !== "All") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  //  SORTING
  if (sort === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sort === "az") {
    filtered = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sort === "za") {
    filtered = [...filtered].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  } else if (sort === "new") {
    filtered = [...filtered].reverse(); // simple newest logic
  }

  //  CLOSE FILTER PANEL
  useEffect(() => {
    const handleClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="container-custom pt-3 pb-12 space-y-5">

      {/*  CATEGORY */}
      <div className="flex gap-3 flex-wrap border-b border-[#1f1f1f] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedCategory === cat
                ? "bg-white text-black"
                : "bg-[#111] text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/*  HERO */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-120px] left-[10%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-120px] right-[10%] w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full"></div>
        </div>

        <h1 className="text-5xl font-semibold">
          Next-Gen Tech,
          <span className="gradient-text"> Delivered.</span>
        </h1>

        <p className="text-gray-400 mt-4">
          Upgrade your setup with premium electronics.
        </p>
      </div>

      {/*  HEADER + FILTER */}
      <div className="flex justify-between items-center flex-wrap gap-4">

        <h2 className="text-2xl font-semibold">
          {selectedCategory === "All"
            ? "Explore Products"
            : selectedCategory}
        </h2>

        <div ref={filterRef} className="relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="bg-[#111] border px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {openFilter && (
            <div className="absolute right-0 mt-2 w-64 bg-[#111] p-4 rounded-lg space-y-3">

              {[
                { label: "Default", value: "" },
                { label: "Low → High", value: "low" },
                { label: "High → Low", value: "high" },
                { label: "A → Z", value: "az" },
                { label: "Z → A", value: "za" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className="cursor-pointer text-sm"
                >
                  {opt.label}
                </div>
              ))}

              <button
                onClick={() => {
                  setSort("");
                  setSelectedCategory("All");
                }}
                className="text-sm border p-2 w-full"
              >
                Reset
              </button>

            </div>
          )}

        </div>

      </div>

      {/*  PRODUCTS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {loading ? (
          <p className="text-gray-500 col-span-full text-center">
            Loading products...
          </p>
        ) : filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found
          </p>
        )}

      </div>

    </div>
  );
};

export default Home;