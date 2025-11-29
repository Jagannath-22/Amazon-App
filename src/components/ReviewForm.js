import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
// No need to import ProductPage.css here, it's imported in ProductPage.js

function ReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !text.trim()) {
      alert('Please log in and write a review before submitting.');
      return;
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        productId,
        userId: user.uid,
        username: user.displayName || user.email, // Fallback to email if display name not available
        rating,
        text,
        createdAt: serverTimestamp()
      });
      setText(''); // Clear textarea after successful submission
      setRating(5); // Reset rating
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="review-form"> {/* Removed Tailwind, using custom CSS */}
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
          ))}
        </select>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
        ></textarea>

        <button type="submit" className="review-form__submit-button"> {/* Added custom class */}
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;