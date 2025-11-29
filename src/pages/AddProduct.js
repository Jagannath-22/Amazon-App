// src/pages/AddProduct.js

import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("electronics");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);


  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !price || !imageFile) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        title,
        price: parseFloat(price),
        rating,
        category,
        quantity, // ← You can later make this a dynamic input too
        imageUrl,
        createdAt: new Date(),
      });



      
      alert("✅ Product added!");
      navigate("/admin");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Product</h2>
      <form onSubmit={handleAdd} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="home">Home & Kitchen</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />

         <input
    type="number"
    min="1"
    placeholder="Quantity"
    value={quantity}
    onChange={(e) => setQuantity(Number(e.target.value))}
    className="w-full p-2 border rounded"
  />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
