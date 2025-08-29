import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3001/auth/signin", data);

      // if login is successful
      alert("✅ Login successful!");
      console.log("Login response:", res.data);

      // save token & user info to localStorage
      localStorage.setItem("token", res.data.token);

      // redirect user (e.g. to dashboard)
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        "❌ Login failed: " + (err.response?.data?.error || err.message)
      );
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
          <p>Dont have an account? <Link to='/signup'>SignUp</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
