"use client";

import { ThemeProvider } from "styled-components";
import { QUERIES } from "./interface/constants";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Perf } from "r3f-perf";
import useLeva from "./hooks/useLeva";
import { useControls } from "leva";

import useHexagonGrid from "./hexagonalGrid/useHexagonGrid";
import HexGridGeometry from "./hexagonalGrid/HexGridGeometry";

import { Center } from "@react-three/drei";
import CameraSettings from "./stagingUtilities/CameraSettings";

import { getValidNeighbors } from "./hexagonalGrid/useHexagonGrid";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const { rings, gap } = useLeva();

  const { points, hexMap } = useHexagonGrid({ rings, gap });

  const centerHex = { q: 0, r: 0, s: 0 };
  const neighbors = getValidNeighbors(centerHex, hexMap);
  console.log("Neighbors of center hex:", neighbors);

  const positions = new Float32Array(points.length * 3);
  points.forEach((p, i) => {
    positions.set([p.x, p.y, p.z], i * 3);
  });

  return (
    <ThemeProvider theme={{ queries: QUERIES }}>
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
    </ThemeProvider>
  );
}
