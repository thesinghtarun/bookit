import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Book It
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
          Discover unique travel experiences, curated adventures, and scenic
          escapes — all at your fingertips.
        </p>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={() => navigate("/signin")}
        className="mt-10 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Book It • All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
