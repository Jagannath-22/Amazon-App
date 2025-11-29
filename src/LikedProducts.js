import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./LikedProducts.css";

import { useStateValue } from "./StateProvider";
import { parsePrice } from "./utils/parsePrice";

function LikedProducts() {
  const [{ likedProducts }, dispatch] = useStateValue();
  const [expandedItems, setExpandedItems] = useState({});

  const handleAddToCart = (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item,
    });
  };

  const handleDelete = (id) => {
    dispatch({
      type: "REMOVE_FROM_LIKED",
      id,
    });
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="shoppingListPage__container">
      <div className="shoppingListPage__content">
        <div className="content__header">
          <h2>Your Liked Products 💖</h2>
        </div>

        <div className="content__itemList">
          {likedProducts.length === 0 ? (
            <p className="noItemsMessage">
              You haven't liked any products yet.
            </p>
          ) : (
            likedProducts.map((item) => {
              const current = parsePrice(item.currentPrice || item.price);
              const original = parsePrice(item.mrp);

              return (
                <div key={item.id} className="listItem">
                  <div className="listItem__mainContent">
                    <div className="listItem__imageContainer">
                      <img
                        src={item.image || item.imageUrl}
                        alt={item.title}
                        className="listItem__image"
                      />
                    </div>

                    <div className="listItem__details">
                      <h3 className="listItem__name">
                        {item.title || item.name}
                      </h3>
                      <p className="listItem__brand">{item.brand}</p>

                      <div className="listItem__rating">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={
                              i < Math.floor(item.rating || 0)
                                ? "star-filled"
                                : "star-empty"
                            }
                          />
                        ))}
                        <span className="listItem__reviewCount">
                          {item.reviews}
                        </span>
                      </div>

                      <div className="listItem__priceInfo">
                        <span className="listItem__currentPrice">
                          ₹{current.toFixed(2)}
                        </span>
                        {item.mrp && (
                          <span className="listItem__mrp">
                            M.R.P.:{" "}
                            <span className="strike-through">
                              ₹{original.toFixed(2)}
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="listItem__actions">
                        <button
                          className="listItem__actionButton"
                          onClick={() => handleAddToCart(item)}
                        >
                          <AddShoppingCartIcon className="button-icon" /> Add to
                          Cart
                        </button>
                        <button
                          className="listItem__actionButton listItem__actionButton--icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon className="button-icon" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {item.description && expandedItems[item.id] && (
                    <div className="listItem__expandedContent">
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LikedProducts;
