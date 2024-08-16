import React, { useState } from "react";
import styles from "./CharacterizationOfDigitalLogic.module.css";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";

const boxBtnOff =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4024-switchOff.png";

const boxBtnOn =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4112-switchOn.png";

const lightoffbtn =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-5510-bulboff.png";

const lightonbtn =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-5543-bulbon.png";

const greenLine =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-057-green-line-preview.png";

const redLine =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-2846-red-line-preview.png";

function Resistor1() {
  const [isRedOne, setIsRedOne] = useState(false);
  const [isRedTwo, setIsRedTwo] = useState(false);
  const [isRedThree, setIsRedThree] = useState(false);

  // state for light on & off bulf
  const [isBatteryConnect, setIsBatteryConnect] = useState(false);

  const handleClickBattery = () => {
    console.log(isBatteryConnect, "true");
    setIsBatteryConnect(isBatteryConnect);
  };

  // Using notiStack for showing error message
  const { enqueueSnackbar } = useSnackbar();

  // HandleClick for 1st button
  const handleRotate = () => {
    setIsRedOne(!isRedOne);
  };

  // HandleClick for 3rd button
  const handleRotate1 = () => {
    setIsRedThree(!isRedThree);
  };

  // HandleClick for 2rd button
  const handleRotate2 = () => {
    setIsRedTwo(!isRedTwo);
  };

  // Written enquesnackbar message here
  if (isRedThree && !isBatteryConnect) {
    enqueueSnackbar("Connect Battery First!", {
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
              {/* Resistor-1 image here */}
              <img
                src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-2236-resistor.png"
                alt="resistor1"
                className={styles.backgroundImageResistor1}
              />

              {/*Switch Button On & Off here*/}
              {/* First button */}
              <img
                src={isRedOne ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={`isRedOne ? ${styles.offbtnResistor1} : ${styles.onbtnResistor1}`}
                onClick={handleRotate}
              />

              {/* Second button */}
              <img
                src={!isRedTwo ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={`isRedTwo ? ${styles.offbtnResistor2} : ${styles.onbtnResistor2}`}
                onClick={handleRotate2}
              />

              {/* Third button */}
              <img
                src={!isRedThree ? boxBtnOff : boxBtnOn}
                alt="off&onbtn"
                className={`isRedThree ? ${styles.offbtnResistor3} : ${styles.onbtnResistor3}`}
                onClick={handleRotate1}
              />

              {/* bulf image off-light */}
              {isRedThree && isBatteryConnect ? (
                <img
                  src={greenLine}
                  alt="off&onlight"
                  className={styles.greenlinelight}
                />
              ) : (
                <img
                  src={redLine}
                  alt="off&onlight"
                  className={styles.redlinelight}
                />
              )}

              {/* battery image */}
              {isBatteryConnect ? (
                <img
                  src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-3724-battery-preview.png"
                  alt="battery"
                  className={styles.battery}
                  onClick={handleClickBattery}
                />
              ) : (
                <img
                  src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-3724-battery-preview.png"
                  alt="battery"
                  className={styles.move}
                  onClick={handleClickBattery}
                />
              )}
              {/* <img
                src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-16-3724-battery-preview.png"
                alt="battery"
                className={`isBatteryConnect ? ${styles.battery} : ${styles.move}`}
                onClick={handleClickBattery}
              /> */}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Resistor1;
