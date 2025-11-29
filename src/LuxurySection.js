import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LuxurySection.css"; // Ensure your CSS file is linked

// Define your luxury brands with images and IDs
const luxuryBrands = [
  {
    id: "louis-vuitton",
    name: "Louis Vuitton",
    image: "https://images.unsplash.com/photo-1545776771-0a6367761ff3?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHYlMjBiYWd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "rolex",
    name: "Rolex",
    image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9sZXh8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "gucci",
    name: "Gucci",
    image: "https://images.unsplash.com/photo-1658208870256-d9fcadee001f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "ralph-lauren",
    name: "Ralph Lauren",
    image: "https://images.unsplash.com/photo-1715269291602-ff0717634b56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFscGglMjBsYXVyZW4lMjBicmFuZCUyMGNsb3RocyUyMGx1eHVyeXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "versace",
    name: "Versace",
    image: "https://images.unsplash.com/photo-1659167664742-a592e00f5a29?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlcnNhY2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "chanel",
    name: "Chanel",
    image: "https://images.unsplash.com/photo-1669008343991-362259b8b7dd?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3J5JTIwbHV4dXJ5JTIwZ3VjY2klMjBsdiUyMHJhbHBoJTIwbG91cmVuJTIwdmVyc2FjaGUlMjBjaGFuZWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "dior",
    name: "Dior",
    image: "https://images.unsplash.com/photo-1662289032144-3ed681fdd260?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3J5JTIwbHV4dXJ5JTIwd2lkZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

function LuxurySection() {
  const scrollRef = useRef(null); // Ref for the scrollable container
  const [isHovered, setIsHovered] = useState(false); // State to track hover for pausing
  const scrollSpeed = 0.5; // Pixels per frame for scrolling

  // Effect for automatic horizontal scrolling
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scroll = () => {
      if (!isHovered) { // Only scroll if not hovered
        scrollContainer.scrollLeft += scrollSpeed;

        // If scrolled to the end, reset to the beginning
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Cleanup function
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, scrollSpeed]); // Re-run effect if hover state changes

  // Framer Motion variants for letter animation
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05, // Delay between each letter animation
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 17},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        repeat: Infinity, // Repeat animation forever
        repeatType: "reverse", // Reverse direction on repeat
        duration: 3, // Duration of one cycle
      },
    },
  };

  const titleText = " Explore Luxury Brands";

  return (
    <div
      className="luxury-section-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.h2
        className="luxury-section-title"
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {titleText.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.h2>

      <div className="luxury-carousel-wrapper">
        <div className="luxury-carousel" ref={scrollRef}>
          {luxuryBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation for cards
              viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
              className="luxury-brand-card"
            >
              <Link to={`/luxury/${brand.id}`}>

                <img
                  src={brand.image}
                  alt={brand.name}
                  className="luxury-brand-image"
                />
                <h3 className="luxury-brand-name">{brand.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LuxurySection;