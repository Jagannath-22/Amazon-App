// src/ProductInfo.js
import React from 'react';
// Remove StarIcon and StarHalfIcon imports from here
// import StarIcon from '@mui/icons-material/Star';
// import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarRatingDisplay from './components/StarRatingDisplay'; // Import the new component
import './ProductPage.css';
import { getAverageRating, getRatingDistribution } from './utils/getAverageRating';

function ProductInfo({ product, onRatingClick }) { // Ensure onRatingClick is passed down
  // Access reviews directly from the product prop
  const reviews = product.reviews || [];
  const hasReviews = reviews.length > 0;
  const avg = hasReviews ? getAverageRating(reviews) : 0; // Default to 0 if no reviews
  const total = reviews.length; // Total count of reviews

  // We no longer need 'dist' here if the distribution bars are only in ProductReviews
  // const dist = hasReviews ? getRatingDistribution(reviews) : {};

  return (
    <>
      {/* Title */}
      <h1 className="productPage__title text-2xl font-semibold mb-2">{product.title}</h1>

      {/* Description */}
      {product.description && (
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
      )}

      {/* Rating Section - Use the new StarRatingDisplay component */}
      <div className="productPage__reviewBlock mb-4">
        <StarRatingDisplay
          avgRating={avg}
          totalRatings={total}
          onClick={onRatingClick} // Pass the click handler to scroll
        />
        {/* Remove the old star rendering loop and distribution bars from here */}
        {/*
        <div className="text-xl font-bold flex items-center gap-2">
          {typeof avg === "number" && <span>{avg.toFixed(1)}</span>}
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={
                typeof avg === "number"
                  ? i < Math.floor(avg)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                  : 'text-gray-300'
              }
            />
          ))}
          {hasReviews && (
            <span className="text-gray-600 text-sm">
              ({reviews.length} global ratings)
            </span>
          )}
        </div>
        {hasReviews ? (
          // ... rating distribution bars ...
        ) : (
          <div className="text-gray-500 text-sm mt-1">No ratings yet</div>
        )}
        */}
      </div>

      {/* Price Section */}
      <hr className="productPage__divider" />
      <div className="productPage__priceSection">
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="productPage__originalPrice text-sm text-gray-600">
            M.R.P.: <span className="line-through">₹{product.originalPrice}</span>
          </div>
        )}
        <div className="productPage__currentPrice text-2xl font-semibold">
          ₹{product.price}
        </div>
        <div className="text-sm text-gray-600">Inclusive of all taxes</div>
        <div className="text-sm text-green-600">
          EMI starts at ₹{Math.ceil(product.price / 12)}
        </div>
      </div>
      <hr className="productPage__divider" />
    </>
  );
}

export default ProductInfo;