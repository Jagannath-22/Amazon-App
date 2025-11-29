import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Custom CSS for the footer

function Footer() {
  // Data for footer columns and links
  const footerColumns = [
    {
      title: "Get to Know Us",
      links: [
        { name: "About Amazon", path: "/about-amazon" },
        { name: "Careers", path: "/careers" },
        { name: "Press Releases", path: "/press-releases" },
        { name: "Amazon Science", path: "/amazon-science" },
      ],
    },
    {
      title: "Connect with Us",
      links: [
        { name: "Facebook", path: "/facebook" },
        { name: "Twitter", path: "/twitter" },
        { name: "Instagram", path: "/instagram" },
      ],
    },
    {
      title: "Make Money with Us",
      links: [
        { name: "Sell on Amazon", path: "/sell-on-amazon" },
        { name: "Sell under Amazon Accelerator", path: "/amazon-accelerator" },
        { name: "Protect and Build Your Brand", path: "/protect-your-brand" },
        { name: "Amazon Global Selling", path: "/global-selling" },
        { name: "Supply to Amazon", path: "/supply-to-amazon" },
        { name: "Become an Affiliate", path: "/become-an-affiliate" },
        { name: "Fulfilment by Amazon", path: "/fulfilment-by-amazon" },
        { name: "Advertise Your Products", path: "/advertise-products" },
        { name: "Amazon Pay on Merchants", path: "/amazon-pay-merchants" },
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        { name: "Your Account", path: "/your-account" },
        { name: "Returns Centre", path: "/returns-centre" },
        { name: "Recalls and Product Safety Alerts", path: "/safety-alerts" },
        { name: "100% Purchase Protection", path: "/purchase-protection" },
        { name: "Amazon App Download", path: "/app-download" },
        { name: "Help", path: "/help" },
      ],
    },
  ];

  // Data for other Amazon services links
  const amazonServices = [
    { name: "AbeBooks", desc: "Books, art & collectibles", path: "/abebooks" },
    { name: "Amazon Web Services", desc: "Scalable Cloud Computing Services", path: "/aws" },
    { name: "Audible", desc: "Download Audio Books", path: "/audible" },
    { name: "IMDb", desc: "Movies, TV & Celebrities", path: "/imdb" },
    { name: "Shopbop", desc: "Designer Fashion Brands", path: "/shopbop" },
    { name: "Amazon Business", desc: "Everything For Your Business", path: "/amazon-business" },
    { name: "Prime Now", desc: "2-Hour Delivery on Everyday Items", path: "/prime-now" },
    { name: "Amazon Prime Music", desc: "100 million songs, ad-free", path: "/prime-music-footer" }, // Path adjusted to avoid conflict with sidebar
  ];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Back to Top Section */}
      <div className="footer__backToTop" onClick={handleBackToTop}>
        <p>Back to top</p>
      </div>

      {/* Main Footer Links Section */}
      <div className="footer__main">
        <div className="footer__columns">
          {footerColumns.map((column, index) => (
            <div key={index} className="footer__column">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="footer__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo, Language, Country Selector Section */}
        <div className="footer__bottomNav">
          <Link to="/" className="footer__logoLink">
            <img
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className="footer__logo"
            />
          </Link>
          <div className="footer__selectors">
            <button className="footer__selectorButton">
              <span className="material-icons">language</span> English
            </button>
            <button className="footer__selectorButton">
              <img src="https://flagcdn.com/in.svg" alt="India Flag" className="footer__flag" /> India
            </button>
          </div>
        </div>
      </div>

      {/* Other Amazon Services Section */}
      <div className="footer__services">
        <div className="footer__servicesGrid">
          {amazonServices.map((service, index) => (
            <Link key={index} to={service.path} className="footer__serviceLink">
              <strong>{service.name}</strong>
              <span>{service.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright and Legal Links Section */}
      <div className="footer__legal">
        <div className="footer__legalLinks">
          <Link to="/conditions-of-use" className="footer__legalLink">Conditions of Use & Sale</Link>
          <Link to="/privacy-notice-footer" className="footer__legalLink">Privacy Notice</Link> {/* Path adjusted */}
          <Link to="/interest-based-ads" className="footer__legalLink">Interest-Based Ads</Link>
        </div>
        <p>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;
