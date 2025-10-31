import React, { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    try {
      const res = await fetch("https://bookit-backend-99nd.onrender.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response:", data);

      setEmail("");
      setPassword("");

      if (res.ok) {
        toast.success(data.msg);
        localStorage.setItem("userEmail", data.data.email);
        navigate("/home");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl w-[90%] max-w-sm p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>

          <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-gray-600 text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded-lg mt-2 transition-transform duration-200 transform hover:scale-105 active:scale-95 hover:bg-blue-600 active:bg-blue-700 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
