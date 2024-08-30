import React, { useState } from "react";
import styles from "./DragDrop.module.css";
import { Box, Grid } from "@mui/material";
import Draggable from "react-draggable";

function DragDrop() {
  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Box className={styles.cardWrapperFirstNANDGate}>
            <Box className={styles.leftBox}>
              <Box className={styles.txt1} draggable>
                left
              </Box>
              <Box className={styles.dropArea}></Box>
            </Box>
            <Box className={styles.rightBox}>
              <Box className={styles.txt2} draggable>
                right
              </Box>
              <Box className={styles.dropArea}></Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default DragDrop;
