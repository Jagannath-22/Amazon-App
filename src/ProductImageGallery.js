// src/ProductImageGallery.js
import React from "react";
import "./ProductImageGallery.css";

const fallbackImage = "https://via.placeholder.com/500x500.png?text=No+Image+Available";

function ProductImageGallery({ images = [], mainImage, setMainImage, title }) {
  const validImages = Array.isArray(images) && images.length > 0 ? images : [];

  const displayedMainImage = mainImage || validImages[0] || fallbackImage;

  return (
    <div className="image-gallery">
      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="thumbnails">
          {validImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              onClick={() => setMainImage(img)}
              onError={(e) => (e.target.src = fallbackImage)}
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
            />
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="main-image-container">
        <img
          src={displayedMainImage}
          alt={title || "Product image"}
          className="main-image"
          onError={(e) => (e.target.src = fallbackImage)}
        />
      </div>
    </div>
  );
}

export default ProductImageGallery;
