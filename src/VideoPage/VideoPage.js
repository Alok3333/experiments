import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoPage.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReactPlayer from "react-player/lazy";

const videos = [
  {
    video: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    content:
      "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
    duration: 52,
  },
  {
    video: "https://www.youtube.com/watch?v=jLshY-zUfZ4",
    content:
      "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
    duration: 137,
  },
  {
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
    content: "It's images Learning images",
    duration: 70,
  },
  {
    text: "Welcome to video page",
    content: "It's text",
    duration: 10,
  },
  {
    text: "Text-to-speech feature is now available on relatively any website or blog. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech functionality.",
    content: "It's second text",
    duration: 62,
  },
  {
    image:
      "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
    content: "It's second image",
    duration: 25,
  },
  {
    image:
      "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
    content: "It's 3rd image",
    duration: 60,
  },
  {
    text: "Let start from here second slide",
    content: "It's 3rd text",
    duration: 10,
  },
];

const VideoPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    setSpeechSupported("speechSynthesis" in window);

    // Get available voices
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]); // Set default voice if not set
      }
    };

    // Update voices on load and when voices change
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    let timer;
    if (isPlaying && videos[currentIndex].duration) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= videos[currentIndex].duration) {
            clearInterval(timer);
            if (currentIndex < videos.length - 1) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
              setProgress(0);
            } else {
              setIsPlaying(false);
            }
          }
          return Math.min(newProgress, videos[currentIndex].duration);
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, selectedVoice]);

  // Handle for play pause button
  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  // Handle for going next page button
  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setProgress(0);
    }
  };

  // Handle for going previous page button
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setProgress(0);
    }
  };

  // Handle for progressBar
  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressPercentage = clickPosition / progressBar.offsetWidth;
    const newProgress = progressPercentage * videos[currentIndex].duration;

    setProgress(newProgress);
    if (playerRef.current) {
      playerRef.current.seekTo(progressPercentage, "fraction");
    }
  };

  // Format of duration sec, min, hou
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    return `${hours > 0 ? `${hours}:` : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Render the component according to the (video|image|text)
  const renderContent = () => {
    const { video, image, text } = videos[currentIndex];
    if (video) {
      return (
        <div className={styles.videoPlayerBox}>
          <ReactPlayer
            url={video}
            playing={isPlaying}
            width="100%"
            height="100%"
            className={styles.videoPlayerContent}
            ref={playerRef}
          />
        </div>
      );
    } else if (image) {
      return (
        <div className={styles.imageContainer}>
          <img src={image} alt="content" className={styles.image} />
        </div>
      );
    } else if (text) {
      return (
        <div className={styles.textContent}>
          {text}
          {speechSupported && (
            <>
              <Button onClick={handleSpeakText} className={styles.speakButton}>
                Speak
              </Button>
              <FormControl fullWidth className={styles.voiceSelect}>
                <InputLabel>Voice</InputLabel>
                <Select
                  value={selectedVoice ? selectedVoice.name : ""}
                  onChange={(e) => {
                    const voice = voices.find((v) => v.name === e.target.value);
                    setSelectedVoice(voice);
                  }}
                >
                  {voices.map((voice) => (
                    <MenuItem key={voice.name} value={voice.name}>
                      {voice.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  // const handleSpeakText = () => {
  //   const { text } = videos[currentIndex];
  //   console.log("Text for speech:", text); // Debugging line1
  //   if (text && speechSupported) {
  //     try {
  //       const utterance = new SpeechSynthesisUtterance(text);
  //       if (selectedVoice) {
  //         utterance.voice = selectedVoice;
  //       }

  //       utterance.onstart = () => {
  //         console.log("SpeechSynthesisUtterance.onstart");
  //       };
  //       utterance.onend = () => {
  //         console.log("SpeechSynthesisUtterance.onend");
  //       };
  //       utterance.onerror = (event) => {
  //         console.error("SpeechSynthesisUtterance.onerror", event);
  //       };

  //       console.log("Before speaking text:", text); // Debugging line2
  //       window.speechSynthesis.speak(utterance);
  //       console.log("Speak method called"); // Debugging line3
  //     } catch (error) {
  //       console.error("Error speaking text:", error);
  //     }
  //   } else {
  //     console.error("No text found or speech synthesis is not supported.");
  //   }
  // };

  // Handle the text to speech
  const handleSpeakText = () => {
    const { text } = videos[currentIndex];
    if (text && speechSupported) {
      try {
        const chunkSize = 500; // Adjust chunk size if needed
        let startIndex = 0;
        const speakNextChunk = () => {
          if (startIndex >= text.length) return; // Exit if all text is spoken

          const endIndex = Math.min(startIndex + chunkSize, text.length);
          const chunk = text.substring(startIndex, endIndex);
          const utterance = new SpeechSynthesisUtterance(chunk);

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }

          utterance.onstart = () => {
            console.log("SpeechSynthesisUtterance.onstart");
          };
          utterance.onend = () => {
            console.log("SpeechSynthesisUtterance.onend");
            startIndex = endIndex;
            speakNextChunk(); // Continue with next chunk
          };
          utterance.onerror = (event) => {
            console.error("SpeechSynthesisUtterance.onerror", event);
          };

          console.log("Before speaking text chunk:", chunk);
          window.speechSynthesis.speak(utterance);
          console.log("Speak method called");
        };

        speakNextChunk(); // Start speaking text
      } catch (error) {
        console.error("Error speaking text:", error);
      }
    } else {
      console.error("No text found or speech synthesis is not supported.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Video Page</div>
      {renderContent()}
      {videos[currentIndex].duration && (
        <>
          <div
            className={styles.progressBar}
            onClick={handleProgressBarClick}
            role="button"
            aria-label="Progress bar"
          >
            <div
              className={styles.progressBarFill}
              style={{
                width: `${(progress / videos[currentIndex].duration) * 100}%`,
              }}
            />
          </div>
          <div className={styles.controls}>
            <div>
              <Button onClick={handlePrevious} disabled={currentIndex === 0}>
                <ChevronLeftIcon />
              </Button>
              <Button onClick={handlePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIndex === videos.length - 1}
              >
                <ChevronRightIcon />
              </Button>
            </div>
            <span className={styles.duration}>
              {formatDuration(progress)} /{" "}
              {formatDuration(videos[currentIndex].duration)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPage;
