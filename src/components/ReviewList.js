// src/components/ReviewList.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), where('productId', '==', productId));
    const unsub = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [productId]);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 'No rating yet';

  return (
    <div id="reviews" className="review-list p-4 mt-8 bg-gray-50 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
      <p className="mb-4 text-sm text-gray-600">Average Rating: <strong>{avgRating}</strong></p>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-3 rounded bg-white">
              <div className="font-medium text-gray-800">
                {review.username || 'Anonymous'} - {review.rating}⭐
              </div>
              <p className="text-sm text-gray-700 mt-1">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReviewList;
