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
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
      const { confirmPassword, ...userData } = data;
      const res = await api.post("/auth/register", userData);
      login({
        name: res.data.user.name,
        email: res.data.user.email,
        token: res.data.token,
      });
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed. Try again.");
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
            Start organizing<br />
            <span style={{ color: "#1e646e" }}>your thoughts</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Join thousands of users who trust NotePlus to keep their ideas, tasks, and reminders in one place.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Free forever — no credit card needed",
              "Sync across all your devices",
              "Share and collaborate with others",
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
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">Fill in the details below to get started</p>
          </div>

          {serverError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-500 text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 ${
                  errors.name
                    ? "border-red-300 focus:ring-red-100"
                    : "border-gray-200 focus:border-teal-400 focus:ring-teal-50"
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-300 focus:ring-red-100"
                      : "border-gray-200 focus:border-teal-400 focus:ring-teal-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <AiOutlineEyeInvisible className="text-lg" /> : <AiOutlineEye className="text-lg" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
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
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold hover:underline" style={{ color: "#1e646e" }}>
              Sign In
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

export default Signup;