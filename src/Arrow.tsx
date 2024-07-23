import { Line } from "@react-three/drei";
import * as THREE from "three";

interface ArrowProps {
  p1: THREE.Vector3;
  p2: THREE.Vector3;
  color: THREE.ColorRepresentation;
  width: number;
  headWidth?: number;
  headLength?: number;
}

export default function Arrow({ p1, p2, color, width }: ArrowProps) {
  return (
    <>
      <Line points={[p1, p2]} color={color} lineWidth={width} />
    </>
  );
}
