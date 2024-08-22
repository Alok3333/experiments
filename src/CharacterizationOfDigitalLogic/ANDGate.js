import React, { useEffect, useState } from "react";
import styles from "./CharacterizationOfDigitalLogic.module.css";
import { Button, Grid } from "@mui/material";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import btnRed from "../assets/switchOff.png";
import btnGreen from "../assets/switchOn.png";

function ANDGate() {
  // State for button clicks
  const [btnClick1, setBtnClick1] = useState(false);
  const [btnClick2, setBtnClick2] = useState(false);
  const [btnClick3, setBtnClick3] = useState(false);

  // Determine which image to show based on button states
  const getImage = () => {
    if (btnClick1 && btnClick2 && btnClick3) return img5;
    if (btnClick1 && btnClick2) return img3;
    if (btnClick1 && btnClick3) return img4;
    if (btnClick1) return img2;
    return img1;
  };

  const handleButtonClick = (setter, value) => {
    setter(!value);
    if ((!btnClick1 && btnClick2) || (!btnClick1 && btnClick3)) {
      alert("First turn on switch 1");
    }
  };

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <h3>
            Verification and interpretation of truth table for AND, OR, NOT,
            NAND, NOR, Ex-OR, Ex-NOR gates.
          </h3>
          <div className={styles.cardWrapperFirstANDGate}>
            {/* images here */}
            <img
              src={getImage()}
              alt="nand1"
              className={styles.backgroundImageANDGate}
            />

            {/* Button images */}
            <img
              src={btnClick1 ? btnGreen : btnRed}
              className={styles.btnOffANDgate1}
              alt="redbtn"
              onClick={() => handleButtonClick(setBtnClick1, btnClick1)}
            />

            <img
              src={btnClick2 ? btnGreen : btnRed}
              className={styles.btnOffANDgate2}
              alt="redbtn"
              onClick={() => handleButtonClick(setBtnClick2, btnClick2)}
            />

            <img
              src={btnClick3 ? btnGreen : btnRed}
              className={styles.btnOffANDgate3}
              alt="redbtn"
              onClick={() => handleButtonClick(setBtnClick3, btnClick3)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default ANDGate;
