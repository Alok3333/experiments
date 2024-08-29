import React, { useState } from "react";
import styles from "./DragDrop.module.css";
import { Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import Draggable from "react-draggable";

const btnRed =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4024-switchOff.png";

const btnGreen =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4112-switchOn.png";

const img1 =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-28-5024-nand1.png";

const img2 =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-28-518-nand2.png";

const img3 =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-28-5138-nand3.png";

const img4 =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-28-5316-nand4.png";

const img5 =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-28-5355-nand5.png";

const batteryimg =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-28-3857-new_battery.png";

const lightoff =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-22-3936-bulboff.png";

const lighton =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-22-4010-bulbon.png";

function NANDGate() {
  // State for button clicks
  const [btnClick1, setBtnClick1] = useState(false);
  const [btnClick2, setBtnClick2] = useState(false);
  const [btnClick3, setBtnClick3] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // State for battery image position and target area
  const [shiftBattery, setShiftBattery] = useState(false);
  const [batteryPosition, setBatteryPosition] = useState({ x: -30, y: 350 });
  const [batteryInTarget, setBatteryInTarget] = useState(false);

  // Define target area bounds
  const targetArea = { right: 20, top: 154, width: 137, height: 192 }; // Adjust 'right' value as needed

  // Determine which image to show based on button states
  const getImage = () => {
    if (shiftBattery) {
      if (btnClick1 && btnClick2 && btnClick3) return img5;
      if (btnClick1 && btnClick2) return img3;
      if (btnClick1 && btnClick3) return img4;
      if (btnClick1) return img2;
    }
    return img1;
  };

  // Checking if all buttons are on then turn on the light
  const getImageLight = () => {
    if (shiftBattery && btnClick1 && btnClick2 && btnClick3) return lightoff;
    if (
      (shiftBattery && btnClick1) ||
      (shiftBattery && btnClick1 && btnClick2) ||
      (shiftBattery && btnClick1 && btnClick3)
    )
      return lighton;
    return lightoff;
  };

  const handleButtonClick = (setter, value) => {
    if (batteryInTarget) {
      // Only allow button clicks if battery is in the target area
      setter(!value);
      if (shiftBattery) {
        if ((!btnClick1 && !btnClick2) || (!btnClick1 && btnClick3)) {
          enqueueSnackbar(
            "Please turn off switch. You should first turn on switch 1",
            {
              autoHideDuration: 2000,
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              preventDuplicate: true,
            }
          );
        }
      } else {
        enqueueSnackbar("Connect the battery", {
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          preventDuplicate: true,
        });
      }
    } else {
      enqueueSnackbar(
        "Place the battery in the target area to interact with the switches",
        {
          autoHideDuration: 2000,
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          preventDuplicate: true,
        }
      );
    }
  };

  const handleBatteryClick = () => {
    setShiftBattery(!shiftBattery);
  };

  const handleDrag = (e, data) => {
    setBatteryPosition({ x: data.x, y: data.y });
  };

  const handleStop = (e, data) => {
    // Check if the battery is within the target area
    const { x, y } = data;
    if (
      x >= window.innerWidth - targetArea.right - targetArea.width &&
      x <= window.innerWidth - targetArea.right &&
      y >= targetArea.top &&
      y <= targetArea.top + targetArea.height
    ) {
      setBatteryInTarget(true);
    } else {
      setBatteryInTarget(false);
    }
  };

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Box className={styles.cardWrapperFirstNANDGate}>
            <Box className={styles.leftBox}>
              <Box className={styles.txt1} draggable>left</Box>
            </Box>
            <Box className={styles.rightBox}>
              <Box className={styles.txt2} draggable>right</Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default NANDGate;
