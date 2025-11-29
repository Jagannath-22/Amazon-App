import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import WelcomeSection from "./WelcomeSection";
import MostViewedProduct from "./MostViewedProduct";
import LuxurySection from "./LuxurySection";
import OfferSection from "./OfferSection";
import CategorySection from "./CategorySection";
import CategorySection2 from "./CategorySection2";
import SecondaryNavbar from "./SecondaryNavbar";
import Footer from "./Footer";

const bannerImages = [
  "https://m.media-amazon.com/images/I/81kM+ks7f9L._SX3000_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/nbshagun/PD25Event/D266679284_WLD_PD_SAMSUNG_M16PC_Hero_Lifestyle_3000x1200---Prime-Blue._CB790494409_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Home/2025/PD/GW/Mainevent/Hero/REC/PC_Hero_Lifestyle_3000x1200_-_Prime_Blue_11-07-25_Modern_wall_clocks._CB788748569_.png",
  "https://images-eu.ssl-images-amazon.com/images/G/31/Prime/GoLive/H1/PD25_GW_Hero_H1_Static_LIve_Now_NP-1_PSE_1_2x._CB788745550_.jpg"
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [{ viewedProducts }] = useStateValue();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="home">
      {/* ✅ Auto-Slider Section */}
      <div className="home__containerSlider">
        <div
          className="home__imageSlider"
          style={{
            backgroundImage: `url(${bannerImages[currentIndex]})`,
          }}
        >
          <button className="slider__btn left" onClick={handlePrev}>
            ‹
          </button>
          <button className="slider__btn right" onClick={handleNext}>
            ›
          </button>
        </div>
      </div>
      {/*  All other homepage sections */}
      {/* <CategorySection />
       */}
      <div className="category-section-overlap">
      
        <CategorySection />
      </div>
      <CategorySection2 />
      <WelcomeSection />
      <LuxurySection />
      <OfferSection />
      <Footer/>
    </div>
  );
}

export default Home;
