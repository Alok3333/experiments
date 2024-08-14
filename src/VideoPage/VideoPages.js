import React, { useState, useEffect } from "react";
import styles from "./VideoPage.module.css";
import { LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const videos = [
  {
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
    duration: 1000, //duration in milisecond
  },
  {
    text: "Welcome to video page",
    duration: 500, //duration in milisecond
  },
  {
    text: "Let start with first slide",
    duration: 500, //duration in milisecond
  },
  {
    image:
      "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
    duration: 1000, //duration in milisecond
  },
  {
    image:
      "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
    duration: 1000, //duration in milisecond
  },
  {
    text: "Let start from here second slide",
    duration: 500, //duration in milisecond
  },
];

const VideoPages = () => {
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
      }, 10);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, currentIndex]);

  // Handle for Play & Pause
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

  // Handle for next page
  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setProgress(0);
    }
  };

  // Handle for prev page
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setProgress(0);
    }
  };

  return (
    <>
      <div className={styles.text}>Video Page</div>
      {videos[currentIndex].image ? (
        <img
          src={videos[currentIndex].image}
          alt="image"
          className={styles.videoPlayerBox}
        />
      ) : (
        <div className={styles.videoPlayerBox}>{videos[currentIndex].text}</div>
      )}
      <LinearProgress
        className={styles.progressBar}
        variant="determinate"
        value={(progress / videos[currentIndex].duration) * 100}
      />
      <div className={styles.buttonContainer}>
        <button onClick={handlePrevious}>
          <ChevronLeftIcon />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <button onClick={handleNext}>
          <ChevronRightIcon />
        </button>
      </div>
    </>
  );
};

export default VideoPages;
