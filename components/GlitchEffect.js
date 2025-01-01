import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function GlitchEffect({ children, primaryColor = "#fff", secondaryColor = "#0073e6", onClick }) {
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
        width: "100%",
        height: "100%",
        display: "inline-block",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        animate={{
          color: currentColor,
          textShadow: isHovered 
            ? `0 0 10px ${currentColor}, 0 0 20px ${currentColor}, 0 0 30px ${currentColor}`
            : "none",
          transition: { duration: 0.3 }
        }}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none" 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default GlitchEffect;