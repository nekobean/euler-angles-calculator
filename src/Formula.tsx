import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import * as THREE from "three";
import { rotationMatrixX, rotationMatrixY, rotationMatrixZ } from "./utils";
import CopyToClipBoard from "react-copy-to-clipboard";
import Button from "@mui/material/Button";

import "./App.css";

interface FoamulaProps {
  axes: THREE.Vector3[];
  order: string;
  angles: number[];
  symbols?: string[];
}

function rotationEulerMatrix(order: string, symbols: string[]) {
  switch (order) {
    case "XYX":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${symbols[1]} &
\\sin ${symbols[1]} \\sin ${symbols[2]} &
\\sin ${symbols[1]} \\cos ${symbols[2]} \\\\
\\sin ${symbols[0]} \\sin ${symbols[1]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} \\cos ${symbols[1]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
-\\sin ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} \\\\
-\\sin ${symbols[1]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} \\cos ${symbols[1]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "XZX":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${symbols[1]} &
-\\sin ${symbols[1]} \\cos ${symbols[2]} &
\\sin ${symbols[1]} \\sin ${symbols[2]} \\\\
\\sin ${symbols[1]} \\cos ${symbols[0]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[0]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} \\cos ${symbols[1]} \\\\
\\sin ${symbols[0]} \\sin ${symbols[1]} &
\\sin ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} \\cos ${symbols[1]} + \\cos ${symbols[0]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "YXY":
      // prettier-ignor
      return `\\begin{pmatrix}
-\\sin ${symbols[0]} \\sin ${symbols[2]} \\cos ${symbols[1]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} &
\\sin ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} \\\\
\\sin ${symbols[1]} \\sin ${symbols[2]} &
\\cos ${symbols[1]} &
-\\sin ${symbols[1]} \\cos ${symbols[2]} \\\\
-\\sin ${symbols[0]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[1]} \\cos ${symbols[0]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "YZY":
      // prettier-ignor
      return `\\begin{pmatrix}
-\\sin ${symbols[0]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[1]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} \\cos ${symbols[1]} \\\\
\\sin ${symbols[1]} \\cos ${symbols[2]} &
\\cos ${symbols[1]} &
\\sin ${symbols[1]} \\sin ${symbols[2]} \\\\
-\\sin ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} \\cos ${symbols[1]} + \\cos ${symbols[0]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "ZXZ":
      // prettier-ignor
      return `\\begin{pmatrix}
-\\sin ${symbols[0]} \\sin ${symbols[2]} \\cos ${symbols[1]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
-\\sin ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\\\
\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} \\cos ${symbols[1]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[1]} \\cos ${symbols[0]} \\\\
\\sin ${symbols[1]} \\sin ${symbols[2]} &
\\sin ${symbols[1]} \\cos ${symbols[2]} &
\\cos ${symbols[1]}
\\end{pmatrix}`;
    case "ZYZ":
      // prettier-ignor
      return `\\begin{pmatrix}
-\\sin ${symbols[0]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[0]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[1]} \\cos ${symbols[0]} \\\\
\\sin ${symbols[0]} \\cos ${symbols[1]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} &
-\\sin ${symbols[0]} \\sin ${symbols[2]} \\cos ${symbols[1]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\\\
-\\sin ${symbols[1]} \\cos ${symbols[2]} &
\\sin ${symbols[1]} \\sin ${symbols[2]} &
\\cos ${symbols[1]}
\\end{pmatrix}`;
    case "XYZ":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[2]} \\cos ${symbols[1]} &
\\sin ${symbols[1]} \\\\
\\sin ${symbols[0]} \\sin ${symbols[1]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} &
-\\sin ${symbols[0]} \\sin ${symbols[1]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
-\\sin ${symbols[0]} \\cos ${symbols[1]} \\\\
\\sin ${symbols[0]} \\sin ${symbols[2]} -\\sin ${symbols[1]} \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[1]} \\sin ${symbols[2]} \\cos ${symbols[0]} &
\\cos ${symbols[0]} \\cos ${symbols[1]}
\\end{pmatrix}`;
    case "XZY":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[1]} &
\\sin ${symbols[2]} \\cos ${symbols[1]} \\\\
\\sin ${symbols[0]} \\sin ${symbols[2]} + \\sin ${symbols[1]} \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\cos ${symbols[0]} \\cos ${symbols[1]} &
-\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[1]} \\sin ${symbols[2]} \\cos ${symbols[0]} \\\\
\\sin ${symbols[0]} \\sin ${symbols[1]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "YXZ":
      // prettier-ignor
      return `\\begin{pmatrix}
\\sin ${symbols[0]} \\sin ${symbols[1]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\cos ${symbols[1]} \\\\
\\sin ${symbols[2]} \\cos ${symbols[1]} &
\\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[1]} \\\\
-\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[1]} \\sin ${symbols[2]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\sin ${symbols[2]} + \\sin ${symbols[1]} \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\cos ${symbols[0]} \\cos ${symbols[1]}
\\end{pmatrix}`;
    case "YZX":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[0]} \\sin ${symbols[2]} -\\sin ${symbols[1]} \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[1]} \\sin ${symbols[2]} \\cos ${symbols[0]} \\\\
\\sin ${symbols[1]} &
\\cos ${symbols[1]} \\cos ${symbols[2]} &
-\\sin ${symbols[2]} \\cos ${symbols[1]} \\\\
-\\sin ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} &
-\\sin ${symbols[0]} \\sin ${symbols[1]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "ZXY":
      // prettier-ignor
      return `\\begin{pmatrix}
-\\sin ${symbols[0]} \\sin ${symbols[1]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
-\\sin ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\cos ${symbols[2]} + \\sin ${symbols[2]} \\cos ${symbols[0]} \\\\
\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[1]} \\sin ${symbols[2]} \\cos ${symbols[0]} &
\\cos ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[0]} \\sin ${symbols[2]} -\\sin ${symbols[1]} \\cos ${symbols[0]} \\cos ${symbols[2]} \\\\
-\\sin ${symbols[2]} \\cos ${symbols[1]} &
\\sin ${symbols[1]} &
\\cos ${symbols[1]} \\cos ${symbols[2]}
\\end{pmatrix}`;
    case "ZYX":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${symbols[0]} \\cos ${symbols[1]} &
-\\sin ${symbols[0]} \\cos ${symbols[2]} + \\sin ${symbols[1]} \\sin ${symbols[2]} \\cos ${symbols[0]} &
\\sin ${symbols[0]} \\sin ${symbols[2]} + \\sin ${symbols[1]} \\cos ${symbols[0]} \\cos ${symbols[2]} \\\\
\\sin ${symbols[0]} \\cos ${symbols[1]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\sin ${symbols[2]} + \\cos ${symbols[0]} \\cos ${symbols[2]} &
\\sin ${symbols[0]} \\sin ${symbols[1]} \\cos ${symbols[2]} -\\sin ${symbols[2]} \\cos ${symbols[0]} \\\\
-\\sin ${symbols[1]} &
\\sin ${symbols[2]} \\cos ${symbols[1]} &
\\cos ${symbols[1]} \\cos ${symbols[2]}
\\end{pmatrix}`;
  }
}

