// src/Product.js
import React from "react";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StarRatingDisplay from './components/StarRatingDisplay'; // <--- Import the StarRatingDisplay component
import "./Product.css";

function Product({
  id,
  title,
  image,
  price,
  rating = 4.5, // Default rating is okay for initial state, but we'll use actual reviews if available
  reviews = [], // <--- IMPORTANT: Add reviews as a prop with a default empty array
  images = [],
  isSponsored = false,
  mrp,
  discountPercentage,
  boughtInMonth,
  deliveryDate,
  productDescription,
  viewCount, // This seems to be used for rating count, will adjust
}) {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // Calculate avgRating and totalRatings from the 'reviews' prop
  // If 'reviews' array is empty, totalRatings will be 0 and avgRating will be 0.
  const totalRatings = reviews.length;
  const avgRating = totalRatings > 0
    ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings
    : 0;

  const addToBasket = () => {
    if (!user) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating, // Keep original rating if your basket logic uses it, but display avgRating
        quantity: 1,
      },
    });
  };

  // Prepare product details to be passed to the ProductPage
  // Make sure to include 'reviews' here so ProductInfo on ProductPage can use it.
  const productDetails = {
    id,
    title,
    image,
    images,
    price,
    rating: avgRating, // Pass the calculated average rating to ProductPage
    reviews: reviews, // <--- Pass the full reviews array to ProductPage
    mrp,
    discountPercentage,
    boughtInMonth,
    deliveryDate,
    isSponsored,
    description:
      productDescription || "This is a detailed description for " + title,
  };

  // Removed the local renderStars function as we'll use StarRatingDisplay instead
  // const renderStars = () => { /* ... existing logic ... */ };

  return (
    <div className="product">
      {isSponsored && (
        <div className="product__sponsored-container">
          <span className="product__sponsored">
            Sponsored <span className="product__sponsored-info-icon">ⓘ</span>
          </span>
        </div>
      )}

      <div className="product__content">
        <Link
          to={`/product/${id}`}
          state={{ product: productDetails }} // Pass productDetails, including reviews
          className="product__image-link"
        >
          <img
            src={image || "/fallback.jpg"}
            alt={title}
            className="product__image"
          />
        </Link>

        <div className="product__details">
          <Link
            to={`/product/${id}`}
            state={{ product: productDetails }} // Pass productDetails, including reviews
            className="product__title-link"
          >
            <h3 className="product__title">{title}</h3>
          </Link>

          {/* Use the StarRatingDisplay component here */}
          <div className="product__rating-area">
            <StarRatingDisplay
              avgRating={avgRating} // Use the calculated average rating
              totalRatings={totalRatings} // Use the total number of reviews
              // onClick is optional here, usually not needed on product grid items
            />
          </div>

          {boughtInMonth && (
            <p className="product__boughtInMonth">
              <span className="product__boughtInMonth-value">
                {boughtInMonth}
              </span>{" "}
              bought in past month
            </p>
          )}

          <div className="product__price-section">
            <p className="product__currentPrice">
              <span className="product__currency-symbol">₹</span>
              <strong className="product__price-value">
                {price.toLocaleString("en-IN")}
              </strong>
            </p>
            {mrp && (
              <p className="product__mrp">
                M.R.P.:{" "}
                <s className="product__originalPrice-value">
                  ₹{mrp.toLocaleString("en-IN")}
                </s>
              </p>
            )}
            {discountPercentage && (
              <p className="product__discount-percentage">
                ({discountPercentage}% off)
              </p>
            )}
          </div>

          <p className="product__cashback">
            Up to 5% back with Amazon Pay ICICI C...
          </p>

          {deliveryDate && (
            <p className="product__deliveryDate">
              <span className="product__deliveryDate-bold">FREE delivery</span>{" "}
              {deliveryDate}
            </p>
          )}

          <p className="product__service">Service: Installation</p>

          <div className="product__actions">
            <button onClick={addToBasket} className="product__addToCartButton">
              Add to cart
            </button>
            <Link
              to={`/product/${id}/colors`}
              className="product__otherColorsLink"
            >
              +1 other color/pattern
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;