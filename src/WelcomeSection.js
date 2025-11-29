import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WelcomeSection.css"; // Ensure your CSS file is linked
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // For left arrow
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // For right arrow

// Array of background images. Add more URLs here for multiple images.
const images = [
 "https://images.unsplash.com/photo-1662289032144-3ed681fdd260?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3J5JTIwbHV4dXJ5JTIwd2lkZXxlbnwwfHwwfHx8MA%3D%3D",
 "https://images.unsplash.com/photo-1619344373073-e05357c9612d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWNjZXNzb3J5JTIwbHV4dXJ5JTIwd2lkZXxlbnwwfHwwfHx8MA%3D%3D",
 "https://images.unsplash.com/photo-1680770733998-dd4b09866450?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFjY2Vzc29yeSUyMGx1eHVyeSUyMHdpZGV8ZW58MHx8MHx8fDA%3D"

];

function WelcomeSection() {
  const [index, setIndex] = useState(0); // Current image index
  const [isPaused, setIsPaused] = useState(false); // State to pause/resume auto-slideshow

  // useEffect for automatic image cycling
  useEffect(() => {
    // If slideshow is paused, clear the timer and do nothing
    if (isPaused) {
      return;
    }

    // Set up interval for automatic image change every 5 seconds
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Cleanup function: clear the interval when component unmounts or isPaused changes
    return () => clearInterval(timer);
  }, [isPaused, images.length]); // Re-run effect if isPaused or number of images changes

  // Function to navigate to the previous image
  const handlePrevImage = () => {
    setIsPaused(true); // Pause automatic slideshow on manual navigation
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    // Optional: Resume after a short delay if desired, or keep paused until mouse leaves
    // setTimeout(() => setIsPaused(false), 3000);
  };

  // Function to navigate to the next image
  const handleNextImage = () => {
    setIsPaused(true); // Pause automatic slideshow on manual navigation
    setIndex((prev) => (prev + 1) % images.length);
    // Optional: Resume after a short delay if desired, or keep paused until mouse leaves
    // setTimeout(() => setIsPaused(false), 3000);
  };

   useEffect(() => {
    const handleMouseMove = (e) => {
      const container = document.querySelector('.welcome-container');
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    const container = document.querySelector('.welcome-container');
    container?.addEventListener('mousemove', handleMouseMove);

    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);



  //
  

  return (
    <div
      className="welcome-container"
      onMouseEnter={() => setIsPaused(true)} // Pause slideshow on mouse enter
      onMouseLeave={() => setIsPaused(false)} // Resume slideshow on mouse leave
    >
      <AnimatePresence mode="wait"> {/* 'mode="wait"' ensures exit animation completes before new enters */}
        <motion.div
          key={index} // Key is crucial for AnimatePresence to detect changes and trigger animation
          className="welcome-background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${images[index]})`,
          }}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.div
        className="welcome-nav-arrow welcome-nav-arrow--left"
        onClick={handlePrevImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowBackIosIcon />
      </motion.div>
      <motion.div
        className="welcome-nav-arrow welcome-nav-arrow--right"
        onClick={handleNextImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowForwardIosIcon />
      </motion.div>

      <div className="welcome-overlay">
        <motion.h1
          className="welcome-text"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5, // Initial delay
            duration: 2, // Duration of one animation cycle
            repeat: Infinity, // Make the animation run forever
            repeatType: "reverse", // Reverse animation direction on each repeat
            ease: "easeInOut" // Smooth easing
          }}
        >
          Welcome to Next-Level Luxury
        </motion.h1>
        <motion.p
          className="welcome-sub"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1, // Initial delay
            duration: 2, // Duration of one animation cycle
            repeat: Infinity, // Make the animation run forever
            repeatType: "reverse", // Reverse animation direction on each repeat
            ease: "easeInOut" // Smooth easing
          }}
        >
          Where elegance meets experience
        </motion.p>
      </div>
    </div>
  );
}

export default WelcomeSection;
