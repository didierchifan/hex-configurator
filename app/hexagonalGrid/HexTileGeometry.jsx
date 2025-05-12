import React from "react";
import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

export default function DessertHex(props) {
  const { nodes, materials } = useGLTF("./3dModels/dessertHex.glb");

  const hexRef = useRef();
  const [hover, setHover] = useState(false);

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

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    setHover(true);
    if (hexRef.current) {
      gsap.to(hexRef.current.scale, {
        x: 0.55,
        y: 0.55,
        z: 0.55,
        duration: 0.2,
        ease: "power1.in",
      });
    }
  };

  const handlePointerLeave = () => {
    setHover(false);
    if (hexRef.current) {
      gsap.to(hexRef.current.scale, {
        x: 0.57,
        y: 0.57,
        z: 0.57,
        duration: 0.2,
        ease: "power1.out",
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
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* here should be the outline component */}
      </mesh>
    </group>
  );
}

useGLTF.preload("./3dModels/dessertHex.glb");
