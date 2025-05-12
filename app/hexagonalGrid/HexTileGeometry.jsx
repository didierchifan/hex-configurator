import React from "react";
import { useState, useRef } from "react";
import { useGLTF, Outlines, useCursor } from "@react-three/drei";
import gsap from "gsap";

export default function DessertHex(props) {
  const { nodes, materials } = useGLTF("./3dModels/dessertHex.glb");

  const hexRef = useRef();
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  const [rotationIndex, setRotationIndex] = useState(0);
  const step = -Math.PI / 3;

  const handleClick = () => {
    const newIndex = rotationIndex + 1;
    setRotationIndex(newIndex);
    const targetAngle = newIndex * step + Math.PI / 6;

    if (hexRef.current) {
      gsap.to(hexRef.current.rotation, {
        y: targetAngle,
        duration: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <group
      {...props}
      ref={hexRef}
      dispose={null}
      scale={[0.57, 0.57, 0.57]}
      rotation={[0, Math.PI / 6, 0]}
      onClick={handleClick}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.geometryData.geometry}
        material={materials.bones}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.geometryData_1.geometry}
        material={materials.rock}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.geometryData_2.geometry}
        material={materials.sand}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.geometryData_3.geometry}
        material={materials.hex}
      >
        {/* here should be the outline component */}
      </mesh>
    </group>
  );
}

useGLTF.preload("./3dModels/dessertHex.glb");
