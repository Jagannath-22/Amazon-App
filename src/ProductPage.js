// src/ProductPage.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase"; // Import db here
import { doc, getDoc } from "firebase/firestore"; // Import doc and getDoc

import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductOffers from "./ProductOffers";
import ProductDetails from "./ProductDetails";
import ProductCheckoutBox from "./ProductCheckoutBox";
import ProductActionIcons from "./ProductActionIcons";
import ProductReviews from "./components/ProductReviews"; // Your ProductReviews component

import "./ProductPage.css";

function ProductPage() {
  const location = useLocation();
  const [{}, dispatch] = useStateValue();

  const productFromState = location.state?.product;
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]); // State to hold reviews fetched for this product

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      if (productFromState && productFromState.id) { // Ensure productFromState and its ID exist
        setProduct(productFromState);
        const main =
          (productFromState.images?.length > 0 && productFromState.images[0]) ||
          productFromState.image ||
          "";
        setMainImage(main);
        dispatch({ type: "ADD_TO_VIEWED", item: productFromState });

        // Fetch reviews specifically for this product ID
        try {
          const docRef = doc(db, "products", productFromState.id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setReviews(snap.data().reviews || []);
          } else {
            setReviews([]); // No reviews found
          }
        } catch (err) {
          console.error("Error fetching reviews for ProductPage:", err);
          setReviews([]); // Handle error by setting empty reviews
        }
      } else {
        setProduct(null);
        setReviews([]); // Clear reviews if no product
      }
      setLoading(false);
    };

    fetchProductAndReviews();
  }, [productFromState, dispatch]); // Re-run effect if productFromState changes

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product)
    return (
      <p className="text-center mt-10 text-red-600">
        Product not found or missing state.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="productPage__container px-4 md:px-8 py-6">
        <div className="productPage grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-1">
            <ProductImageGallery
              images={
                product.images && product.images.length > 0
                  ? product.images
                  : product.image
                  ? [product.image]
                  : []
              }
              mainImage={mainImage}
              setMainImage={setMainImage}
              title={product.title}
            />
          </div>

          {/* Middle: Info, Offers, Details */}
          <div className="productPage__middle lg:col-span-1">
            <ProductInfo
              product={{ ...product, reviews: reviews }} // Pass reviews with product object
            />
            <ProductOffers
              offers={[
                ...(product.offers || []),
                {
                  type: "Bank Offer",
                  description: "Extra ₹2,000 off on Axis Bank Credit Cards",
                },
                {
                  type: "Bank Offer",
                  description:
                    "5% Unlimited Cashback on Amazon ICICI Credit Card",
                },
              ]}
            />
            <ProductActionIcons product={product} showCart showSave={false} />
            <ProductDetails product={product} />
          </div>

          {/* Right: Checkout Box */}
          <div className="lg:col-span-1">
            <ProductCheckoutBox product={product} />
          </div>
        </div>

        {/* Rating & Review Section (Your ProductReviews component) */}
        <div className="productPage__reviews mt-10" id="reviews">
          {/* This ProductReviews component will also fetch its own reviews, which is fine,
              as it's responsible for the submission and display of individual reviews. */}
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;