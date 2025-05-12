import { useRef, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import gsap from "gsap";

export default function CameraSettings() {
  const controlsRef = useRef();

  useEffect(() => {
    const angle = Math.PI / 2;
    const startDistance = 10;
    const endDistance = 2;

    const state = { distance: startDistance };

    gsap.to(state, {
      distance: endDistance,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        const d = state.distance;
        const x = d * Math.sin(angle);
        const y = d * Math.sin(angle);
        const z = d * Math.cos(angle);

        controlsRef.current?.setLookAt(x, y, z, 0, 0, 0, false);
      },
    });
  }, []);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2.5}
      minAzimuthAngle={-Infinity}
      maxAzimuthAngle={Infinity}
      minDistance={0.5}
      maxDistance={8}
      dampingFactor={0.05}
    />
  );
}
