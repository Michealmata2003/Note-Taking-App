import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  // name: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // remove confirmPassword before sending
      const { confirmPassword, ...userData } = data;

      // send request to backend
      const res = await axios.post(
        "http://localhost:3001/auth/signup",
        userData
      );

      // if success
      alert("✅ Signup successful!");
      console.log("User created:", res.data);

      // optionally save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      alert(
        "❌ Signup failed: " + (err.response?.data?.message || err.message)
      );
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
          <p>
            Dont have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
