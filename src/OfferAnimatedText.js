import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./OfferAnimatedText.css";

const textSets = [
  { line1: "Welcome, Jagannath", line2: "to the crafted offer zone" },
  { line1: "Unlock your desires", line2: "in our exclusive section" },
];

function OfferAnimatedText() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % textSets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSet = textSets[index];

  return (
    <div className="offer-text-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="offer-text-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }} // keep opacity during exit
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="offer-line line1"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }} // slide out downward
            transition={{
              duration: 1.5,
              ease: [0.6, 0, 0.05, 0],
            }}
          >
            {currentSet.line1}
          </motion.h1>

          <motion.h2
            className="offer-line line2"
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }} // slide out further
            transition={{
              duration: 0.8,
              ease: [0.6, 0, 0.05, 0.9],
              delay: 0.15,
            }}
          >
            {currentSet.line2}
          </motion.h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default OfferAnimatedText;
