// src/components/ProductReviewSummary.js
import React from "react";
import StarIcon from "@mui/icons-material/Star";

const calculatePercentages = (reviews = []) => {
  const total = reviews.length || 1;
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    const index = 5 - r.rating;
    counts[index]++;
  });
  return counts.map((count) => Math.round((count / total) * 100));
};

function ProductReviewSummary({ product }) {
  const reviews = product.reviews || [];
  const totalRatings = reviews.length;
  const avgRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (totalRatings || 1);
  const starPercentages = calculatePercentages(reviews);

  return (
    <div className="bg-white shadow rounded p-4 my-4">
      <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
      <div className="flex items-center mb-2">
        <span className="text-2xl font-bold mr-2">{avgRating.toFixed(1)}</span>
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={
                i < Math.round(avgRating) ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{totalRatings} global ratings</span>
      </div>

      <div className="space-y-1">
        {[5, 4, 3, 2, 1].map((star, i) => (
          <div key={star} className="flex items-center text-sm text-gray-700">
            <span className="w-10">{star} star</span>
            <div className="w-full bg-gray-200 h-2 rounded mx-2">
              <div
                className="h-2 bg-yellow-400 rounded"
                style={{ width: `${starPercentages[5 - star]}%` }}
              ></div>
            </div>
            <span className="w-8 text-right">{starPercentages[5 - star]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviewSummary;
