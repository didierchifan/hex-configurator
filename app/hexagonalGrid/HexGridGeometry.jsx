import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import useLeva from "../hooks/useLeva";
import DessertHex from "./HexTileGeometry";

export default function HexGridGeometry({ points }) {
  const instancedRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!instancedRef.current) return;

    points.forEach((point, index) => {
      dummy.position.set(point.x, 0, point.z);
      dummy.updateMatrix();
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [points, dummy]);

  return (
    <>
      <group>
        {points.map((point, index) => {
          return <DessertHex key={index} position={[point.x, 0, point.z]} />;
        })}
      </group>
    </>
  );
}
