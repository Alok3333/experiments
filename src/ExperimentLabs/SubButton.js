import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img1 from "../assets/img1.png";

const optionsmega = [
  { label: "Ω" },
  { label: "KΩ" },
  { label: "MΩ" },
  { label: "GΩ" },
];

const correctAnswer = {
  res: "47", // Correct resistance value
  unit: "KΩ", // Correct unit
  tol: "5", // Correct tolerance
};

const answerVal = {
  res: "The value of resistance is 47",
  unit: "The unit is kΩ",
  tol: "The value of tolerance is 5",
};

export default function SubButton() {
  const [showExperiment, setShowExperiment] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [resistor, setResistor] = useState("");
  const [toleranceValue, setToleranceValue] = useState("");
  const [unit, setUnit] = useState(null);

  // State for button show answer
  const [answerVisible, setAnswerVisible] = useState(false);

  // Handle for click on answer button
  const handleShowAnswer = () => {
    setAnswerVisible(true);
  };

  // Styles for input fields
  const [resistorStyle, setResistorStyle] = useState({});
  const [toleranceStyle, setToleranceStyle] = useState({});
  const [unitStyle, setUnitStyle] = useState({});

  const handleExperiment1Click = () => {
    setShowExperiment(true);
    setShowDiv(true);
  };

  const handleExperiment1Click2 = () => {
    setShowExperiment(false);
    setShowDiv(false);

    // Reset values and styles when experiment is closed
    setResistor("");
    setToleranceValue("");
    setUnit(null);
    setResistorStyle({});
    setToleranceStyle({});
    setUnitStyle({});
  };

  const validateInputs = () => {
    let valid = true;

    if (!resistor || isNaN(resistor)) {
      setResistorStyle({ borderColor: "red" });
      valid = false;
    } else {
      setResistorStyle({
        borderColor: resistor === correctAnswer.res ? "green" : "red",
      });
    }

    if (!toleranceValue || isNaN(toleranceValue)) {
      setToleranceStyle({ borderColor: "red" });
      valid = false;
    } else {
      setToleranceStyle({
        borderColor: toleranceValue === correctAnswer.tol ? "green" : "red",
      });
    }

    if (!unit) {
      setUnitStyle({ borderColor: "red" });
      valid = false;
    } else {
      setUnitStyle({
        borderColor: unit === correctAnswer.unit ? "green" : "red",
      });
    }

    return valid;
  };

  const handleCheck = () => {
    validateInputs();
  };

  const showCheckAnswerButtonDisabled = !resistor || !toleranceValue || !unit;

  return (
    <div className="csstop">
      {!showExperiment ? (
        <Button fullWidth variant="contained" onClick={handleExperiment1Click}>
          Open Experiment 1
        </Button>
      ) : (
        <div style={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleExperiment1Click2}
          >
            Close Experiment 1
          </Button>
          {showDiv && (
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                sx={{
                  height: 140,
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                image={img1}
                title="Experiment Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Resistor 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <TextField
                    fullWidth
                    label="Enter the resistance value"
                    id="resistor"
                    sx={{ margin: "10px 0px", ...resistorStyle }}
                    value={resistor}
                    onChange={(e) => setResistor(e.target.value)}
                    error={resistorStyle.borderColor === "red"}
                    helperText={
                      resistorStyle.borderColor === "red"
                        ? "Invalid resistance value"
                        : ""
                    }
                  />
                  <Autocomplete
                    disablePortal
                    id="unit-selector"
                    options={optionsmega}
                    value={unit ? { label: unit } : null}
                    onChange={(event, newValue) =>
                      setUnit(newValue?.label || null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Unit"
                        error={unitStyle.borderColor === "red"}
                        helperText={
                          unitStyle.borderColor === "red"
                            ? "Please select a valid unit"
                            : ""
                        }
                        sx={{ ...unitStyle }}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    label="Enter the tolerance +/-"
                    id="tolerance"
                    value={toleranceValue}
                    onChange={(e) => setToleranceValue(e.target.value)}
                    sx={{ margin: "10px 0px", ...toleranceStyle }}
                    error={toleranceStyle.borderColor === "red"}
                    helperText={
                      toleranceStyle.borderColor === "red"
                        ? "Invalid tolerance value"
                        : ""
                    }
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleCheck}>
                  Check
                </Button>
                <Button
                  size="small"
                  onClick={handleShowAnswer}
                  disabled={showCheckAnswerButtonDisabled}
                >
                  Show Answer
                </Button>
              </CardActions>
              {answerVisible && (
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="left"
                  >
                    <p>{answerVal.res}</p>
                    <p>{answerVal.unit}</p>
                    <p>{answerVal.tol}</p>
                  </Typography>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
