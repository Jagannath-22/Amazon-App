// src/LuxuryCard.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./LuxuryCard.css";

function LuxuryCard({ product }) {
  const renderStars = () => {
    const full = Math.floor(product.rating);
    const half = product.rating % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="stars flex items-center gap-0.5 text-yellow-500 mt-1">
        {[...Array(full)].map((_, i) => (
          <StarIcon key={`full-${i}`} fontSize="small" />
        ))}
        {half && <StarHalfIcon fontSize="small" />}
        {[...Array(empty)].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} fontSize="small" />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="luxury-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/product/${product.id}`}
        // ✅ Fallback for images array
        state={{
          product: {
            ...product,
            images: product.images || [product.image], // Always pass array
          },
        }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-44 object-cover rounded-t-xl transition-opacity hover:opacity-90"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 capitalize mb-1">
            {product.category}
          </p>
          <p className="text-green-600 font-bold mb-1">
  Only at ₹ <span>{Number(product.price).toFixed(2)}</span>
</p>

          {renderStars()}
        </div>
      </Link>

      {/* Optional: Glow overlay */}
      <div className="luxury-card-glow" />
    </motion.div>
  );
}

export default LuxuryCard;
