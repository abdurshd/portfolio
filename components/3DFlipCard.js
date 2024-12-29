import { useRef, useEffect } from "react";
import * as THREE from "three";

function ThreeDFlipCard({ children }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 200);
    cardRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 2, 0.1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cardRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={cardRef} style={{ width: "300px", height: "200px" }}>
      {children}
    </div>
  );
}

export default ThreeDFlipCard;