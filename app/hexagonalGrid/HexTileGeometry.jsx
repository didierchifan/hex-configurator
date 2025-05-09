import React from "react";
import { useGLTF } from "@react-three/drei";

export default function DessertHex(props) {
  const { nodes, materials } = useGLTF("./3dModels/dessertHex.glb");
  console.log(nodes);

  return (
    <group
      {...props}
      dispose={null}
      scale={[0.57, 0.57, 0.57]}
      rotation={[0, Math.PI / 6, 0]}
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
      />
    </group>
  );
}

useGLTF.preload("./3dModels/dessertHex.glb");
