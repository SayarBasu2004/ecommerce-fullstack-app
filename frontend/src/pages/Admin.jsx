import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      toast.error("Access denied");
      navigate("/");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:8000/api/products");
    setProducts(data);
  };

  //  ADD PRODUCT
  const handleAddProduct = async () => {
    try {
      if (!form.name || !form.price) {
        return toast.error("Fill required fields");
      }

      await axios.post(
        "http://localhost:8000/api/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Product added");
      setForm({ name: "", price: "", image: "", category: "" });
      fetchProducts();
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container-custom py-10 space-y-10">

      {/*  ADD PRODUCT */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#1f1f1f]">
        <h2 className="text-xl mb-4">Add Product</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="input"
          />
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div>
        <h2 className="text-xl mb-4">Products</h2>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex justify-between bg-[#111] p-4 rounded-lg"
            >
              <span>{p.name}</span>

              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Admin;