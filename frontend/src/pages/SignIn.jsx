import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdOutlineNoteAlt } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../utils/api";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");
      const res = await api.post("/auth/login", data);
      login({
        email: res.data.user.email,
        name: res.data.user.name,
        token: res.data.token,
      });
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f0f4f4" }}>

      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundColor: "#002c2f" }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: "#1e646e" }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: "#1e646e" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: "#1e646e" }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1e646e" }}>
            <MdOutlineNoteAlt className="text-white text-xl" />
          </div>
          <span className="text-white text-xl font-bold">NotePlus</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Welcome back to<br />
            <span style={{ color: "#1e646e" }}>NotePlus</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Your thoughts, organized. Sign in to access your notes, reminders, and notebooks.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Create and organize notes effortlessly",
              "Set reminders so you never forget",
              "Share notes with your team",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1e646e" }}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-xs relative z-10">© 2024 NotePlus. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
          style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#002c2f" }}>
              <MdOutlineNoteAlt className="text-white text-sm" />
            </div>
            <span className="font-bold text-gray-800">NotePlus</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-400 text-sm mt-1">Enter your credentials to access your account</p>
          </div>

          {serverError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-500 text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                {...register("email")}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-100"
                    : "border-gray-200 focus:border-teal-400 focus:ring-teal-50"
                }`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium transition-colors" style={{ color: "#1e646e" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-100"
                      : "border-gray-200 focus:border-teal-400 focus:ring-teal-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="text-lg" /> : <AiOutlineEye className="text-lg" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ backgroundColor: "#002c2f" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold hover:underline" style={{ color: "#1e646e" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Signin;