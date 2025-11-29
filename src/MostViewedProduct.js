import React from "react";
import { motion } from "framer-motion";

function MostViewedProduct() {
  return (
    <div className="w-full bg-white py-10 px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800"
      >
        Welcome to a Cornucopia of Delights
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg md:text-xl text-gray-600"
      >
        Discover timeless elegance, daily essentials, and tomorrow's trends.
      </motion.p>
    </div>
  );
}

export default MostViewedProduct;
