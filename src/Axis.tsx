import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Arrow from "./Arrow";

interface AxisProps {
  origin: THREE.Vector3;
  xHead: THREE.Vector3;
  yHead: THREE.Vector3;
  zHead: THREE.Vector3;
  xLabel: string;
  yLabel: string;
  zLabel: string;
  xLabelColor?: THREE.ColorRepresentation;
  yLabelColor?: THREE.ColorRepresentation;
  zLabelColor?: THREE.ColorRepresentation;
  labelMargin?: number;
  width?: number;
}

export default function Axis({
  origin,
  xHead,
  yHead,
  zHead,
  xLabel,
  yLabel,
  zLabel,
  xLabelColor = new THREE.Color("red"),
  yLabelColor = new THREE.Color("green"),
  zLabelColor = new THREE.Color("blue"),
  labelMargin = 0.1,
  width = 5,
}: AxisProps) {
  const xLabelRef = useRef<THREE.Mesh>(null!);
  const yLabelRef = useRef<THREE.Mesh>(null!);
  const zLabelRef = useRef<THREE.Mesh>(null!);

  const xDir = xHead.clone().sub(origin);
  const yDir = yHead.clone().sub(origin);
  const zDir = zHead.clone().sub(origin);
  const xLabelPos = xDir
    .clone()
    .normalize()
    .multiplyScalar(xDir.length() + labelMargin);
  const yLabelPos = yDir
    .clone()
    .normalize()
    .multiplyScalar(yDir.length() + labelMargin);
  const zLabelPos = zDir
    .clone()
    .normalize()
    .multiplyScalar(zDir.length() + labelMargin);
  const labelScale = 0.2;

  useFrame(({ camera }) => {
    xLabelRef.current.rotation.copy(camera.rotation);
    yLabelRef.current.rotation.copy(camera.rotation);
    zLabelRef.current.rotation.copy(camera.rotation);
  });

  return (
    <>
      <Arrow p1={origin} p2={xHead} color={xLabelColor} width={width} />
      <Arrow p1={origin} p2={yHead} color={yLabelColor} width={width} />
      <Arrow p1={origin} p2={zHead} color={zLabelColor} width={width} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={xLabelPos}
        scale={labelScale}
        ref={xLabelRef}
      >
        {xLabel}
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={yLabelPos}
        scale={labelScale}
        ref={yLabelRef}
      >
        {yLabel}
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={zLabelPos}
        scale={labelScale}
        ref={zLabelRef}
      >
        {zLabel}
      </Text>
    </>
  );
}
