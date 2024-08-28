import React, { useState } from "react";
import styles from "../virtuallabcss/NANDGate.module.css";
import { Box, Grid } from "@mui/material";
// import img1 from "../assets/nand1.png";
// import img2 from "../assets/nand2.png";
// import img3 from "../assets/nand3.png";
// import img4 from "../assets/nand4.png";

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

  // State for battery image position
  const [shiftBattery, setShiftBattery] = useState(false);

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

  // Checking if all button on then trun on the light
  const getImageLight = () => {
    if(shiftBattery && btnClick1 && btnClick2 && btnClick3) return lightoff;
    if (shiftBattery && (btnClick1 || btnClick2 || btnClick1)) return lighton;
    return lightoff;
  };

  const handleButtonClick = (setter, value) => {
    // console.log(setter(!value), "setter")
    setter(!value);
    if (shiftBattery) {
      if ((!btnClick1 && btnClick2) || (!btnClick1 && btnClick3)) {
        alert("First turn on switch 1");
      }
    } else {
      alert("Connect the battery");
    }
  };

  const handleBatteryClick = () => {
    setShiftBattery(!shiftBattery);
  };

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <h3>
            Verification and interpretation of truth table for AND, OR, NOT,
            NAND, NOR, Ex-OR, Ex-NOR gates.
          </h3>
          <Box className={styles.cardWrapperFirstNANDGate}>
            <Box className={styles.instrauctionwrapper}>
              <h3>
                <span className={styles.unText}>INSTRUCTIONS</span>
              </h3>
              <ol>
                <li>Connect the battery first.</li>
                <li>
                  Press the switch 1 for the battery to be connected to the
                  circuit.
                </li>
                <li>Press the switch 2 for input A.</li>
                <li>
                  The{" "}
                  <span style={{ color: "red", fontWeight: "600" }}>LED</span>{" "}
                  glows if the switch 2 is{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "red",
                      fontWeight: "600",
                    }}
                  >
                    OFF
                  </span>{" "}
                  and doesn't glow if the swicth 2 is{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "green",
                      fontWeight: "600",
                    }}
                  >
                    ON
                  </span>
                  .
                </li>
              </ol>
              <h3>
                <span className={styles.unText}>SPECIFICATIONS</span>
              </h3>
              <ol>
                <li>Battery = 5V</li>
                <li>Resistor R1 = 1 kohm, R2= 10 Kohm</li>
                <li>Transistor = NPN 2N3904</li>
              </ol>
            </Box>
          </Box>
          <div className={styles.cardWrapperFirstNANDGate}>
            <div className={styles.titleNandGate}>
              <marquee>
                <h3>
                  Experiment to perform NAND gate on kit. NAND gate using
                  Resistor-Transistor Logic(RTL)
                </h3>
              </marquee>
            </div>
            {/* Displaying the image based on button states */}
            <img
              src={getImage()}
              alt="AND logic gate"
              className={styles.backgroundImageNANDGate}
            />

            {/* Battery image with dynamic position */}
            <img
              src={batteryimg}
              alt="battery"
              className={styles.backgroundImageNANDGateBattery}
              style={{
                transform: shiftBattery ? "translateX(-26px)" : "translateX(0)",
              }}
              onClick={handleBatteryClick}
            />

            {/* Light image with trun on & off */}
            <img
              src={getImageLight()}
              alt="lighton&off"
              className={styles.backgroundImageNANDGateLight}
            />

            {/* Button images */}
            <img
              src={btnClick1 ? btnGreen : btnRed}
              className={styles.btnOffNANDgate1}
              alt="button1"
              onClick={() => handleButtonClick(setBtnClick1, btnClick1)}
            />

            <img
              src={btnClick2 ? btnGreen : btnRed}
              className={styles.btnOffNANDgate2}
              alt="button2"
              onClick={() => handleButtonClick(setBtnClick2, btnClick2)}
            />

            <img
              src={btnClick3 ? btnGreen : btnRed}
              className={styles.btnOffNANDgate3}
              alt="button3"
              onClick={() => handleButtonClick(setBtnClick3, btnClick3)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default NANDGate;
