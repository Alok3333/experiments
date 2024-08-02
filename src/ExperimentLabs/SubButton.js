import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";

const optionsmega = [
  { label: "Ω" },
  { label: "KΩ" },
  { label: "MΩ" },
  { label: "GΩ" }
];

const correctAnswers = {
  exp1: { res: "47", unit: "KΩ", tol: "5" },
  exp2: { res: "5.2", unit: "Ω", tol: "10" },
  exp3: { res: "97", unit: "Ω", tol: "20" },
  exp4: { res: "3.3/3300", unit: "KΩ/Ω", tol: "0.1" },
  exp5: { res: "158", unit: "GΩ", tol: "2" },
  exp6: { res: "615", unit: "GΩ", tol: "0.25" },
};

const answerVals = {
  exp1: { res: "The value of resistance is 47", unit: "The unit is KΩ", tol: "The value of tolerance is 5" },
  exp2: { res: "The value of resistance is 5.2", unit: "The unit is Ω", tol: "The value of tolerance is 10" },
  exp3: { res: "The value of resistance is 97", unit: "The unit is Ω", tol: "The value of tolerance is 20" },
  exp4: { res: "The value of resistance is 3.3/3300", unit: "The unit is KΩ/Ω", tol: "The value of tolerance is 0.1" },
  exp5: { res: "The value of resistance is 158", unit: "The unit is GΩ", tol: "The value of tolerance is 2" },
  exp6: { res: "The value of resistance is 615", unit: "The unit is GΩ", tol: "The value of tolerance is 0.25" },
};

const experimentImages = {
  exp1: img1,
  exp2: img2,
  exp3: img3,
  exp4: img4,
  exp5: img5,
  exp6: img6,
};

export default function SubButton() {
  const [showExperiment, setShowExperiment] = useState(null);
  const [resistor, setResistor] = useState("");
  const [toleranceValue, setToleranceValue] = useState("");
  const [unit, setUnit] = useState(null);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState("");

  const [resistorStyle, setResistorStyle] = useState({});
  const [toleranceStyle, setToleranceStyle] = useState({});
  const [unitStyle, setUnitStyle] = useState({});

  const handleExperimentClick = (exp) => {
    setCurrentExperiment(exp);
    setShowExperiment(exp);
  };

  const handleExperimentClose = () => {
    setShowExperiment(null);
    setResistor("");
    setToleranceValue("");
    setUnit(null);
    setResistorStyle({});
    setToleranceStyle({});
    setUnitStyle({});
  };

  const validateInputs = () => {
    const currentAnswers = correctAnswers[currentExperiment];
    let valid = true;

    if (!resistor || isNaN(resistor)) {
      setResistorStyle({ borderColor: "red" });
      valid = false;
    } else {
      setResistorStyle({
        borderColor: resistor === currentAnswers.res ? "green" : "red"
      });
    }

    if (!toleranceValue || isNaN(toleranceValue)) {
      setToleranceStyle({ borderColor: "red" });
      valid = false;
    } else {
      setToleranceStyle({
        borderColor: toleranceValue === currentAnswers.tol ? "green" : "red"
      });
    }

    if (!unit) {
      setUnitStyle({ borderColor: "red" });
      valid = false;
    } else {
      setUnitStyle({
        borderColor: unit === currentAnswers.unit ? "green" : "red"
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
      {showExperiment === null ? (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          {[...Array(6).keys()].map(i => (
            <Button
              key={`exp${i+1}`}
              fullWidth
              variant="contained"
              onClick={() => handleExperimentClick(`exp${i+1}`)}
            >
              Open Experiment {i+1}
            </Button>
          ))}
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleExperimentClose}
          >
            Close Experiment
          </Button>
          <Card sx={{ maxWidth: "100%" }}>
            <CardMedia
              sx={{
                height: 140,
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              image={experimentImages[currentExperiment]}
              title={`Experiment ${showExperiment.charAt(3)}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {`Resistor ${showExperiment.charAt(3)}`}
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
                onClick={() => setAnswerVisible(true)}
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
                  <p>{answerVals[currentExperiment].res}</p>
                  <p>{answerVals[currentExperiment].unit}</p>
                  <p>{answerVals[currentExperiment].tol}</p>
                </Typography>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}



