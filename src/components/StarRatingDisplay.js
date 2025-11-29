// src/components/StarRatingDisplay.js
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function StarRatingDisplay({ avgRating, totalRatings, onClick }) {
  const numericAvgRating = parseFloat(avgRating);
  const effectiveAvgRating = isNaN(numericAvgRating) ? 0 : numericAvgRating;
  const hasRatings = totalRatings > 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a decimal part

    for (let i = 0; i < 5; i++) { // Loop 5 times for 5 stars
      if (i < fullStars) {
        // Render full yellow stars
        stars.push(<StarIcon key={`star-full-${i}`} className="text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        // Render a half yellow star at the correct position
        stars.push(<StarHalfIcon key={`star-half-${i}`} className="text-yellow-500" />);
      } else {
        // Render empty gray stars for the rest
        stars.push(<StarIcon key={`star-empty-${i}`} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={onClick}
      title={hasRatings ? `${effectiveAvgRating.toFixed(1)} out of 5 stars based on ${totalRatings} ratings` : "No ratings yet"}
    >
      {hasRatings && (
        <span className="text-xl font-bold">{effectiveAvgRating.toFixed(1)}</span>
      )}
      <div className="flex">
        {renderStars(effectiveAvgRating)}
      </div>
      {hasRatings ? (
        <span className="text-gray-600 text-sm">
          ({totalRatings.toLocaleString()} global ratings)
        </span>
      ) : (
        <span className="text-gray-500 text-sm">No ratings yet</span>
      )}
    </div>
  );
}

export default StarRatingDisplay;