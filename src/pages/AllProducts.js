// src/pages/AllProducts.js

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛍️ All Products</h2>

      <input
        type="text"
        placeholder="Search by title or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-6 border rounded"
      />

      {loading ? (
        <p className="text-gray-700">⏳ Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-red-600 text-lg">❌ No matching product found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={product.image || product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600 font-medium">₹{product.price}</p>
              <p className="text-yellow-600">{product.rating} ⭐</p>
              <p className="text-blue-600 capitalize">{product.category}</p>
              <p className="mt-2 font-medium text-green-700">
                {product.quantity > 0
                  ? `${product.quantity} item(s) available`
                  : product.quantity === 0
                  ? "Out of stock"
                  : "In stock"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
