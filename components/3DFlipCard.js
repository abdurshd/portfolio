import { useRef, useState } from "react";
import { motion } from "framer-motion";

function ThreeDFlipCard({ children }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        position: "relative",
        width: "370px",
        height: "180px",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }}
        animate={{
          rotateY: isHovered ? 180 : 0,
          transition: {
            duration: 0.8,
            ease: "easeInOut"
          }
        }}
      >
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden"
        }}>
          {children}
        </div>
        
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundColor: "rgba(21, 96, 100, 0.9)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "1.2em"
        }}>
          <span>View Details</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ThreeDFlipCard;