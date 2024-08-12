import React, { useEffect, useState } from "react";
import styles from "./CharacterizationOfDigitalLogic.module.css";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import CanvasJSReact from "@canvasjs/react-charts";

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MAX = 5;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

const boxValue = {
  0: 5,
  0.2: 5,
  0.4: 5,
  0.6: 5,
  0.8: 5,
  1: 4.99,
  1.2: 4.96,
  1.4: 4.91,
  1.6: 4.84,
  1.8: 4.73,
  2: 4.58,
  2.2: 4.35,
  2.4: 3.92,
  2.6: 1.77,
  2.8: 1.07,
  3: 0.7,
  3.2: 0.45,
  3.4: 0.28,
  3.6: 0.16,
  3.8: 0.08,
  4: 0.03,
  4.2: 0,
  4.4: 0,
  4.6: 0,
  4.8: 0,
  5: 0,
};

function DigitalLogicFamiliesPart3() {
  // State for range
  const [val, setVal] = useState(MIN);
  const [displayValue, setDisplayValue] = useState(boxValue[MIN]);

  // State for figure image
  const [showFigure, setShowFigure] = useState(false);
  const [showFigureImage, setShowFigureImage] = useState(false);
  const [showFigureImageLow, setShowFigureImageLow] = useState(false);
  const [showFigureImageHigh, setShowFigureImageHigh] = useState(false);

  useEffect(() => {
    setDisplayValue(boxValue[val]);

    if (val === MAX) {
      setShowFigure(true);
    } else {
      setShowFigure(false);
    }
  }, [val]);

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };

  // Data of Graph
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "TTL NAND GATE GRAPH",
    },
    axisY: {
      title: "NAND-2 output((v)",
      suffix: "",
      minimum: 0,
      maximum: 5,
      interval: 0,
    },
    axisX: {
      title: "NAND-2 Input (v)",
      prefix: "",
      minimum: 0,
      maximum: 5,
      interval: 2,
    },
    data: [
      {
        type: "line",
        toolTipContent: "V_Out {x}: {y}",
        dataPoints: [
          { x: 0, y: 5 },
          { x: 0.2, y: 5 },
          { x: 0.4, y: 5 },
          { x: 0.6, y: 5 },
          { x: 0.8, y: 5 },
          { x: 1, y: 4.99 },
          { x: 1.2, y: 4.96 },
          { x: 1.4, y: 4.91 },
          { x: 1.6, y: 4.84 },
          { x: 1.8, y: 4.73 },
          { x: 2, y: 4.58 },
          { x: 2.2, y: 4.35 },
          { x: 2.4, y: 3.92 },
          { x: 2.6, y: 1.77 },
          { x: 2.8, y: 1.07 },
          { x: 3, y: 0.7 },
          { x: 3.2, y: 0.45 },
          { x: 3.4, y: 0.28 },
          { x: 3.6, y: 0.16 },
          { x: 3.8, y: 0.08 },
          { x: 4, y: 0.03 },
          { x: 4.2, y: 0 },
          { x: 4.4, y: 0 },
          { x: 4.6, y: 0 },
          { x: 4.8, y: 0 },
          { x: 5, y: 0 },
        ],
      },
    ],
  };

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <div className={styles.cardWrapperFirst}>
            <div className={styles.wrapper}>
              <Box
                sx={{
                  width: 155,
                  position: "absolute",
                  zIndex: 2,
                  bottom: "210px",
                  left: "60px",
                  padding: "0",
                }}
              >
                <Slider
                  marks={marks}
                  step={0.2}
                  value={val}
                  valueLabelDisplay="auto"
                  min={MIN}
                  max={MAX}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  minWidth: "62px",
                  background: "rebeccapurple",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "4px -4px 0px #000",
                  position: "absolute",
                  zIndex: 2,
                  top: "243px",
                  right: "47px",
                }}
              >
                <Typography>{displayValue}</Typography>
              </Box>
              <Box
                sx={{
                  minWidth: "62px",
                  background: "rebeccapurple",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "4px -4px 0px #000",
                  position: "absolute",
                  zIndex: 2,
                  bottom: "185px",
                  left: "110px",
                }}
              >
                <Typography>{val}</Typography>
              </Box>

              {/* CharacterizationOfDigitalLogic nand-1 image here */}
              <img
                src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-12-5614-basic-logic-families-part3.png"
                alt="nand1"
                className={styles.backgroundImage}
              />
            </div>
          </div>

          {/* Figure image */}
          {showFigure && (
            <>
              <div className={styles.cardWrapperSecond}>
                <Button onClick={() => setShowFigureImage(!showFigureImage)}>
                  Characteristic Plot Graph
                </Button>
                {!showFigureImage && (
                  <div>
                    <CanvasJSChart
                      options={options}
                    />
                  </div>
                )}
              </div>
              <div className={styles.cardWrapperSecond}>
                <Button
                  onClick={() => setShowFigureImageLow(!showFigureImageLow)}
                >
                  Characteristic Low-High
                </Button>
                <Button
                  onClick={() => setShowFigureImageHigh(!showFigureImageHigh)}
                >
                  Characteristic High-Low
                </Button>
                {!showFigureImageLow && (
                  <div>
                    <img
                      src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-12-5018-ch-part3-low.png"
                      className={styles.lowGraphImage}
                    />
                  </div>
                )}
                {!showFigureImageHigh && (
                  <div>
                    <img
                      src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-12-5110-ch-part3-high.png"
                      className={styles.highGraphImage}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default DigitalLogicFamiliesPart3;
