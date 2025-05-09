import { CameraControls } from "@react-three/drei";

export default function CameraSettings() {
  return (
    <CameraControls
      makeDefault
      // Start with a top-down view
      polarAngle={Math.PI / 4} // 45 degrees from top (good angle to see the terrain)
      azimuthAngle={0}
      // Prevent seeing underneath (only allow looking from above)
      minPolarAngle={0} // Small value if want to prevent exactly top-down
      maxPolarAngle={Math.PI / 2.5} // Limit how far down you can tilt
      // Allow full rotation around the terrain
      minAzimuthAngle={-Infinity}
      maxAzimuthAngle={Infinity}
      // Set initial distance
      distance={10}
      // Limit zoom range
      minDistance={0.5}
      maxDistance={8}
      // Smooth damping for better control
      dampingFactor={0.05}
    />
  );
}
