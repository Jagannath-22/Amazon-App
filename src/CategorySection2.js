import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./CategorySection.css";
import allProducts from "./data/products";
import Product from "./Product";


const categoryIds = [
  {
    id: "home-style",
    title: "Revamp your home in style",
    linkText: "Explore all",
    linkUrl: "/category/home-style",
  },
  {
    id: "footwear-handbags",
    title: "Up to 60% off | Footwear & handbags",
    linkText: "See all offers",
    linkUrl: "/category/footwear-handbags",
  },
  {
    id: "home-improvement",
    title: "Under ₹499 | Deals on home improvement essentials",
    linkText: "Explore all",
    linkUrl: "/category/home-improvement",
  },
];

function CategorySection2() {
  const [{ viewedProducts }, dispatch] = useStateValue();
  const [productsByCategory, setProductsByCategory] = useState({});

  

  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const grouped = {};
      categoryIds.forEach((cat) => {
        grouped[cat.id] = allProducts.filter((p) => p.category === cat.id);
      });
      setProductsByCategory(grouped);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    dispatch({ type: "ADD_TO_VIEWED", item: product });
    dispatch({ type: "INCREMENT_VIEW_COUNT", id: product.id });
  };

  return (
    <div className="category-section-container">
      <div className="category-scroll-wrapper">
        <div className="scrollable-grid">
          {categoryIds.map((cat) => (
            <motion.div
              key={cat.id}
              className="category-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="category-box__title">{cat.title}</h2>
              <div className="category-box__products-grid">
                {(productsByCategory[cat.id] || []).slice(0, 4).map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    key={product.id}
                    className="category-product-item"
                    onClick={() => handleProductClick(product)}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="category-product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/150x150?text=No+Image";
                        }}
                      />
                      <p className="category-product-title">{product.title}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
              <Link to={cat.linkUrl} className="category-box__link">
                {cat.linkText}
              </Link>
            </motion.div>
          ))}

          {/* Recently Viewed Section */}
          {viewedProducts.length > 0 && (
            <motion.div
              className="category-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="category-box__title">Recently Viewed</h2>
              <div className="category-box__products-grid category-recently-viewed">
                {viewedProducts.slice(-8).reverse().map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    key={product.id}
                    className="category-product-item"
                    onClick={() => handleProductClick(product)}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="category-product-image"
                      />
                      <p className="category-product-title">{product.title}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
              <Link to="/recently-viewed" className="category-box__link">
                View all
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorySection2;
