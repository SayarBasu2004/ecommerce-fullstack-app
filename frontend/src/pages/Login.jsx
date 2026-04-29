import { useState } from "react";
import { loginUser, registerUser } from "../api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  //  HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.includes("Name")
        ? "name"
        : e.target.type === "email"
        ? "email"
        : "password"]: e.target.value,
    });
  };

  //  SUBMIT
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    if (!isLogin && !formData.name) {
      return toast.error("Enter your name");
    }

    try {
      setLoading(true);

      let data;

      if (isLogin) {
        data = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        data = await registerUser(formData);
      }

      //  SAVE USER
      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success(isLogin ? "Login successful" : "Account created");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/*  BACKGROUND */}
      <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-[#0f0f0f]/80 backdrop-blur-xl border border-[#1f1f1f] rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full bg-[#111]/80 border border-[#1f1f1f] px-4 py-3 rounded-lg text-sm"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            className="w-full bg-[#111]/80 border border-[#1f1f1f] px-4 py-3 rounded-lg text-sm"
          />
          

          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-[#111]/80 border border-[#1f1f1f] px-4 py-3 rounded-lg text-sm"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Create Account"}
        </button>

        {/* TOGGLE */}
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-gray-400 text-center cursor-pointer mt-6 hover:text-white transition"
        >
          {isLogin
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
};

export default Login;