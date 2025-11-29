// utils/getAverageRating.js
export function getAverageRating(reviews = []) {
  if (!reviews.length) return 0;

  const total = reviews.reduce((sum, review) => sum + (parseInt(review.rating) || 0), 0);
  return (total / reviews.length).toFixed(1);
}

export function getRatingDistribution(reviews = []) {
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(({ rating }) => {
    const r = parseInt(rating);
    if (dist[r] !== undefined) dist[r]++;
  });
  return dist;
}
