import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import useLeva from "../hooks/useLeva";
import DessertHex from "./HexTileGeometry";
import CenterHex from "./CenterHexTile";

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
        <CenterHex />
        {points
          .filter((point) => !(point.x === 0 && point.z === 0))
          .map((point, index) => {
            return <DessertHex key={index} position={[point.x, 0, point.z]} />;
          })}
      </group>
    </>
  );
}
