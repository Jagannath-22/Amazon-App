// src/LuxuryPage.js
import React from "react";
import { useParams } from "react-router-dom";
import LuxuryCard from "./LuxuryCard";
import { luxuryProducts } from "./data/luxuryProducts";
import "./LuxuryPage.css"; // ⬅️ Add this CSS file for horizontal scroll

function LuxuryPage() {
  const { brandId } = useParams();
  const products = luxuryProducts[brandId] || [];

  if (!luxuryProducts[brandId]) {
    return (
      <h2 className="text-center text-red-500 mt-20">
        Invalid luxury brand selected.
      </h2>
    );
  }

  return (
    <div className="min-h-screen px-8 py-12 bg-gradient-to-br from-white to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-12 capitalize font-serif text-gray-800">
        {brandId} Products
      </h1>

      {products.length > 0 ? (
        <div className="horizontal-scroll-container">
          {products.map((product) => (
            <LuxuryCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No products available for this brand.
        </p>
      )}
    </div>
  );
}

export default LuxuryPage;
