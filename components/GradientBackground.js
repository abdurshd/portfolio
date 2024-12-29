import { useEffect, useState } from "react";

function GradientBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Dynamic import of GSAP and ScrollTrigger
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsap, ScrollTrigger]) => {
      // Register ScrollTrigger plugin
      gsap.gsap.registerPlugin(ScrollTrigger.ScrollTrigger);

      // Apply the animation
      gsap.gsap.to("body", {
        background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    });
  }, []);

  // Don't render anything until client-side
  if (!isMounted) return null;

  return null;
}

export default GradientBackground;