function rotationMatrixFoamula(axis: string, theta: string) {
  switch (axis) {
    case "X":
      // prettier-ignor
      return `\\begin{pmatrix}
1 & 0 & 0 \\\\
0 & \\cos ${theta} & -\\sin ${theta} \\\\
0 & \\sin ${theta} & \\cos ${theta} \\\\
\\end{pmatrix}`;
    case "Y":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${theta} & 0 & \\sin ${theta} \\\\
0 & 1 & 0 \\\\
-\\sin ${theta} & 0 & \\cos ${theta} \\\\
\\end{pmatrix}`;
    case "Z":
      // prettier-ignor
      return `\\begin{pmatrix}
\\cos ${theta} & -\\sin ${theta} & 0 \\\\
\\sin ${theta} & \\cos ${theta} & 0 \\\\
0 & 0 & 1 \\\\
\\end{pmatrix}`;
  }
}

function rotationMatrixNumeric(axis: string, theta: number) {
  switch (axis) {
    case "X":
      return rotationMatrixX(theta);
    case "Y":
      return rotationMatrixY(theta);
    default:
      return rotationMatrixZ(theta);
  }
}

export default function Foamula({
  axes,
  order,
  angles,
  symbols = ["\\alpha", "\\beta", "\\gamma"],
}: FoamulaProps) {
  const digits = 7; // 表示桁数
  const R1 = rotationMatrixFoamula(order[0], symbols[0]);
  const R2 = rotationMatrixFoamula(order[1], symbols[1]);
  const R3 = rotationMatrixFoamula(order[2], symbols[2]);
  const R = rotationEulerMatrix(order, symbols);

  const RNumeric = rotationMatrixNumeric(
    order[0],
    THREE.MathUtils.degToRad(angles[0])
  ).multiply(
    rotationMatrixNumeric(
      order[1],
      THREE.MathUtils.degToRad(angles[1])
    ).multiply(
      rotationMatrixNumeric(order[2], THREE.MathUtils.degToRad(angles[2]))
    )
  );
  const [m11, m21, m31, m12, m22, m32, m13, m23, m33] = RNumeric.elements;

  // prettier-ignore
  const RText = `[[${m11.toFixed(digits)}, ${m12.toFixed(digits)}, ${m13.toFixed(digits)}],
[${m21.toFixed(digits)}, ${m22.toFixed(digits)}, ${m23.toFixed(digits)}],
[${m31.toFixed(digits)}, ${m32.toFixed(digits)}, ${m33.toFixed(digits)}]`;

  // pretifer-ignore
  const formula = `
\\begin{align*}
(\\bm{x}, \\bm{y}, \\bm{z}) &=
((${axes[0].x}, ${axes[0].y}, ${axes[0].z})^T,
(${axes[1].x}, ${axes[1].y}, ${axes[1].z})^T,
(${axes[2].x}, ${axes[2].y}, ${axes[2].z})^T) \\\\
(${symbols[0]}, ${symbols[1]}, ${symbols[2]}) &=
(${angles[0]}°, ${angles[1]}°, ${angles[2]}°) \\\\
(\\bm{X}, \\bm{Y}, \\bm{Z})
&= (\\bm{x}, \\bm{y}, \\bm{z})
R_${order[2].toLowerCase()}(${symbols[0]})
R_${order[1].toLowerCase()}(${symbols[1]})
R_${order[0].toLowerCase()}(${symbols[2]}) \\\\
&=
(\\bm{x}, \\bm{y}, \\bm{z})
${R1}${R2}${R3} \\\\
&= ${R} \\\\
&=
\\begin{pmatrix}
${m11.toFixed(digits)} & ${m12.toFixed(digits)} & ${m13.toFixed(digits)} \\\\
${m21.toFixed(digits)} & ${m22.toFixed(digits)} & ${m23.toFixed(digits)} \\\\
${m31.toFixed(digits)} & ${m32.toFixed(digits)} & ${m33.toFixed(digits)}
\\end{pmatrix}
\\end{align*}
`;

  return (
    <>
      <BlockMath math={formula} />
      <CopyToClipBoard text={RText}>
        <Button variant="contained">Copy Matrix Value</Button>
      </CopyToClipBoard>
    </>
  );
}
