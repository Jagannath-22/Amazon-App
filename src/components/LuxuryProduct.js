// src/components/LuxuryProduct.js
import React from "react";
import { motion } from "framer-motion";

function LuxuryProduct({ product }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 max-w-sm"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <div className="flex space-x-2 overflow-x-auto mb-4 scrollbar-hide">
        {product.images &&
          product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className="w-20 h-20 object-cover rounded-lg border hover:border-black"
            />
          ))}
      </div>

      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-500 text-sm mb-2">{product.category}</p>
      <p className="text-green-700 font-bold mb-1">{product.price}</p>
      <p className="text-yellow-500">Rating: {product.rating} ⭐</p>
    </motion.div>
  );
}

export default LuxuryProduct;

