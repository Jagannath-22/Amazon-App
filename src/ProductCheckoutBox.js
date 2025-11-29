import React from 'react';
import './ProductPage.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function ProductCheckoutBox({ product }) {
  // ✅ Robust parser to handle string, ₹ symbol, commas, etc.
  const parsePrice = (value) => {
    if (!value) return 0;
    const numeric = parseFloat(value.toString().replace(/[^\d.]/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  };

  const price = parsePrice(product.price);

  const handleAddToCart = () => console.log("🛒 Added to Cart:", product.id);
  const handleBuyNow = () => console.log("💰 Buying Now:", product.id);
  const handleQuantityChange = (event) => console.log("Quantity changed to:", event.target.value);

  return (
    <div className="productPage__right">
      <div className="productPage__checkoutBox">
        <div className="productPage__priceTop">
          ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>

        <div className="productPage__deliveryText">
          <span className="productPage__deliveryBold">FREE delivery </span>
          {product.deliveryInfo || "Tomorrow 9AM - 9PM"}
        </div>

        <div className={`productPage__inStock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </div>

        {product.inStock && (
          <>
            <div className="productPage__quantitySelector">
              Quantity:
              <select onChange={handleQuantityChange} defaultValue="1">
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button className="productPage__addToCartButton" onClick={handleAddToCart}>
              <ShoppingCartOutlinedIcon className="button-icon" /> Add to Cart
            </button>

            <button className="productPage__buyNowButton" onClick={handleBuyNow}>
              Buy Now
            </button>
          </>
        )}

        <div className="productPage__secureTransaction">
          <span className="secure-icon">🔒</span> Secure transaction
        </div>

        {product.protectionPlan?.available && (
          <div className="productPage__protectionPlan">
            <div className="protection-title">Add a Protection Plan:</div>
            <label className="protection-checkbox">
              <input type="checkbox" />
              <span>{product.protectionPlan.details}</span>
            </label>
          </div>
        )}

        <div  className="productPage__addToWishList">
          <button>Add to Wish List</button>
        </div>
      </div>

      <div className="productPage__otherSellers">
        <h3>Other sellers on Amazon</h3>
        <p>
          New (2) from{' '}
          <span className="productPage__priceBold">
            ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>{' '}
          <span className="productPage__freeDelivery">FREE Delivery</span>
        </p>
      </div>
    </div>
  );
}

export default ProductCheckoutBox;
