"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Perf } from "r3f-perf";
import useLeva from "./hooks/useLeva";
import { useControls } from "leva";

import useHexagonGrid from "./hexagonalGrid/useHexagonGrid";
import HexGridGeometry from "./hexagonalGrid/HexGridGeometry";

import { Center } from "@react-three/drei";
import CameraSettings from "./stagingUtilities/CameraSettings";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const { rings, gap } = useLeva();

  const points = useHexagonGrid({ rings, gap });

  const positions = new Float32Array(points.length * 3);
  points.forEach((p, i) => {
    positions.set([p.x, p.y, p.z], i * 3);
  });

  return (
    <Canvas shadows>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls />
      <axesHelper size={5} />
      <ambientLight intensity={3} />
      <directionalLight position={[2, 1, 0]} intensity={5} />

      <CameraSettings />

      <Center>
        <HexGridGeometry points={points} />
      </Center>
    </Canvas>
  );
}

{
  /* the hexagon centeres that comes from the grid algo */
}
{
  /* <Cube /> */
}
{
  /* <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={points.length}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="hotpink" size={0.1} sizeAttenuation={true} />
      </points> */
}
