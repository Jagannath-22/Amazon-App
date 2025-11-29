import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collectionGroup,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const ordersSnapshot = await getDocs(collectionGroup(db, "orders"));
      const allOrders = [];

      for (const docSnap of ordersSnapshot.docs) {
        const data = docSnap.data();
        const pathSegments = docSnap.ref.path.split("/");
        const userId = pathSegments[1]; // users/{userId}/orders/{orderId}

        allOrders.push({
          id: docSnap.id,
          userId,
          ...data,
        });
      }

      setOrders(allOrders);
    };

    fetchAllOrders();
  }, []);

  const updateStatus = async (userId, orderId, newStatus) => {
    const orderRef = doc(db, "users", userId, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });

    // Update local state
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId && order.userId === userId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 Manage All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <h4>Order ID: {order.id}</h4>
            <p>User ID: {order.userId}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Total: ₹{(order.amount / 100).toFixed(2)}</p>
            <p>Time: {new Date(order.created * 1000).toLocaleString()}</p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order.userId, order.id, e.target.value)
              }
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <ul>
              {order.basket.map((item) => (
                <li key={item.id}>
                  {item.title} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageOrders;
