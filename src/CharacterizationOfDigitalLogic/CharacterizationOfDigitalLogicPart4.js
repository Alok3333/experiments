import React, { useEffect, useState } from "react";
import styles from "./CharacterizationOfDigitalLogic.module.css";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
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

const boxBtnOff =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4024-switchOff.png";

const boxBtnOn =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4112-switchOn.png";

// Register ChartJS components
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
  labels: [
    0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2,
    3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5,
  ],
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

const boxValue = {
  0: 3.94,
  0.2: 3.92,
  0.4: 3.76,
  0.6: 3.53,
  0.8: 3.22,
  1: 2.02,
  1.2: 0.31,
  1.4: 0.17,
  1.6: 0.15,
  1.8: 0.15,
  2: 0.15,
  2.2: 0.15,
  2.4: 0.15,
  2.6: 0.15,
  2.8: 0.15,
  3: 0.15,
  3.2: 0.15,
  3.4: 0.15,
  3.6: 0.15,
  3.8: 0.15,
  4: 0.15,
  4.2: 0.15,
  4.4: 0.15,
  4.6: 0.15,
  4.8: 0.15,
  5: 0.15,
};

// Component
function CharacterizationOfDigitalLogicPart4() {
  const [isRedOne, setIsRedOne] = useState(false);
  const [isRedTwo, setIsRedTwo] = useState(false);
  const [isRedThree, setIsRedThree] = useState(false);
  const [isRedFour, setIsRedFour] = useState(false);
  const [isRedFive, setIsRedFive] = useState(false);
  const [isRedSix, setIsRedSix] = useState(false);

  // Arrow state for all buttons
  const [isRotateArrow, setIsRotateArrow] = useState(11);
  const [isRotateArrowThree, setIsRotateArrowThree] = useState(13);
  const [isRotateArrowFive, setIsRotateArrowFive] = useState(15);
  const [isRotateArrowSeven, setIsRotateArrowSeven] = useState(17);
  const [isRotateArrowNine, setIsRotateArrowNine] = useState(19);
  const [isRotateArrowEleven, setIsRotateArrowEleven] = useState(21);

  // This state for updating arrow
  const [isRotating, setIsRotating] = useState(true);
  const [isRotatingTwo, setIsRotatingTwo] = useState(true);
  const [isRotatingThree, setIsRotatingThree] = useState(true);
  const [isRotatingFour, setIsRotatingFour] = useState(true);
  const [isRotatingFive, setIsRotatingFive] = useState(true);
  const [isRotatingSix, setIsRotatingSix] = useState(true);

  // State for Figure
  const [showFigureImageLow, setShowFigureImageLow] = useState(false);
  const [showFigureImageHigh, setShowFigureImageHigh] = useState(false);

  // Using notiStack for showing error message
  const { enqueueSnackbar } = useSnackbar();

  // State for range
  const [val, setVal] = useState(0);
  const [displayValue, setDisplayValue] = useState(boxValue[val]);

  // State for figure image
  const [showFigure, setShowFigure] = useState(false);
  const [showFigureImage, setShowFigureImage] = useState(false);

  useEffect(() => {
    setDisplayValue(boxValue[val]);

    if (val === 5) {
      setShowFigure(true);
    } else {
      setShowFigure(false);
    }
  }, [val]);

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };

  // HandleClick for buttons
  const handleRotate = () => {
    setIsRedOne(!isRedOne);
    setIsRotateArrow((prev) => (isRotating ? prev + 1 : prev - 1));
    setIsRotating(!isRotating);
  };

  const handleRotate1 = () => {
    setIsRedThree(!isRedThree);
    setIsRotateArrowFive((prev) => (isRotatingThree ? prev + 1 : prev - 1));
    setIsRotatingThree(!isRotatingThree);
  };

  const handleRotate2 = () => {
    setIsRedTwo(!isRedTwo);
    setIsRotateArrowThree((prev) => (isRotatingTwo ? prev + 1 : prev - 1));
    setIsRotatingTwo(!isRotatingTwo);
  };

  const handleRotate3 = () => {
    setIsRedFour(!isRedFour);
    setIsRotateArrowSeven((prev) => (isRotatingFour ? prev + 1 : prev - 1));
    setIsRotatingFour(!isRotatingFour);
  };

  const handleRotate4 = () => {
    setIsRedFive(!isRedFive);
    setIsRotateArrowNine((prev) => (isRotatingFive ? prev + 1 : prev - 1));
    setIsRotatingFive(!isRotatingFive);
  };

  const handleRotate5 = () => {
    setIsRedSix(!isRedSix);
    setIsRotateArrowEleven((prev) => (isRotatingSix ? prev + 1 : prev - 1));
    setIsRotatingSix(!isRotatingSix);
  };

  // Snackbar message for errors
  if (isRedOne || isRedFour) {
    enqueueSnackbar("Connect VCC and Ground properly", {
      variant: "error",
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      preventDuplicate: true,
    });
  }

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <div className={styles.cardWrapperFirst}>
            <div className={styles.wrapper}>
              <Box
                sx={{
                  width: "108px",
                  position: "absolute",
                  zIndex: 2,
                  bottom: "293px",
                  left: "17px",
                  padding: "0",
                }}
              >
                <Slider
                  // marks={marks}
                  step={0.2}
                  value={val}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  minWidth: "62px",
                  background: "green",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "2px 2px 8px grey",
                  position: "absolute",
                  zIndex: 2,
                  bottom: "201px",
                  right: "87px",
                }}
              >
                <Typography>{displayValue}</Typography>
              </Box>
              <Box
                sx={{
                  minWidth: "62px",
                  background: "green",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "2px 2px 8px grey",
                  position: "absolute",
                  zIndex: 2,
                  bottom: "172px",
                  right: "87px",
                }}
              >
                <Typography>{displayValue}</Typography>
              </Box>

              <Box
                sx={{
                  minWidth: "62px",
                  background: "green",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "2px 2px 8px grey",
                  position: "absolute",
                  zIndex: 2,
                  bottom: "139px",
                  right: "87px",
                }}
              >
                <Typography>{displayValue}</Typography>
              </Box>

              <Box
                sx={{
                  minWidth: "62px",
                  background: "green",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "2px 2px 8px grey",
                  position: "absolute",
                  zIndex: 2,
                  bottom: "104px",
                  right: "87px",
                }}
              >
                <Typography>{displayValue}</Typography>
              </Box>

              {/* CharacterizationOfDigitalLogic nand-1 image here */}
              <img
                src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-14-270-nand.png"
                alt="nand1"
                className={styles.backgroundNandImage}
              />

              {/* Switch Button On & Off here */}
              <img
                src={isRedOne ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={isRedOne ? styles.offbtn11 : styles.onbtn11}
                onClick={handleRotate}
              />

              <img
                src={!isRedTwo ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={!isRedTwo ? styles.offbtn12 : styles.onbtn12}
                onClick={handleRotate2}
              />

              <img
                src={!isRedThree ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={!isRedThree ? styles.offbtn13 : styles.onbtn13}
                onClick={handleRotate1}
              />

              <img
                src={isRedFour ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={isRedFour ? styles.offbtn14 : styles.onbtn14}
                onClick={handleRotate3}
              />

              <img
                src={!isRedFive ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={!isRedFive ? styles.offbtn15 : styles.onbtn15}
                onClick={handleRotate4}
              />

              <img
                src={!isRedSix ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={!isRedSix ? styles.offbtn16 : styles.onbtn16}
                onClick={handleRotate5}
              />

              {/* Arrow line */}
              <div
                className={`${styles.arrow} ${
                  styles[`rotate${isRotateArrow}`]
                }`}
              ></div>

              <div
                className={`${styles.arrowDivEle} ${
                  styles[`rotate${isRotateArrowThree}`]
                }`}
              ></div>

              <div
                className={`${styles.arrowDivEle} ${
                  styles[`rotate${isRotateArrowFive}`]
                }`}
              ></div>

              <div
                className={`${styles.arrowDivEle} ${
                  styles[`rotate${isRotateArrowSeven}`]
                }`}
              ></div>

              <div
                className={`${styles.arrowDivEle} ${
                  styles[`rotate${isRotateArrowNine}`]
                }`}
              ></div>

              <div
                className={`${styles.arrowDivEle} ${
                  styles[`rotate${isRotateArrowEleven}`]
                }`}
              ></div>
            </div>
          </div>

          {/* Figure image */}
          {showFigure && (
            <>
              <div className={styles.cardWrapperSecond}>
                <Button onClick={() => setShowFigureImage(!showFigureImage)}>
                  Characteristic Plot
                </Button>
                {showFigureImage && (
                  <Line data={chartData} options={chartOptions} />
                )}
              </div>

              {/* Low-high/high-low graph image */}
              <div className={styles.cardWrapperLowHighImage}>
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
                      className={styles.lowGraphImagepart4}
                    />
                  </div>
                )}
                {showFigureImageHigh && (
                  <div>
                    <img
                      src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-12-5110-ch-part3-high.png"
                      className={styles.highGraphImagepart4}
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

export default CharacterizationOfDigitalLogicPart4;
