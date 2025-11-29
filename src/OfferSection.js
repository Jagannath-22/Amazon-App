import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider"; // Global state provider
import "./OfferSection.css";
import OfferAnimatedText from "./OfferAnimatedText";

// Right-side carousel images (auto-sliding)
const heroCarouselImages = [
  "https://images.unsplash.com/photo-1662289032144-3ed681fdd260?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3J5JTIwbHV4dXJ5JTIwd2lkZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1619344373073-e05357c9612d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWNjZXNzb3J5JTIwbHV4dXJ5JTIwd2lkZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1680770733998-dd4b09866450?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFjY2Vzc29yeSUyMGx1eHVyeSUyMHdpZGV8ZW58MHx8MHx8fDA%3D",
];

// Products shown in the grid
const products = [
  {
    id: 34567,
    title: "Victorinox Maverick Analogue Men's Stainless Steel Watch",
    price: 888.88,
    rating: 4,
    image: "https://m.media-amazon.com/images/I/71S7H0cByHL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71S7H0cByHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61R4LjfnTpL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71c5I1ZmhoL._SX679_.jpg",
    ],
  },
  {
    id: "design-2",
    title: "Samsung s23Ultra",
    creator: "Gert van Duinen",
    image: "https://m.media-amazon.com/images/I/81M4zm2+0FL._AC_UY327_.jpg",
    images:["https://m.media-amazon.com/images/I/81M4zm2+0FL._AC_UY327_.jpg",
      
      "https://m.media-amazon.com/images/I/71BDxEZiocL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71TSysiBmrL._SX679_.jpg"
    ],
    rating: 5,
    price: 199.99,
  },
  // ... add more products as needed
  
  {
    id: "design-5",
    title: "Vibrant UI Kit",
    creator: "Jane Doe",
    image: "https://m.media-amazon.com/images/I/71S7H0cByHL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71S7H0cByHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61R4LjfnTpL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71c5I1ZmhoL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71c5I1ZmhoL._SX679_.jpg",
    ],
    price: 99.99,
    rating: 4,
  },
  {
    id: "design-5",
    title: "Ralph Lauren",
    creator: "Jane Doe",
    image: "https://m.media-amazon.com/images/I/61M7p9nd6iL._SX522_.jpg",
    images:[, "https://m.media-amazon.com/images/I/61M7p9nd6iL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/71eXH-b3bVL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41qyQLeRKKL._SX38_SY50_CR,0,0,38,50_.jpg",
      "https://m.media-amazon.com/images/I/71eXH-b3bVL._SL1500_.jpg",
      ""
    ],
    price: 99.99,
    rating: 4,
  },
  {
    id: "design-5",
    title: "Ralph Lauren",
    creator: "Jane Doe",
    image: "https://placehold.co/400x300/ADD8E6/000000?text=UI+Kit",
    price: 99.99,
    rating: 4,
  },
  {
    id: "design-5",
    title: "Vibrant UI Kit",
    creator: "Jane Doe",
    image: "https://placehold.co/400x300/ADD8E6/000000?text=UI+Kit",
    price: 99.99,
    rating: 4,
  },

  {
    id: "1234567L",
    title: "Ferrero Rocher, 16 Pieces, 200 gm",
    price: 55.55,
    rating: 5,
    image:
      "https://m.media-amazon.com/images/I/41M9PCZHrCL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 1275969,
    title: "Louis Vuitton: The Icons and the Iconoclasts",
    price: 4444.0,
    rating: 5,
    image: "https://m.media-amazon.com/images/I/81d00WG-TyL._SL1500_.jpg",
  },
  {
    id: 98685658,
    title: "Lyrovo Canvas Tote Bag for Women Purse Handbag",
    price: 11.11,
    rating: 5,
    image: "https://m.media-amazon.com/images/I/814kOm8nIOL._SY695_.jpg",
  },
];

