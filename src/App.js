// src/App.js
// import logo from './logo.svg';
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login"; // import the Login component
import PrivacyNotice from "./PrivacyNotice"; // Assuming this is a component you have
import React, { useEffect, Suspense, useState } from "react";
// Import firebase auth and db instances
import { auth, db } from "./firebase"; // Adjust the path if needed

// Import StateProvider's components
// Make sure StateSync is explicitly imported if it's not the default export
import { useStateValue, StateSync } from "./StateProvider";

import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Orders from "./Orders"; // Orders.js (main orders page)
import ProductPage from "./ProductPage";
import LikedProducts from "./LikedProducts";
import SecondaryNavbar from "./SecondaryNavbar";
import DummyPage from "./DummyPage";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import Footer from "./Footer"; // Assuming you want a global footer

// Admin specific imports
import AdminRoute from "./components/routes/AdminRoute";
import AdminPanel from "./pages/AdminPanel";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UserOrders from "./pages/UserOrders";
import ManageOrders from "./pages/ManageOrders";
import ProductListPage from "./pages/ProductListPage"; // If used instead of AllProducts
import AllProducts from "./pages/AllProducts";
import SearchPage from "./pages/SearchPage";
import LuxuryPage from "./LuxuryPage";

// Stripe Public Key - MAKE SURE THIS IS A TEST KEY FOR DEVELOPMENT
const stripePromise = loadStripe(
  "pk_test_51Rdt2aQf9sxHSoJtsr2CydLFCyda3ScinvFyCAh66ngVrMUrrKJoYAKZaeg2NcTWHmfnwixG16FwneW14lKN4DLE00iNDZLVHo"
);

function App() {
  const [{}, dispatch] = useStateValue();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // 🚨 WARNING: You have multiple identical auth.onAuthStateChanged listeners.
  // While this might not break functionality, it's redundant and best practice
  // is to have only one. I am keeping yours as is, as per your request.

  // Your first onAuthStateChanged useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: "SET_USER",
        user: authUser,
      });
    });
    return () => unsubscribe();
  }, []);

  // Your second onAuthStateChanged useEffect
  useEffect(() => {
    // Listen to Firebase auth state change
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User just logged in or was already logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // User logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);

  // Your third onAuthStateChanged useEffect (this one has the console.log)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []); // Add empty dependency array so it runs only once

  return (
    <Router>
      <div className="app">
        {/* Header and Secondary Navbar are outside Routes so they appear on all pages */}
        <Header />
        <SecondaryNavbar onToggleSidebar={toggleSidebar} />

        {/* The Sidebar component, passing its state and close function */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* StateSync component: Crucial for syncing Redux state with Firebase/localStorage.
            It must be rendered within the StateProvider's scope (which App.js implies). */}
        <StateSync />

        {/* ALL ROUTES MUST BE INSIDE A SINGLE <Routes> BLOCK */}
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<Home />} />

          {/* Dummy Pages from SecondaryNavbar */}
          <Route
            path="/prime-deals"
            element={<DummyPage pageName="Prime Day Deals" />}
          />
          <Route path="/fresh" element={<DummyPage pageName="Fresh" />} />
          <Route
            path="/keep-shopping"
            element={<DummyPage pageName="Keep Shopping" />}
          />
          <Route path="/sell" element={<DummyPage pageName="Sell" />} />
          <Route
            path="/mx-player"
            element={<DummyPage pageName="MX Player" />}
          />
          <Route
            path="/buy-again"
            element={<DummyPage pageName="Buy Again" />}
          />
          <Route
            path="/gift-cards"
            element={<DummyPage pageName="Gift Cards" />}
          />
          <Route
            path="/kindle-ebooks"
            element={<DummyPage pageName="Kindle E-books" />}
          />
          <Route
            path="/Browse-history"
            element={<DummyPage pageName="Browse History" />}
          />
          <Route
            path="/amazon-pay"
            element={<DummyPage pageName="Amazon Pay" />}
          />
          <Route
            path="/my-amazon"
            element={<DummyPage pageName="My Amazon" />}
          />

          {/* Sidebar Dummy Routes */}
          <Route
            path="/bestsellers"
            element={<DummyPage pageName="Bestsellers" />}
          />
          <Route
            path="/new-releases"
            element={<DummyPage pageName="New Releases" />}
          />
          <Route
            path="/movers-shakers"
            element={<DummyPage pageName="Movers and Shakers" />}
          />
          <Route
            path="/echo-alexa"
            element={<DummyPage pageName="Echo & Alexa" />}
          />
          <Route path="/fire-tv" element={<DummyPage pageName="Fire TV" />} />
          <Route
            path="/audible-audiobooks"
            element={<DummyPage pageName="Audible Audiobooks" />}
          />
          <Route
            path="/prime-video"
            element={<DummyPage pageName="Amazon Prime Video" />}
          />
          <Route
            path="/prime-music"
            element={<DummyPage pageName="Amazon Prime Music" />}
          />
          <Route
            path="/mobiles-computers"
            element={<DummyPage pageName="Mobiles, Computers" />}
          />
          <Route
            path="/tv-appliances"
            element={<DummyPage pageName="TV, Appliances, Electronics" />}
          />
          <Route
            path="/mens-fashion"
            element={<DummyPage pageName="Men's Fashion" />}
          />
          <Route
            path="/womens-fashion"
            element={<DummyPage pageName="Women's Fashion" />}
          />
          <Route
            path="/kids-fashion"
            element={<DummyPage pageName="Kids' Fashion" />}
          />
          <Route
            path="/home-kitchen"
            element={<DummyPage pageName="Home & Kitchen" />}
          />
          <Route
            path="/beauty-health-grocery"
            element={<DummyPage pageName="Beauty, Health, Grocery" />}
          />
          <Route path="/books" element={<DummyPage pageName="Books" />} />
          <Route
            path="/sports-fitness-outdoors"
            element={<DummyPage pageName="Sports, Fitness & Outdoors" />}
          />
          <Route
            path="/toys-games"
            element={<DummyPage pageName="Toys & Games" />}
          />
          <Route
            path="/automotive"
            element={<DummyPage pageName="Automotive" />}
          />
          <Route
            path="/industrial-scientific"
            element={<DummyPage pageName="Industrial & Scientific" />}
          />

          {/* Main Functional Routes */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-notice" element={<PrivacyNotice />} />
<Route path="/payment" element={<Payment />} />
         

          {/* 🔒 Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute user={auth.currentUser}>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <AdminRoute user={auth.currentUser}>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:productId"
            element={
              <AdminRoute user={auth.currentUser}>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute user={auth.currentUser}>
                <ManageOrders />
              </AdminRoute>
            }
          />

          {/* User/Product Pages */}
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/liked" element={<LikedProducts />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/luxury/:brandId" element={<LuxuryPage />} />

          {/* Product Listing Pages */}
          <Route path="/products" element={<AllProducts />} />
          {/* <Route path="/products" element={<ProductListPage />} /> */} {/* Use one or the other */}
        </Routes>

        {/* Footer is also outside Routes if it should appear on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;