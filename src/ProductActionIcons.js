import React from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom"; // ADD

function ProductActionIcons({ product, showCart = true, showSave = false }) {
  const [{ likedProducts, user }, dispatch] = useStateValue(); // ADD user
  const isLiked = likedProducts?.some((item) => item.id === product.id);
  const navigate = useNavigate(); // ADD

  const handleLikeToggle = () => {
    if (!user) {
      alert("Please login to like products.");
      navigate("/login");
      return;
    }

    dispatch({
      type: isLiked ? "REMOVE_FROM_LIKED" : "ADD_TO_LIKED",
      ...(isLiked ? { id: product.id } : { item: product }),
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add to cart.");
      navigate("/login");
      return;
    }

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        title: product.title,
        image: product.image || product.images?.[0],
        price: product.price,
price: Number(product.price),
        quantity: 1,

      },
    });
  };

  const handleSave = () => {
    if (!user) {
      alert("Please login to save products.");
      navigate("/login");
      return;
    }
    alert("Save functionality clicked (customize as needed)");
  };

  return (
    <div
      className="product-action-icons"
      style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}
    >
      <IconButton onClick={handleLikeToggle}>
        {isLiked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
      </IconButton>

      {showCart && (
        <IconButton onClick={handleAddToCart}>
          <ShoppingCartIcon />
        </IconButton>
      )}

      {showSave && (
        <IconButton onClick={handleSave}>
          <BookmarkBorderIcon />
        </IconButton>
      )}
    </div>
  );
}

export default ProductActionIcons;
