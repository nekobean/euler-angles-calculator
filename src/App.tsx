import { useState } from "react";
import * as THREE from "three";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import EulerAngleVisualizer from "./EulerAngleVisualizer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { InlineMath } from "react-katex";
import Button from "@mui/material/Button";

import "./App.css";

function EulerRotation() {
  const orientations = {
    right: [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
    ],
    left: [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, 1),
    ],
  };

  const orderList = [
    "XYX",
    "XZX",
    "YXY",
    "YZY",
    "ZXZ",
    "ZYZ",
    "XYZ",
    "XZY",
    "YXZ",
    "YZX",
    "ZXY",
    "ZYX",
  ];

  const SymbolList = [
    "\\alpha",
    "\\beta",
    "\\gamma",
    "\\psi",
    "\\theta",
    "\\phi",
    "\\textit{roll}",
    "\\textit{pitch}",
    "\\textit{yaw}",
    "\\theta_x",
    "\\theta_y",
    "\\theta_z",
    "\\theta_1",
    "\\theta_2",
    "\\theta_3",
  ];

  const [axes, setAxes] = useState(orientations.right);
  const [order, setOrder] = useState("ZYX");
  const [angles, setAngles] = useState([0, 0, 0]);
  const [symbols, setSymbols] = useState(["\\alpha", "\\beta", "\\gamma"]);

  return (
    <>
      <h1>オイラー角 計算ツール (Euler Angle Calculator)</h1>

      <Box sx={{ maxWidth: "max-content" }}>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, auto)",
            width: "max-content",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            border: "1px solid #ccc",
            p: "10px",
          }}
        >
          {/* 軸の種類 */}
          <Box>軸の方向 (Orientation)</Box>
          <Box>
            <RadioGroup
              row
              onChange={(event) => {
                const newValue = event.target
                  .value as keyof typeof orientations;
                setAxes(orientations[newValue]);
              }}
              defaultValue="right"
            >
              <FormControlLabel
                value="right"
                control={<Radio />}
                label="右手系 (right-handed)"
              />
              <FormControlLabel
                value="left"
                control={<Radio />}
                label="左手系 (left-handed)"
              />
            </RadioGroup>
          </Box>
          {/* 軸の種類 */}
          <Box>軸の順番 (Order)</Box>
          <Box>
            <Select
              size="small"
              onChange={(event: SelectChangeEvent) => {
                const newValue = event.target.value;
                setOrder(newValue);
              }}
              style={{ width: 100 }}
              value={order}
            >
              {orderList.map((x) => {
                return (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          {/* オイラー角 */}
          <Box>オイラー角 (Euler Angles)</Box>
          <Box>
            <Stack direction="row" spacing={1}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">°</InputAdornment>
                  ),
                }}
                size="small"
                type="number"
                value={angles[0]}
                style={{ width: 100 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = Number(event.target.value);
                  setAngles([newValue, angles[1], angles[2]]);
                }}
                inputProps={{
                  min: -360,
                  max: 360,
                  step: 1,
                }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">°</InputAdornment>
                  ),
                }}
                size="small"
                type="number"
                value={angles[1]}
                style={{ width: 100 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = Number(event.target.value);
                  setAngles([angles[0], newValue, angles[2]]);
                }}
                inputProps={{
                  min: -360,
                  max: 360,
                  step: 1,
                }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">°</InputAdornment>
                  ),
                }}
                size="small"
                type="number"
                value={angles[2]}
                style={{ width: 100 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = Number(event.target.value);
                  setAngles([angles[0], angles[1], newValue]);
                }}
                inputProps={{
                  min: -360,
                  max: 360,
                  step: 1,
                }}
              />
              <Button variant="contained" onClick={() => setAngles([0, 0, 0])}>
                リセット
              </Button>
            </Stack>
          </Box>
          {/* 記号 */}
          <Box>記号 (Symbols)</Box>
          <Box>
            <Stack direction="row" spacing={1}>
              <Select
                size="small"
                onChange={(event: SelectChangeEvent) => {
                  const newValue = event.target.value;
                  setSymbols([newValue, symbols[1], symbols[2]]);
                }}
                style={{ width: 100 }}
                value={symbols[0]}
              >
                {SymbolList.map((x) => {
                  return (
                    <MenuItem key={x} value={x}>
                      <InlineMath math={x} />
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                size="small"
                onChange={(event: SelectChangeEvent) => {
                  const newValue = event.target.value;
                  setSymbols([symbols[0], newValue, symbols[2]]);
                }}
                style={{ width: 100 }}
                value={symbols[1]}
              >
                {SymbolList.map((x) => {
                  return (
                    <MenuItem key={x} value={x}>
                      <InlineMath math={x} />
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                size="small"
                onChange={(event: SelectChangeEvent) => {
                  const newValue = event.target.value;
                  setSymbols([symbols[0], symbols[1], newValue]);
                }}
                style={{ width: 100 }}
                value={symbols[2]}
              >
                {SymbolList.map((x) => {
                  return (
                    <MenuItem key={x} value={x}>
                      <InlineMath math={x} />
                    </MenuItem>
                  );
                })}
              </Select>
              <Button
                variant="contained"
                onClick={() =>
                  setSymbols([SymbolList[0], SymbolList[1], SymbolList[2]])
                }
              >
                リセット
              </Button>
            </Stack>
          </Box>
        </Box>

        <EulerAngleVisualizer
          axes={axes}
          order={order}
          angles={angles}
          symbols={symbols}
        />
      </Box>
    </>
  );
}

function App() {
  return (
    <>
      <EulerRotation />
    </>
  );
}

export default App;
