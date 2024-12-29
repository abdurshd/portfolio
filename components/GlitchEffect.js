import { motion } from "framer-motion";

function GlitchEffect({ children }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default GlitchEffect;