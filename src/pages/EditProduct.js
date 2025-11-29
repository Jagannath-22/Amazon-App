// src/pages/EditProduct.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductData(docSnap.data());
      } else {
        alert("Product not found!");
        navigate("/admin");
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "products", productId);

    if (newImage) {
      const storageRef = ref(storage, `products/${newImage.name}`);
      await uploadBytes(storageRef, newImage);
      const imageUrl = await getDownloadURL(storageRef);
      productData.image = imageUrl;
    }

    await updateDoc(docRef, productData);
    alert("Product updated!");
    navigate("/admin");
  };

  if (!productData) return <div>Loading product...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
        />
        <br />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <br />
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <br />
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <br />
        <input type="file" onChange={handleImageChange} />
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
