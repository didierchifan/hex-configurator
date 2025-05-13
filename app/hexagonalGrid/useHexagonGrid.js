import * as THREE from "three";
import { useMemo } from "react";

// https://www.redblobgames.com/grids/hexagons/implementation.html

export default function useHexagonGrid({ rings, gap }) {
  const points = useMemo(() => {
    const pts = [];

    // Hex layout: flat-topped
    const layout = {
      orientation: {
        f0: 3.0 / 2.0,
        f1: 0.0,
        f2: Math.sqrt(3.0) / 2.0,
        f3: Math.sqrt(3.0),
        start_angle: 0.0, // 0 degrees (flat top)
      },
      size: { x: gap, y: gap },
      origin: { x: 0, y: 0 },
    };

    // Convert cube coordinate to 2D position
    function hexToPixel(hex) {
      const { f0, f1, f2, f3 } = layout.orientation;
      const { x: sx, y: sy } = layout.size;
      const x = (f0 * hex.q + f1 * hex.r) * sx;
      const y = (f2 * hex.q + f3 * hex.r) * sy;
      return new THREE.Vector3(x, 0, y); // y = 0 for flat ground
    }

    // Add center hex
    pts.push(hexToPixel({ q: 0, r: 0, s: 0 }));

    // Cube directions (in Red Blob order)
    const directions = [
      { q: 1, r: -1, s: 0 },
      { q: 1, r: 0, s: -1 },
      { q: 0, r: 1, s: -1 },
      { q: -1, r: 1, s: 0 },
      { q: -1, r: 0, s: 1 },
      { q: 0, r: -1, s: 1 },
    ];

    // Create a map for fast access to hexes
    const hexMap = new Map();

    for (let k = 1; k <= rings; k++) {
      // Start at the top-left of the ring
      let hex = {
        q: directions[4].q * k,
        r: directions[4].r * k,
        s: directions[4].s * k,
      };

      for (let side = 0; side < 6; side++) {
        for (let step = 0; step < k; step++) {
          const pixel = hexToPixel(hex);
          pts.push(pixel);
          hexMap.set(`${hex.q},${hex.r},${hex.s}`, hex); // Store hex in map with unique key

          hex = {
            q: hex.q + directions[side].q,
            r: hex.r + directions[side].r,
            s: hex.s + directions[side].s,
          };
        }
      }
    }

    return { points: pts, hexMap }; // Return the points and hexMap
  }, [rings, gap]);

  return points;
}

export function getValidNeighbors(hex, hexMap) {
  const directions = [
    { q: 1, r: -1, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 0, r: 1, s: -1 },
    { q: -1, r: 1, s: 0 },
    { q: -1, r: 0, s: 1 },
    { q: 0, r: -1, s: 1 },
  ];

  return directions
    .map((direction) => ({
      q: hex.q + direction.q,
      r: hex.r + direction.r,
      s: hex.s + direction.s,
    }))
    .filter((neighbor) =>
      hexMap.has(`${neighbor.q},${neighbor.r},${neighbor.s}`)
    ); // Check if neighbor exists in the map
}
