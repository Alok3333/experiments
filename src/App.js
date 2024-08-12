import { SnackbarProvider } from "notistack";
import "./App.css";
import CharacterizationOfDigitalLogic from "./CharacterizationOfDigitalLogic/CharacterizationOfDigitalLogic";
import Resistor from "./ExperimentLabs/Resistor";
import FourBitAdderSubtractor from "./FourBitAdderSubtractor/FourBitAdderSubtractor";
import FullSubtractor from "./FullSubtractor/FullSubtractor";
import HalfSubtractor from "./HalfSubtractor/HalfSubtractor";
import SubFullAdder from "./SubFullAdder/SubFullAdder";
import SubHalfAdder1 from "./SubHalfAdder/SubHalfAdder1";
import TwoBitAdder from "./TwoBItAdder/TwoBitAdder";
import DigitalLogicFamiliesPart2 from "./CharacterizationOfDigitalLogic/DigitalLogicFamiliesPart2";

function App() {
  return (
    <div className="App">
      {/* <Resistor/> */}
      {/* <SubHalfAdder1/> */}
      {/* <SubFullAdder/> */}
      {/* <TwoBitAdder/> */}
      {/* <HalfSubtractor/> */}
      {/* <FullSubtractor /> */}
      {/* <FourBitAdderSubtractor /> */}

      {/* Wrap component */}
      <SnackbarProvider>
        <CharacterizationOfDigitalLogic />
        <DigitalLogicFamiliesPart2 />
      </SnackbarProvider>
    </div>
  );
}

export default App;
