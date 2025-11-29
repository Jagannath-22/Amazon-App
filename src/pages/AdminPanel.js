import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      await deleteDoc(doc(db, "products", id));
      alert("✅ Product deleted!");
      fetchProducts(); // Refresh product list
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👑 Admin Panel</h1>

      {/* Admin action buttons */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link to="/admin/add">
          <button style={{ marginRight: "1rem" }}>➕ Add Product</button>
        </Link>
        <Link to="/admin/orders">
          <button>📦 Manage Orders</button>
        </Link>
      </div>

      {/* Product List */}
      <div>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid gray",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100px", height: "auto" }}
              />
              <br />
              <Link to={`/admin/edit/${product.id}`}>
                <button>✏️ Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                style={{ marginLeft: "1rem", color: "red" }}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
