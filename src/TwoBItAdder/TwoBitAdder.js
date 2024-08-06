import React, { useState } from "react";
import styles from "./TwoBitAdder.module.css";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const circleOff1 =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-355-circleBtnOn.png";

const circleOn1 =
  " https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4059-circleBtnOff.png";

const circleOff =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4024-switchOff.png";

const circleOn =
  "https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-5-4112-switchOn.png";

function createData(inputA, inputB, inputC, carry, sum) {
  return { inputA, inputB, inputC, carry, sum };
}

const rows = [
  createData(0, 0, 0, 0, 0),
  createData(0, 0, 1, 0, 1),
  createData(0, 1, 0, 0, 1),
  createData(0, 1, 1, 1, 0),
  createData(1, 0, 0, 0, 1),
  createData(1, 0, 1, 1, 0),
  createData(1, 1, 0, 1, 0),
  createData(1, 1, 1, 1, 1),
];

function TwoBitAdder() {
  const [isRedOne, setIsRedOne] = useState(false);
  const [isRedTwo, setIsRedTwo] = useState(false);
  const [isRedThree, setIsRedThree] = useState(false);
  const [isRedFour, setIsRedFour] = useState(false);
  const [isInputC, setIsInputC] = useState(false);
  const [isInput1, setIsInput1] = useState(false);
  const [isInput2, setIsInput2] = useState(false);

  const lightOn = isRedOne || isRedTwo;
  const lightOn1 = isRedOne && isRedTwo;
  const lightOn2 = isInput1 || isInput2;
  const lightOn3 = isInput1 && isInput2;

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <div className={styles.csstop}>
            <div className={styles.wrapper}>
              <img
                src="https://jadavpuruniversity.s3-ap-south-1.amazonaws.com/8-2024-6-1023-2bitadd.png"
                alt="Combinational Circuit"
                className="background-image"
              />

              <img
                src={!isRedOne ? circleOff : circleOn}
                alt="offbtn"
                className={`isRedOne ? ${styles.offbtn1} : ${styles.onbtn1}`}
                onClick={() => setIsRedOne(!isRedOne)}
              />

              <img
                src={!isRedTwo ? circleOff : circleOn}
                alt="offbtn"
                className={`isRedOne ? ${styles.offbtn2} : ${styles.onbtn2}`}
                onClick={() => setIsRedTwo(!isRedTwo)}
              />

              <img
                src={!isInputC ? circleOff : circleOn}
                alt="offbtn"
                className={`isInputC ? ${styles.offbtn7} : ${styles.onbtn7}`}
                onClick={() => setIsInputC(!isInputC)}
              />

              <img
                src={!isInput1 ? circleOff : circleOn}
                alt="offbtn"
                className={`isInput1 ? ${styles.offbtn9} : ${styles.onbtn9}`}
                onClick={() => setIsInput1(!isInput1)}
              />

              <img
                src={!isInput2 ? circleOff : circleOn}
                alt="offbtn"
                className={`isInput2 ? ${styles.offbtn8} : ${styles.onbtn8}`}
                onClick={() => setIsInput2(!isInput2)}
              />

              {/* Circle Off Buttons */}
              <img src={circleOff1} alt="offbtn" className={styles.offbtn3} />
              <img src={circleOff1} alt="offbtn" className={styles.offbtn10} />
              <img src={circleOff1} alt="offbtn" className={styles.offbtn5} />

              {lightOn && !lightOn1 && (
                <img
                  src={circleOn1}
                  alt="offbtn"
                  className={styles.onbtn4}
                  onClick={() => setIsRedThree(!isRedThree)}
                />
              )}

              {lightOn1 && (
                <img
                  src={circleOn1}
                  alt="offbtn"
                  className={styles.onbtn6}
                  onClick={() => setIsRedFour(!isRedFour)}
                />
              )}

              {lightOn2 && (
                <img src={circleOn1} alt="offbtn" className={styles.onbtn11}/>
              )}

              {isInputC && (<img src={circleOn1} alt="offbtn" className={styles.onbtn11}/>)}

              {lightOn3 && !lightOn2 && (<img src={circleOn1} alt="offbtn" className={styles.onbtn4}/>)}
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="css-card">
            <Typography sx={{ paddingBottom: "16px" }}>
              Truth Table&nbsp;(On-1 & Off-0)
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Input-A</TableCell>
                    <TableCell align="right">Input-B</TableCell>
                    <TableCell align="right">Input-C</TableCell>
                    <TableCell align="right">Carry</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.inputA}
                      </TableCell>
                      <TableCell align="right">{row.inputB}</TableCell>
                      <TableCell align="right">{row.inputC}</TableCell>
                      <TableCell align="right">{row.carry}</TableCell>
                      <TableCell align="right">{row.sum}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default TwoBitAdder;
