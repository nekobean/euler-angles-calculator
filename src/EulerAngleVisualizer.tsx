import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import Box from "@mui/material/Box";
import RightArrow from "./assets/right-arrow.svg";

import Field from "./Grid";
import {
  rotationMatrixX,
  rotationMatrixY,
  rotationMatrixZ,
  changeBasis,
} from "./utils";
import Axis from "./Axis";
import Foamula from "./Formula";

interface EulerAngleVisualizerProps {
  axes: THREE.Vector3[];
  order: string;
  angles: number[];
  symbols?: string[];
}

export default function EulerAngleVisualizer({
  axes,
  order,
  angles,
  symbols = ["\\alpha", "\\beta", "\\gamma"],
}: EulerAngleVisualizerProps) {
  const origin = new THREE.Vector3(0, 0, 0);
  const axisLabel = [
    ["x", "y", "z"],
    ["x'", "y'", "z'"],
    ["x''", "y''", "z''"],
    ["X", "Y", "Z"],
  ];

  const [xAxis, yAxis, zAxis] = axes;
  const CanvasList = [];
  const InfoList = [];
  let [xAxis1, yAxis1, zAxis1] = [xAxis, yAxis, zAxis];
  for (let i = 0; i < 3; i++) {
    const rotationAxis = order[i];
    const rotationAngle = THREE.MathUtils.degToRad(angles[i]);
    const [xLabel1, yLabel1, zLabel1] = axisLabel[i];
    const [xLabel2, yLabel2, zLabel2] = axisLabel[i + 1];
    const rotationAxisLabel =
      rotationAxis === "X" ? xLabel1 : rotationAxis === "Y" ? yLabel1 : zLabel1;
    const rotationMatrix =
      rotationAxis === "X"
        ? rotationMatrixX(rotationAngle)
        : rotationAxis === "Y"
        ? rotationMatrixY(rotationAngle)
        : rotationMatrixZ(rotationAngle);

    // 基底変換を行う。
    const [xAxis2, yAxis2, zAxis2] = changeBasis(
      [xAxis1, yAxis1, zAxis1],
      rotationMatrix
    );

    CanvasList.push(
      <>
        <div className="viewer">
          <Canvas>
            <OrbitControls makeDefault />
            <PerspectiveCamera
              position={[2.5, 2.5, 2.5]}
              makeDefault
              near={0.01}
              far={100}
            />
            <Field />
            <Axis
              origin={origin}
              xHead={xAxis1}
              yHead={yAxis1}
              zHead={zAxis1}
              xLabel={xLabel1}
              yLabel={yLabel1}
              zLabel={zLabel1}
              labelMargin={0.1}
            />
            <Axis
              origin={origin}
              xHead={xAxis2}
              yHead={yAxis2}
              zHead={zAxis2}
              xLabel={xLabel2}
              yLabel={yLabel2}
              zLabel={zLabel2}
              labelMargin={0.25}
            />
          </Canvas>
        </div>
      </>
    );

    const angleText = `${symbols[i]} = ${THREE.MathUtils.radToDeg(
      rotationAngle
    ).toFixed(1)}°`;
    const convertionText = `(\\bm{${xLabel2}}, \\bm{${yLabel2}}, \\bm{${zLabel2}}) = (\\bm{${xLabel1}}, \\bm{${yLabel1}}, \\bm{${zLabel1}}) R_${rotationAxis.toLowerCase()}(${
      symbols[i]
    })`;

    InfoList.push(
      <>
        <table className="rotation-info">
          <thead>
            <tr>
              <td>回転軸</td>
              <td>回転角度</td>
              <td>基底変換</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InlineMath math={rotationAxisLabel} />
              </td>
              <td>
                <InlineMath math={angleText} />
              </td>
              <td>
                <InlineMath math={convertionText} />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );

    [xAxis1, yAxis1, zAxis1] = [xAxis2, yAxis2, zAxis2];
  }

  const [xLabel1, yLabel1, zLabel1] = axisLabel[0];
  const [xLabel2, yLabel2, zLabel2] = axisLabel[3];

  CanvasList.push(
    <>
      <div className="viewer">
        <Canvas>
          <OrbitControls makeDefault />
          <PerspectiveCamera
            position={[2.5, 2.5, 2.5]}
            makeDefault
            near={0.01}
            far={100}
          />
          <Field />
          <Axis
            origin={origin}
            xHead={xAxis}
            yHead={yAxis}
            zHead={zAxis}
            xLabel={xLabel1}
            yLabel={yLabel1}
            zLabel={zLabel1}
            labelMargin={0.1}
          />
          <Axis
            origin={origin}
            xHead={xAxis1}
            yHead={yAxis1}
            zHead={zAxis1}
            xLabel={xLabel2}
            yLabel={yLabel2}
            zLabel={zLabel2}
            labelMargin={0.25}
          />
        </Canvas>
      </div>
    </>
  );

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(5, 1fr)",
          width: "min-content",
        }}
      >
        {/* row 1 */}
        <Box>{CanvasList[0]}</Box>
        <Box sx={{ alignSelf: "center", textAlign: "center" }}>
          <img src={RightArrow} />
        </Box>
        <Box>{CanvasList[1]}</Box>
        <Box sx={{ alignSelf: "center", textAlign: "center" }}>
          <img src={RightArrow} />
        </Box>
        <Box>{CanvasList[2]}</Box>

        {/* row 2 */}
        <Box>{InfoList[0]}</Box>
        <Box></Box>
        <Box>{InfoList[1]}</Box>
        <Box></Box>
        <Box>{InfoList[2]}</Box>

        {/* row 3 */}
        <Box>{CanvasList[3]}</Box>
        <Box sx={{ gridColumn: "2 / 5" }}>
          <Foamula
            axes={axes}
            order={order}
            angles={angles}
            symbols={symbols}
          />
        </Box>
      </Box>
    </>
  );
}
