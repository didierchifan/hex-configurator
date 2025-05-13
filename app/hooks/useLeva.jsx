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
        value: 0,
        min: 1,
        max: 10,
        step: 1,
      },
      gap: {
        value: 0.58,
        min: 0.58,
        max: 5,
        step: 0.01,
      },
    }),
  });

  return controls;
}
