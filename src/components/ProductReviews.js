// src/ProductReviews.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
// StarIcon is still needed for the individual review stars, but not for the average display
import StarIcon from "@mui/icons-material/Star";
import StarRatingDisplay from './StarRatingDisplay'; // Import the new StarRatingDisplay component

function ProductReviews({ productId }) {
  const [{ user }] = useStateValue();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const snap = await getDoc(doc(db, "products", productId));
        if (snap.exists()) setReviews(snap.data().reviews || []);
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user)
      return navigate("/login", { state: { from: location.pathname } });
    // IMPORTANT: Replaced alert() with a custom message box or modal for better UX in an iframe environment.
    // For this example, I'll use a console log and return, but you should implement a proper UI for this.
    if (!rating || !comment.trim()) {
      console.log("Please fill in both rating and comment fields!");
      // You would show a user-friendly modal/message here instead of alert()
      return;
    }

    const newReview = {
      userName: user.email.split("@")[0],
      rating: parseInt(rating),
      comment,
      date: new Date().toISOString(),
    };

    try {
      const docRef = doc(db, "products", productId);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        await updateDoc(docRef, { reviews: arrayUnion(newReview) });
      } else {
        await setDoc(docRef, { reviews: [newReview] });
      }

      setReviews((prev) => [...prev, newReview]);
      setRating("");
      setComment("");
    } catch (err) {
      console.error("Error submitting review", err);
    }
  };

  // Rating summary calculation
  const totalRatings = reviews.length;
  const avgRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (totalRatings || 1);

  const calculatePercentages = (reviews = []) => {
    const total = reviews.length || 1;
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      const index = 5 - r.rating;
      counts[index]++;
    });
    return counts.map((count) => Math.round((count / total) * 100));
  };

  const starPercentages = calculatePercentages(reviews);

  return (
    <div className="productPage__reviews mt-10">
      {/* Main flex container for the two columns */}
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* Left Column Container: Holds Review Form and Submitted Reviews */}
        <div style={{ flex: '1 1 350px', maxWidth: '500px' }}> {/* Adjust flex-basis and max-width as needed */}
          {/* Review Form */}
          {user ? (
            <form onSubmit={handleSubmit} className="mb-6">
              <h3 className="text-lg font-medium mb-2">Write a Review</h3>
              <label className="block mb-2">
                Rating:
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="ml-2 border p-1"
                >
                  <option value="">Select</option>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {"⭐".repeat(r)}
                    </option>
                  ))}
                </select>
              </label>
              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button
                className="bg-yellow-500 px-4 py-2 rounded text-white"
                type="submit"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p className="mb-6">
              Please{" "}
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="text-blue-600 underline"
              >
                log in
              </Link>{" "}
              to write a review.
            </p>
          )}

          {/* Submitted Reviews - Directly below the form on the left */}
          <h2 className="text-xl font-semibold mb-4 mt-6">Customer Reviews</h2>
          {reviews.length > 0 ? (
            [...reviews].reverse().map((r, i) => (
              <div key={i} className="border rounded p-3 mb-2" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="font-bold">{r.userName}</div>
                {/* Individual review stars can remain simple or use StarRatingDisplay if desired */}
                <div className="text-yellow-500">{"⭐".repeat(r.rating)}</div>
                <p>{r.comment}</p>
                <small className="text-gray-500">
                  {new Date(r.date).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p style={{ maxWidth: '400px', margin: '0 auto' }}>No reviews yet. Be the first to write one!</p>
          )}
        </div>

        {/* Right Column Container: Holds Review Summary Section (percentage bars) */}
        <div className="bg-white shadow rounded p-4 mb-6" style={{ flex: '1 1 300px', maxWidth: '400px' }}> {/* Adjust flex-basis and max-width as needed */}
          <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>

          {/* Average Rating and Stars - Now using StarRatingDisplay component */}
          <StarRatingDisplay
            avgRating={avgRating}
            totalRatings={totalRatings}
            // No onClick needed here as it's the main review section
          />

          <p className="text-sm text-gray-600 mb-4">
            {totalRatings.toLocaleString()} global rating{totalRatings !== 1 && "s"}
          </p>

          {/* Star Percentage Bars - Using inline CSS for reliable rendering */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center text-sm">
                {/* Left Label: '5 star', '4 star', etc. */}
                <span className="w-12 text-blue-600 hover:underline cursor-pointer">
                  {star} star
                </span>

                {/* Bar Container - Visually representing the percentage */}
                <div
                  style={{
                    flexGrow: 1, // Allows the bar to take available space
                    backgroundColor: '#E5E7EB', // Light gray background for the empty part
                    height: '12px', // Height of the bar
                    borderRadius: '0.25rem', // Rounded corners
                    margin: '0 0.5rem', // Horizontal margin from labels
                    overflow: 'hidden', // Ensures the filled part stays within bounds
                  }}
                >
                  {/* Inner Bar - The orange filling part */}
                  <div
                    style={{
                      backgroundColor: '#F97316', // Orange color for the filled part
                      height: '100%', // Fills the height of its container
                      width: `${starPercentages[5 - star]}%`, // Dynamic width based on percentage
                    }}
                  ></div>
                </div>

                {/* Right Label: Percentage (e.g., '67%') */}
                <span className="w-8 text-right text-gray-700">
                  {starPercentages[5 - star]}%
                </span>
              </div>
            ))}
          </div>
          {/* Optional: "See customer reviews" link as shown in the image */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="#" className="text-blue-600 hover:underline">
              See customer reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;