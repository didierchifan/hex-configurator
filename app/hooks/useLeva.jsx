import { useControls, folder } from "leva";

export default function useLeva() {
  const controls = useControls({
    "hex-grid": folder({
      hexScale: {
        value: 0.57,
        min: 0.1,
        max: 0.57,
        step: 0.01,
      },
      rings: {
        value: 1,
        min: 1,
        max: 10,
      },
      gap: {
        value: 1,
        min: 1,
        max: 5,
        step: 0.1,
      },
    }),
  });

  return controls;
}
