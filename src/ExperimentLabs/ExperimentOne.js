import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, colorName, digit, multiplier, tolerance) {
  return { name, colorName, digit, multiplier, tolerance };
}

const colorMap = {
  Black: "#000000",
  Brown: "#8B4513",
  Red: "#FF0000",
  Orange: "#FFA500",
  Yellow: "#FFFF00",
  Green: "#008000",
  Blue: "#0000FF",
  Violet: "#8A2BE2",
  Grey: "#808080",
  White: "#FFFFFF",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  None: "#FFFFFF", // No color
};

const rows = [
  createData("", "Black", 0, "10^0", ""),
  createData("Ice cream sandwich", "Brown", 1, "10^1", 1),
  createData("Eclair", "Red", 2, "10^2", 2),
  createData("Cupcake", "Orange", 3, "10^3", ""),
  createData("Gingerbread", "Yellow", 4, "10^4", ""),
  createData("Gingerbread", "Green", 5, "10^5", 0.5),
  createData("Gingerbread", "Blue", 6, "10^6", 0.25),
  createData("Gingerbread", "Violet", 7, "10^7", 0.1),
  createData("Gingerbread", "Grey", 8, "10^8", 0.05),
  createData("Gingerbread", "White", 9, "10^9", ""),
  createData("Gingerbread", "Gold", "", "10^-1", 5),
  createData("Gingerbread", "Silver", "", "10^-2", 10),
  createData("Gingerbread", "None", "", "-", 20),
];

export default function ExperimentLabs() {
  return (
    <>
      <Typography variant="h5">Color Code for Resistor</Typography>
      <div className="csstop">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ColorBand</StyledTableCell>
                <StyledTableCell align="right">ColorName</StyledTableCell>
                <StyledTableCell align="right">Digit</StyledTableCell>
                <StyledTableCell align="right">Multiplier</StyledTableCell>
                <StyledTableCell align="right">
                  Tolerance&nbsp;(%)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <div
                      style={{
                        width: 90,
                        height: 20,
                        backgroundColor: colorMap[row.colorName] || "#FFFFFF",
                        display: "inline-block",
                        marginRight: 8,
                      }}
                    />
                  </StyledTableCell>
                  {/* <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell> */}
                  <StyledTableCell align="right">
                    {row.colorName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.digit}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.multiplier}&nbsp;Ω
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.tolerance}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
