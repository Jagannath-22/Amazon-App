import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider"; // ✅ Global state
import "./CategorySection.css";

const categoryBoxes = [
  {
    id: "home-style",
    title: "Revamp your home in style",
    type: "products",
    products: [
      {
        id: "prod-101",
        title: "Cushion covers, bedsheets & more",
        price: 199,
        rating: 4.5,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_furnishings_2._SY232_CB555629502_.jpg",
      },
      {
        id: "prod-102",
        title: "Figurines, vases & more",
        price: 199,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_decor_1._SY232_CB555629502_.jpg",
      },
      {
        id: "prod-103",
        title: "Home storage",
        price: 199,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_storage_1._SY232_CB555629502_.jpg",
      },
      {
        id: "prod-104",
        title: "Lighting solutions",
        price: 199,
        rating: 4,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_lighting_2_-_Copy._SY232_CB555629502_.jpg",
      },
    ],
    linkText: "Explore all",
    linkUrl: "/category/home",
  },
  {
    id: "footwear-handbags",
    title: "Up to 60% off | Footwear & handbags",
    type: "products",
    products: [
      {
        id: "prod-201",
        title: "Sports shoes",
        price: 399,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/Sports_hi._SY232_CB541153107_.jpg",
      },
      {
        id: "prod-202",
        title: "Men's shoes",
        price: 299,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/Shoes_Hi._SY232_CB541153107_.jpg",
      },
      {
        id: "prod-203",
        title: "Women's shoes",
        price: 399,
        rating: 4.5,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/Heels_Hi._SY232_CB541153106_.jpg",
      },
      {
        id: "prod-204",
        title: "Handbags",
        price: 499,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/HB_Hi._SY232_CB541153106_.jpg",
      },
    ],
    linkText: "See all offers",
    linkUrl: "/category/footwear-handbags",
  },
  {
    id: "home-improvement",
    title: "Under ₹499 | Deals on home improvement essentials",
    type: "products",
    products: [
      {
        id: "prod-301",
        title: "Cleaning supplies",
        price: 199,
        image:
          "https://m.media-amazon.com/images/I/712IgUo8fjL._AC_UY436_FMwebp_QL65_.jpg",
      },
      {
        id: "prod-302",
        title: "Bathroom accessories",
        price: 199,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/2025/March/Shower_head__hi-res_v3._SY232_CB549134196_.jpg",
      },
      {
        id: "prod-303",
        title: "Home tools",
        price: 199,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/2025/March/Tools__hi-res_v3._SY232_CB549134196_.jpg",
      },
      {
        id: "prod-304",
        title: "Wallpapers",
        price: 199,
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/2025/March/Wallpapers__hi-res_v3._SY232_CB549134196_.jpg",
      },
    ],
    linkText: "Explore all",
    linkUrl: "/category/home-improvement",
  },
  {
    id: "video-promo",
    title: "Up to 60% off | Furniture & mattresses",
    type: "video",
    videoUrl:
      "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ",
    linkText: "Shop now",
    linkUrl: "/category/furniture",
  },
];

function CategorySection() {
  const [{}, dispatch] = useStateValue();

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

  const handleProductClick = (product) => {
    dispatch({ type: "ADD_TO_VIEWED", item: product });
    dispatch({ type: "INCREMENT_VIEW_COUNT", id: product.id });
  };

  return (
    <div className="category-section-container">
      <div className="category-scroll-wrapper">
        <div className="scrollable-grid">
          {categoryBoxes
            .filter((box) => box.type !== "video")
            .map((box) => (
              <motion.div
                key={box.id}
                className="category-box"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 className="category-box__title">{box.title}</h2>
                <div className="category-box__products-grid">
                  {box.products.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      state={{ product, hidePrice: true }}
                      key={product.id}
                      className="category-product-item"
                      onClick={() => handleProductClick(product)} // ✅ view count logic
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
                            e.target.src =
                              "https://placehold.co/150x150?text=No+Image";
                          }}
                        />
                        <p className="category-product-title">
                          {product.title}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                <Link to={box.linkUrl} className="category-box__link">
                  {box.linkText}
                </Link>
              </motion.div>
            ))}
        </div>

        <div className="fixed-video-box ">
          {categoryBoxes
            .filter((box) => box.type === "video")
            .map((box) => (
              <div key={box.id} className="category-box video-box">
                <h2 className="category-box__title">{box.title}</h2>
                <div className="category-box__video-container">
                  <iframe
                    src={box.videoUrl}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Promotional Video"
                    className="category-box__video"
                  ></iframe>
                </div>
                <Link to={box.linkUrl} className="category-box__link">
                  {box.linkText}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
