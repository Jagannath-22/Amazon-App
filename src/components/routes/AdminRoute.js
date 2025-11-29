// src/components/routes/AdminRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import checkAdminStatus from "../../utils/isAdmin";

const AdminRoute = ({ user, children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (user && user.email) {
        const result = await checkAdminStatus(user.email);
        setIsAdmin(result);
      } else {
        setIsAdmin(false);
      }
    };

    verify();
  }, [user]);

  if (isAdmin === null) return <div>Checking admin access...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
