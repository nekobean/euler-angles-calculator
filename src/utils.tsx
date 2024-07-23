import * as THREE from "three";

export function rotationMatrixX(theta: number) {
  // prettier-ignore
  return new THREE.Matrix3(
      1, 0, 0,
      0, Math.cos(theta), -Math.sin(theta),
      0, Math.sin(theta), Math.cos(theta)
    );
}

export function rotationMatrixY(theta: number) {
  // prettier-ignore
  return new THREE.Matrix3(
      Math.cos(theta), 0, Math.sin(theta),
      0, 1, 0,
      -Math.sin(theta), 0, Math.cos(theta)
    );
}

export function rotationMatrixZ(theta: number) {
  // prettier-ignore
  return new THREE.Matrix3(
      Math.cos(theta), -Math.sin(theta), 0,
      Math.sin(theta), Math.cos(theta), 0,
      0, 0, 1
    );
}

export function changeBasis(
  basis: [THREE.Vector3, THREE.Vector3, THREE.Vector3],
  matrix: THREE.Matrix3
) {
  const [e1, e2, e3] = basis;
  // Matrix3.elements の格納順は列優先
  const [m11, m21, m31, m12, m22, m32, m13, m23, m33] = matrix.elements;

  const new_e1 = e1
    .clone()
    .multiplyScalar(m11)
    .add(e2.clone().multiplyScalar(m21))
    .add(e3.clone().multiplyScalar(m31));
  const new_e2 = e1
    .clone()
    .multiplyScalar(m12)
    .add(e2.clone().multiplyScalar(m22))
    .add(e3.clone().multiplyScalar(m32));
  const new_e3 = e1
    .clone()
    .multiplyScalar(m13)
    .add(e2.clone().multiplyScalar(m23))
    .add(e3.clone().multiplyScalar(m33));

  return [new_e1, new_e2, new_e3];
}
