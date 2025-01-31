import { SnackbarProvider } from "notistack";
import "./App.css";
import CharacterizationOfDigitalLogic from "./CharacterizationOfDigitalLogic/CharacterizationOfDigitalLogic";
import Resistor from "./pages/ResistorGame";
import FourBitAdderSubtractor from "./FourBitAdderSubtractor/FourBitAdderSubtractor";
import FullSubtractor from "./FullSubtractor/FullSubtractor";
import HalfSubtractor from "./HalfSubtractor/HalfSubtractor";
import SubFullAdder from "./SubFullAdder/SubFullAdder";
import SubHalfAdder1 from "./pages/SubHalfAdder1Game";
import TwoBitAdder from "./TwoBItAdder/TwoBitAdder";
import DigitalLogicFamiliesPart3 from "./CharacterizationOfDigitalLogic/DigitalLogicFamiliesPart3";
import VideoPage from "./VideoPage/VideoPage";
import VideoPages from "./VideoPage/VideoPages";
import CharacterizationOfDigitalLogicPart4 from "./CharacterizationOfDigitalLogic/CharacterizationOfDigitalLogicPart4";
import Resistor1 from "./CharacterizationOfDigitalLogic/Resistor1";
import TextToSpeech from "./VideoPage/TextToSpeech";
import LineChart from "./CharacterizationOfDigitalLogic/ChatLineGraph";
import ANDGate from "./pages/ANDGateGame";
import ANDGate2 from "./pages/ANDGate2";
import BoxShadow from "./cssImplement/BoxShadow";
import ORGate from "./pages/ORGateGame";
import ORGate2 from "./pages/ORGate2";
import NOTGate from "./pages/NOTGateGame";
import NOTGate2 from "./pages/NOTGate2";
import NANDGate from "./pages/NANDGateGame";
import DragablePin from "./dragdrop/DragablePin";
import NANDGate2 from "./pages/NANDGate2";
import NORGate from "./pages/NORGateGame";
import NORGate2 from "./pages/NORGate2";
import XORGate from "./pages/XORGateGame";
import XORGate2 from "./pages/XORGate2";
import XNORGate from "./pages/XNORGateGame";
import XNORGate2 from "./pages/XNORGate2";
import ParallelRegister from "./pages/ParallelRegister";
import BitSerial from "./pages/BitSerialGame";
import CompilerCodeEditor from "./pages/CompilerCodeEditor";
import Output from "./pages/Output";
import CodeEditor from "./pages/CodeEditor";
import ThemeApp from "./pages/theme";
import NavBar from "./pages/NavBar";
import CampusWebsite from "./pages/CampusWebsite";
import { Route, Routes } from "react-router-dom";

function App() {
  // const docker_run = "e1557c8283c1e0adb3bfdcb7eee65dfed6e78190a1a6328ca5f4c0a6a4b39dde";

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
        {/* <BitSerial/> */}

        {/* <ParallelRegister/> */}
        {/* <CompilerCodeEditor /> */}
        {/* <CodeEditor/> */}
        {/* <ThemeApp/> */}
        {/* <Output/> */}
        {/* <NavBar /> */}
      </SnackbarProvider>

      {/* <VideoPage /> */}
      {/* <TextToSpeech/> */}
      {/* <VideoPages/> */}
      {/* <BoxShadow /> */}
      {/* <DragablePin/> */}
      {/* <Routes>
        <Route path="/" element={<CampusWebsite />} />
      </Routes> */}
    </div>
  );
}

export default App;
