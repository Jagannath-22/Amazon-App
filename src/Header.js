import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useStateValue, getBasketProductCount } from "./StateProvider";
import { auth, db } from "./firebase";
import "./Header.css";
import Fuse from "fuse.js";
import { collection, getDocs } from "firebase/firestore";

function Header() {
  const [{ basket, user }] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const totalProductCount = getBasketProductCount(basket);
  const dropdownRef = useRef(null);

  // Fetch products from Firestore
  useEffect(() => {
    const loadProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const prods = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllProducts(prods);
    };
    loadProducts();
  }, []);

  // Fuse.js fuzzy search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const fuse = new Fuse(allProducts, {
      keys: ["title", "category"],
      threshold: 0.4,
    });

    const results = fuse.search(searchTerm);
    setSuggestions(results.map((r) => r.item));
    setShowDropdown(true);
  }, [searchTerm, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuthentication = () => {
    if (user) auth.signOut();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>

      <form
        onSubmit={handleSearch}
        className="header__search relative w-full"
        ref={dropdownRef}
      >
        <label htmlFor="search-input" className="visually-hidden">
          Search
        </label>

        <input
          id="search-input"
          name="search"
          className="header__searchInput"
          type="text"
          autoComplete="on"
          placeholder="Search Amazon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
        />
        <button type="submit">
          <SearchIcon className="header__searchIcon" />
        </button>

        {showDropdown && suggestions.length > 0 && (
          <div className="search-dropdown absolute bg-white z-50 shadow-lg rounded w-full mt-1 border border-gray-300 overflow-hidden transition-all duration-300 ease-in-out">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/product/${item.id}`, { state: { product: item } });
                  setSearchTerm("");
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={item.image || item.imageUrl || "/fallback.jpg"}
                  alt={item.title}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="text-sm font-semibold text-black">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="header__nav">
        {!user ? (
          <Link to="/login">
            <div className="header__option">
              <span className="header__optionLineOne">Hello Guest</span>
              <span className="header__optionLineTwo">Sign In</span>
            </div>
          </Link>
        ) : (
          <div
            onClick={handleAuthentication}
            className="header__option cursor-pointer"
          >
            <span className="header__optionLineOne">
              Hello {user ? user.email.split("@")[0] : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        )}

        <Link to="/liked">
          <div className="header__option">
            <FavoriteBorderIcon style={{ color: "white" }} />
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {totalProductCount}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
