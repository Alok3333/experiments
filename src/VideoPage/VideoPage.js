import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoPage.module.css";
import { Button, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReactPlayer from "react-player/lazy";
import TextToSpeech from "./TextToSpeech";

const videos = [
  {
    video: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    content:
      "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
    duration: 54, // Ensure duration is specified for videos
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
    duration: 60,
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
  const playerRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isPlaying && videos[currentIndex].duration) {
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
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
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
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const renderContent = () => {
    const { video, image, text, duration } = videos[currentIndex];
    if (video) {
      return (
        <div className={styles.videoPlayerBox}>
          <ReactPlayer
            url={video}
            playing={isPlaying}
            ref={playerRef}
            width="100%"
            height="100%"
            style={{objectFit: "cover"}}
            // controls
            // muted
            // config={{
            //   youtube: {
            //     playerVars: { showinfo: 1 }
            //   }
            // }}
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
      return <div className={styles.textContent}>{text}</div>;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Video Page</div>
      {renderContent()}
      {videos[currentIndex].duration && (
        <>
          <LinearProgress
            className={styles.progressBar}
            variant="determinate"
            value={(progress / videos[currentIndex].duration) * 100}
          />
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
      {videos[currentIndex].text && (
        <TextToSpeech
          text={videos[currentIndex].text}
          start={
            (progress / videos[currentIndex].duration) *
            videos[currentIndex].duration
          }
          end={videos[currentIndex].duration}
          progress={progress}
        />
      )}
    </div>
  );
};

export default VideoPage;
