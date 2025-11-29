import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { collection, getDocs } from "firebase/firestore";

const UserOrders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const userOrdersRef = collection(db, "users", user.uid, "orders");
      const orderSnapshot = await getDocs(userOrdersRef);

      const orderList = orderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderList);
    };

    fetchOrders();
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
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
            <p>Status: <strong>{order.status}</strong></p>
            <p>Total: ₹{(order.amount / 100).toFixed(2)}</p>
            <p>Time: {new Date(order.created * 1000).toLocaleString()}</p>
            <ul>
              {order.basket.map((item) => (
                <li key={item.id}>
                  {item.title} × {item.quantity || 1} — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
