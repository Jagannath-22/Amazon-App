

// src/components/Product.js
import React from "react";
import { motion } from "framer-motion";

function Product({ product }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-4 max-w-sm"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {product.images && product.images.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto mb-3 scrollbar-hide">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`product-${idx}`}
              className="w-16 h-16 object-cover rounded-md border hover:border-blue-500"
            />
          ))}
        </div>
      )}

      <h2 className="text-md font-semibold truncate mb-1">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-1">₹{product.price}</p>
      {product.rating && <p className="text-yellow-500">Rating: {product.rating} ⭐</p>}
    </motion.div>
  );
}

export default Product;
