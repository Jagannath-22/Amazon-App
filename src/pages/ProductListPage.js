import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Filter/sort products on state change
  useEffect(() => {
    let filtered = [...products];

    // 🔍 Search
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 📂 Category
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // 📊 Sort
    if (sortOption === "priceLow") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) =>
        b.createdAt?.seconds - a.createdAt?.seconds
      );
    }

    setFilteredProducts(filtered);
  }, [products, category, sortOption, searchTerm]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛍️ Browse Products</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginBottom: "1rem" }}
      />

      {/* 🧃 Filters */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="home">Home & Kitchen</option>
          </select>
        </label>

        <label style={{ marginLeft: "2rem" }}>
          Sort by:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="">None</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      {/* 🧾 Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid gray",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
              />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <p>{product.rating} ⭐</p>
              <p><strong>Available: {product.quantity || "Out of stock"}</strong></p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "18px", color: "gray" }}>
            ❌ No products found. Try changing your search or filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
