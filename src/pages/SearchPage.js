// src/pages/SearchPage.js

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Product from "../Product";
import products from "../data/products";
import { luxuryProducts } from "../data/luxuryProducts";
import Fuse from "fuse.js";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAndSearch = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const firebaseProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const localProducts = products || [];

        // 🧠 Normalize luxury products
        const luxuryList = Object.entries(luxuryProducts).flatMap(([brand, items]) =>
          items.map((item) => ({
            ...item,
            category: brand,
          }))
        );

        const allProducts = [
          ...firebaseProducts,
          ...localProducts,
          ...luxuryList,
        ];

        const directResults = allProducts.filter(
          (p) =>
            p.title?.toLowerCase().includes(query) ||
            p.category?.toLowerCase().includes(query)
        );

        if (directResults.length > 0) {
          setResults(directResults);
        } else {
          const fuse = new Fuse(allProducts, {
            keys: ["title", "category"],
            threshold: 0.4,
          });

          const fuzzyResults = fuse.search(query).map((res) => res.item);
          setResults(fuzzyResults);
        }
      } catch (err) {
        console.error("🔥 Firestore Error:", err.message);

        const fallbackList = Object.entries(luxuryProducts).flatMap(([brand, items]) =>
          items.map((item) => ({
            ...item,
            category: brand,
          }))
        ).concat(products);

        const fuse = new Fuse(fallbackList, {
          keys: ["title", "category"],
          threshold: 0.4,
        });

        const fuzzyResults = fuse.search(query).map((res) => res.item);
        setResults(fuzzyResults);
      }
    };

    fetchAndSearch();
  }, [query]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h2>

      {results.length === 0 ? (
        <p>No products found. Try another keyword.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