function OfferSection() {
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0); // Carousel index
  const [clickCounts, setClickCounts] = useState({}); // Tracks how many times each product is clicked

  const [{ likedProducts = [] }, dispatch] = useStateValue(); // Access global state
  // / ✅ Check if a product is already liked
  const isProductLiked = (productId) =>
    likedProducts.some((item) => item.id === productId);

  // Auto-slide hero images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImageIndex(
        (prev) => (prev + 1) % heroCarouselImages.length
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Like handler — dispatches to global LIKE_PRODUCT
  const handleLike = (e, product) => {
    e.preventDefault(); // Prevent link click
    dispatch({ type: "ADD_TO_LIKED", item: product });
  };

  // Save handler — dispatches to ADD_TO_BASKET
  const handleSave = (e, product) => {
    e.preventDefault(); // Prevent link click
    dispatch({ type: "ADD_TO_BASKET", item: product });
  };

  // Product click — triggers view count and redirects to product page
  const handleProductClick = (product) => {
    // Local view count update (for UI display on OfferSection cards)
    setClickCounts((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));

    // Add to viewed list (for MostViewedProduct)
    dispatch({ type: "ADD_TO_VIEWED", item: product });

    // Increment global view count (so that homepage sorts them)
    dispatch({ type: "INCREMENT_VIEW_COUNT", id: product.id });
  };

  // Framer motion card animation on hover/tap
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

  // Black overlay animation on hover
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  // Icon entrance animation
  const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, staggerChildren: 0.05 },
    },
  };

  return (
    <div className="offer-section-container">
      {/* Right-side auto-sliding hero box */}

      
      <div
        className="offer-hero-section"
        
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "40px",
        }}
        
      >
<OfferAnimatedText />



        
        <div className="offer-hero-right">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroImageIndex}
              src={heroCarouselImages[currentHeroImageIndex]}
              alt={`Hero Image ${currentHeroImageIndex + 1}`}
              className="offer-hero-carousel-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400?text=Image+Unavailable";
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="offer-products-grid">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="offer-product-card"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {/* Clicking this link takes you to ProductPage.js */}

            <Link
              to={`/product/${product.id}`}
              state={{ product }}
              className="offer-product-link"
              onClick={() => handleProductClick(product)}
            >
              {/* Image with overlay icons on hover */}
              <div className="offer-product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="offer-product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x300?text=Image+Unavailable";
                  }}
                />
                {/* Hover overlay */}
                <motion.div
                  className="offer-product-image-overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  whileHover="visible"
                >
                  <motion.div
                    className="offer-product-overlay-content"
                    variants={iconVariants}
                  >
                    {/* Save icon (adds to basket) */}
                    <button
                      className="overlay-icon-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSave(e, product);
                      }}
                    >
                      <span className="material-icons">bookmark_border</span>
                    </button>

                    {/* Like icon (adds to liked products) */}
                    <button
                      className="overlay-icon-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLike(e, product);
                      }}
                    >
                      <span
                        className="material-icons"
                        style={{
                          color: isProductLiked(product.id)
                            ? "#e91e63"
                            : "white",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {isProductLiked(product.id)
                          ? "favorite"
                          : "favorite_border"}
                      </span>
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Product title, creator, stats */}
              <div className="offer-product-info">
                {/*  Price tag at the top-left */}
                <div>
                  <h3 className="offer-product-title">{product.title}</h3>₹
                  {product.price}
                </div>

                {/* Stats Row */}
                <div className="offer-product-stats">
                  {/* ❤️ Like count */}
                  <span className="offer-product-stat-item">
                    <span className="material-icons">favorite</span>{" "}
                    {product.likes}
                  </span>

                  {/* 🌟 Star Rating */}
                  <span className="offer-product-stat-item product__rating">
                    {Array(product.rating || 4)
                      .fill()
                      .map((_, i) => (
                        <span key={i}>🌟</span>
                      ))}
                  </span>

                  {/* 👆 Click/View count */}
                  <span className="offer-product-stat-item">
                    <span className="material-icons">touch_app</span>{" "}
                    {clickCounts[product.id] || 0}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default OfferSection;
