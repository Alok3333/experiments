import React, { useState, useEffect } from "react";
import styles from "./VideoPage.module.css";
import { Button, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextToSpeech from "./TextToSpeech";

const videos = [
  {
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
    duration: 70, //duration in second
    content: "It's images Learning images",
  },
  {
    text: "Welcome to video page",
    duration: 10, //duration in second
    content: "It's text",
  },
  {
    text: "Let start with first slide, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    duration: 10, //duration in second
    content: "It's second text",
  },
  {
    image:
      "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
    duration: 25, //duration in second
    content: "It's second image",
  },
  {
    image:
      "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
    duration: 60, //duration in second
    content: "It's 3rd image",
  },
  {
    text: "Let start from here second slide",
    duration: 10, //duration in second
    content: "It's 3rd text",
  },
];

const VideoPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= videos[currentIndex].duration) {
            clearInterval(timer);
            if (currentIndex < videos.length - 1) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
              setProgress(0);
            } else {
              setIsPlaying(false);
            }
          }
          return Math.min(prevProgress + 1, videos[currentIndex].duration);
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, currentIndex]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (currentIndex >= videos.length) {
        setCurrentIndex(0);
        setProgress(0);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setProgress(0);
    }
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let timeString = "";
    if (hours > 0) {
      timeString += `${hours}h `;
    }
    // if (minutes > 0) {
    //   timeString += `${minutes}m : ${seconds}s `;
    // }
    timeString += `${minutes} : ${seconds}`;

    return timeString;
  };

  return (
    <div style={{ background: "#f0f4f9" }}>
      <div className={styles.text}>Video Page</div>
      {videos[currentIndex].image ? (
        <>
          <img
            src={videos[currentIndex].image}
            alt="image"
            className={styles.videoPlayerBox}
          />
          <p className={styles.contentContainer}>
            {videos[currentIndex].content}
          </p>
        </>
      ) : (
        <>
          <div className={styles.videoPlayerBox}>
            {videos[currentIndex].text}
          </div>
          <p className={styles.contentContainer}>
            {videos[currentIndex].content}
          </p>
        </>
      )}
      <LinearProgress
        className={styles.progressBar}
        variant="determinate"
        value={(progress / videos[currentIndex].duration) * 100}
      />
      <div className={styles.wrapperBtnDuration}>
        <div className={styles.buttonContainer}>
          <Button onClick={handlePrevious}>
            <ChevronLeftIcon />
          </Button>
          <Button onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
          <Button onClick={handleNext}>
            <ChevronRightIcon />
          </Button>
        </div>
        <div className={styles.durationContainer}>
          <span className={styles.duration}>
            {formatDuration(progress)} /{" "}
            {formatDuration(videos[currentIndex].duration)}
          </span>
        </div>
      </div>
      {/* Add the text speech component */}
      <TextToSpeech 
      text={videos[currentIndex].text}
      start={(progress / videos[currentIndex].duration) * videos[currentIndex].duration}
      end={videos[currentIndex].duration}
      progress={progress}
      />
    </div>
  );
};

export default VideoPage;
