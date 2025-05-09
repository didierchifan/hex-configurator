import * as THREE from "three";
import { useMemo } from "react";

export default function useHexagonGrid({ rings, gap }) {
  const points = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector3(0, 0, 0)); //hexagonul din centru

    const angle = Math.PI / 3; //60 de grade
    const axis = new THREE.Vector3(0, 1, 0); //z axis

    const axisVector = new THREE.Vector3(0, 0, -1 * gap);
    const sideVector = new THREE.Vector3(0, 0, 1 * gap).applyAxisAngle(
      axis,
      -angle
    );

    const tempV3 = new THREE.Vector3();

    for (let edge = 0; edge < 6; edge++) {
      for (let ring = 1; ring <= rings; ring++) {
        for (let sd = 0; sd < ring; sd++) {
          tempV3
            .copy(axisVector)
            .multiplyScalar(ring)
            .addScaledVector(sideVector, sd)
            .applyAxisAngle(axis, angle * edge);

          pts.push(new THREE.Vector3().copy(tempV3));
        }
      }
    }

    return pts;
  }, [rings, gap]);

  return points;
}
