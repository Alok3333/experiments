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
import DigitalLogicFamiliesPart3 from "./CharacterizationOfDigitalLogic/DigitalLogicFamiliesPart3";
import VideoPage from "./VideoPage/VideoPage";
import VideoPages from "./VideoPage/VideoPages";
import CharacterizationOfDigitalLogicPart4 from "./CharacterizationOfDigitalLogic/CharacterizationOfDigitalLogicPart4";
import Resistor1 from "./CharacterizationOfDigitalLogic/Resistor1";
import TextToSpeech from "./VideoPage/TextToSpeech";
import LineChart from "./CharacterizationOfDigitalLogic/ChatLineGraph";
import ANDGate from "./CharacterizationOfDigitalLogic/ANDGate";

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
        {/* <CharacterizationOfDigitalLogic /> */}
        {/* <DigitalLogicFamiliesPart3 /> */}
        {/* <CharacterizationOfDigitalLogicPart4 /> */}
        {/* <Resistor1/> */}
        {/* <LineChart/> */}
        <ANDGate />
      </SnackbarProvider>
      {/* <VideoPage /> */}
      {/* <TextToSpeech/> */}
      {/* <VideoPages/> */}
    </div>
  );
}

export default App;
