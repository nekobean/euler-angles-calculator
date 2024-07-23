import { Line } from "@react-three/drei";
import * as THREE from "three";

interface ArrowProps {
  size?: number;
  width?: number;
  color?: THREE.ColorRepresentation;
}

export default function Grid({
  width = 1,
  size = 10,
  color = "gray",
}: ArrowProps) {
  const from = -Math.floor(size / 2);
  const to = from + size;

  const lines = [];
  for (let i = from; i <= to; i++) {
    lines.push(
      <Line
        points={[new THREE.Vector3(i, 0, from), new THREE.Vector3(i, 0, to)]}
        color={color}
        lineWidth={width}
      />,
      <Line
        points={[new THREE.Vector3(from, 0, i), new THREE.Vector3(to, 0, i)]}
        color={color}
        lineWidth={width}
      />
    );
  }

  return <>{lines}</>;
}
