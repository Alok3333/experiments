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
import ANDGate from "./pages/ANDGate";
import ANDGate2 from "./pages/ANDGate2";
import BoxShadow from "./cssImplement/BoxShadow";
import ORGate from "./pages/ORGate";
import ORGate2 from "./pages/ORGate2";
import NOTGate from "./pages/NOTGate";
import NOTGate2 from "./pages/NOTGate2";
import NANDGate from "./pages/NANDGate";
import DragablePin from "./dragdrop/DragablePin";
import NANDGate2 from "./pages/NANDGate2";
import NORGate from "./pages/NORGate";
import NORGate2 from "./pages/NORGate2";
import XORGate from "./pages/XORGate";
import XORGate2 from "./pages/XORGate2";
import XNORGate from "./pages/XNORGate";
import XNORGate2 from "./pages/XNORGate2";
import ParallelRegister from "./pages/ParallelRegister";
import BitSerial from "./pages/BitSerial";

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
        {/* <ANDGate /> */}
        {/* <ANDGate2/> */}
        {/* <ORGate /> */}
        {/* <ORGate2 /> */}
        {/* <NOTGate /> */}
        {/* <NOTGate2 /> */}
        {/* <NANDGate/> */}
        {/* <NANDGate2/> */}
        {/* <NORGate /> */}
        {/* <NORGate2 /> */}
        {/* <XORGate/> */}
        {/* <XORGate2/> */}
        {/* <XNORGate /> */}
        {/* <XNORGate2/> */}
        {/* <ParallelRegister/> */}
        <BitSerial/>
      </SnackbarProvider>
      {/* <VideoPage /> */}
      {/* <TextToSpeech/> */}
      {/* <VideoPages/> */}
      {/* <BoxShadow /> */}
      {/* <DragablePin/> */}
    </div>
  );
}

export default App;
