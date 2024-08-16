import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Input,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const TextToSpeech = ({ text, start, end, progress }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  // Created useRef to get dom element
  const utteranceRef = useRef(null);

  //   useEffect(() => {
  //     const synth = window.speechSynthesis;
  //     const u = new SpeechSynthesisUtterance(text);
  //     const voices = synth.getVoices();

  //     setUtterance(u);

  //     setVoice(voices[0]);

  //     return () => {
  //       synth.cancel();
  //     };
  //   }, [text]);

  useEffect(() => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Start speaking when progress matches the start time
      if (progress >= start && progress <= end) {
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel(); // Cancel speech if progress is outside the desired range
      }

      return () => {
        window.speechSynthesis.cancel(); // Clean up speech synthesis
      };
    }
  }, [text, start, end, progress]);

  const handlePlay = () => {
    //alert('Checking');
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    //synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  return (
    <div>
      <label>
        Voice:
        <Select value={voice?.name} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <MenuItem value={voice.name}>{voice.name}</MenuItem>
            // <option key={voice.name} value={voice.name}>
            //   {voice.name}
            // </option>
          ))}
        </Select>
      </label>

      <Button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
      <Button onClick={handlePause}>Pause</Button>
      <Button onClick={handleStop}>Stop</Button>
    </div>
  );
};

export default TextToSpeech;
