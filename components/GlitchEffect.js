import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function GlitchEffect({ children, primaryColor = "#fff", secondaryColor = "#0073e6" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState(primaryColor);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentColor(prev => 
          prev === primaryColor ? secondaryColor : primaryColor
        );
      }, 1000);
    } else {
      setCurrentColor(primaryColor);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, primaryColor, secondaryColor]);

  return (
    <motion.div
      style={{
        cursor: "pointer",
        position: "relative",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          color: currentColor,
          textShadow: isHovered 
            ? `0 0 10px ${currentColor}, 0 0 20px ${currentColor}, 0 0 30px ${currentColor}`
            : "none",
          transition: { duration: 0.3 }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default GlitchEffect;