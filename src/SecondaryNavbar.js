import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SecondaryNavbar.css'; // Custom CSS for the navbar

function SecondaryNavbar({ onToggleSidebar }) { // Accept onToggleSidebar prop
  const navigate = useNavigate();

  // Navigation items for the secondary navbar
  const navItems = [
    { name: 'Prime Day Deals', path: '/prime-deals' },
    { name: 'Fresh', path: '/fresh' },
    { name: 'Keep Shopping for', path: '/keep-shopping' },
    { name: 'Sell', path: '/sell' },
    { name: 'MX Player', path: '/mx-player' },
    { name: 'Buy Again', path: '/buy-again' },
    { name: 'Gift Cards', path: '/gift-cards' },
    { name: 'Kindle E-books', path: '/kindle-ebooks' },
    { name: 'Browsing History', path: '/browsing-history' },
    { name: 'Amazon Pay', path: '/amazon-pay' },
    { name: 'Jagannath.Amazon.in', path: '/my-amazon' }, // Example personalized link
  ];

  // Handle click for the "All" menu icon
  const handleAllClick = (e) => {
    e.preventDefault(); // Prevent any default link behavior if wrapped
    onToggleSidebar(); // Call the function passed from App.js to open/close sidebar
    console.log("All menu icon clicked! Toggling sidebar.");
  };

  return (
    <nav className="secondary-navbar">
      <div className="secondary-navbar__left">
        {/* "All" menu icon */}
        <Link to="#" className="secondary-navbar__link secondary-navbar__all-link" onClick={handleAllClick}>
          <span className="material-icons secondary-navbar__all-icon">menu</span>
          <span className="secondary-navbar__all-text">All</span>
        </Link>
        
        {/* Amazon logo placeholder (replace with actual SVG/image if needed) */}
        <Link to="/" className="secondary-navbar__link secondary-navbar__logo-link">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="Amazon Logo" 
            className="secondary-navbar__logo" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src="https://placehold.co/80x25/FFFFFF/000000?text=Amazon"; // Fallback
            }}
          />
        </Link>
      </div>

      {/* Navigation items */}
      <div className="secondary-navbar__nav-items">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} className="secondary-navbar__link">
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default SecondaryNavbar;
