import React, { useEffect, useState } from "react";
import styles from "./CharacterizationOfDigitalLogic.module.css";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Data for the Line Chart
const data = {
  labels: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  values: [
    3.94, 3.92, 3.76, 3.53, 3.22, 2.02, 0.31, 0.17, 0.15, 0.15, 0.15, 0.15,
    0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15,
    0.15, 0.15,
  ],
};

const chartData = {
  labels: data.labels,
  datasets: [
    {
      label: "My Line Chart",
      data: data.values,
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `Value: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "NAND-2 INPUT[V]",
      },
    },
    y: {
      title: {
        display: true,
        text: "NAND-2 OUTPUT[V]",
      },
    },
  },
};

const LineChart = () => {
  return <Line data={chartData} options={chartOptions} />;
};

function DigitalLogicFamiliesPart3() {
  // State for range
  const [val, setVal] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  // State for figure image
  const [showFigure, setShowFigure] = useState(false);
  const [showFigureImage, setShowFigureImage] = useState(false);
  const [showFigureImageLow, setShowFigureImageLow] = useState(false);
  const [showFigureImageHigh, setShowFigureImageHigh] = useState(false);

  useEffect(() => {
    setDisplayValue(val);

    if (val === 5) {
      setShowFigure(true);
    } else {
      setShowFigure(false);
    }
  }, [val]);

  const handleChange = (_, newValue) => {
    setVal(newValue);
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
                  step={0.2}
                  value={val}
                  valueLabelDisplay="auto"
                  onChange={handleChange}
                  min={0}
                  max={5}
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
                <Typography>{displayValue.toFixed(2)}</Typography>
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
                <Typography>{val.toFixed(2)}</Typography>
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
                {showFigureImage && <LineChart />}
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
                {showFigureImageLow && (
                  <div>
                    <img
                      src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-12-5018-ch-part3-low.png"
                      className={styles.lowGraphImage}
                    />
                  </div>
                )}
                {showFigureImageHigh && (
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
