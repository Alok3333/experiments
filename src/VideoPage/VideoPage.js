// import React, { useState, useEffect, useRef } from "react";
// import styles from "./VideoPage.module.css";
// import { Button } from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ReactPlayer from "react-player/lazy";

// const videos = [
//   {
//     video: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
//     content:
//       "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
//     duration: 52, // Ensure duration is specified for videos
//   },
//   {
//     video: "https://www.youtube.com/watch?v=jLshY-zUfZ4",
//     content:
//       "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
//     duration: 137,
//   },
//   {
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
//     content: "It's images Learning images",
//     duration: 70,
//   },
//   {
//     text: "Welcome to video page",
//     content: "It's text",
//     duration: 10,
//   },
//   {
//     text: "Text-to-speech feature is now available on relatively any website or blog. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech functionality.",
//     content: "It's second text",
//     duration: 60,
//   },
//   {
//     image:
//       "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
//     content: "It's second image",
//     duration: 25,
//   },
//   {
//     image:
//       "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
//     content: "It's 3rd image",
//     duration: 60,
//   },
//   {
//     text: "Let start from here second slide",
//     content: "It's 3rd text",
//     duration: 10,
//   },
// ];

// const VideoPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     let timer;
//     if (isPlaying && videos[currentIndex].duration) {
//       timer = setInterval(() => {
//         setProgress((prevProgress) => {
//           const newProgress = prevProgress + 1;
//           if (newProgress >= videos[currentIndex].duration) {
//             clearInterval(timer);
//             if (currentIndex < videos.length - 1) {
//               setCurrentIndex((prevIndex) => prevIndex + 1);
//               setProgress(0);
//             } else {
//               setIsPlaying(false);
//             }
//           }
//           return Math.min(newProgress, videos[currentIndex].duration);
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isPlaying, currentIndex]);

//   const handlePlayPause = () => {
//     setIsPlaying((prevIsPlaying) => !prevIsPlaying);
//   };

//   const handleNext = () => {
//     if (currentIndex < videos.length - 1) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//       setProgress(0);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//       setProgress(0);
//     }
//   };

//   // const handleClickFullScreen = () => {
//   //   setIsFullScreen(!isFullScreen);
//   //   const ele = playerRef.current;
//   //   if (ele.requestFullscreen) {
//   //     ele.requestFullscreen();
//   //   }
//   //   console.log(ele.requestFullscreen, "ele");
//   // };

//   const handleProgressBarClick = (e) => {
//     const progressBar = e.currentTarget;
//     const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
//     const progressPercentage = clickPosition / progressBar.offsetWidth;
//     const newProgress = progressPercentage * videos[currentIndex].duration;

//     setProgress(newProgress);
//     if (playerRef.current) {
//       playerRef.current.seekTo(progressPercentage, "fraction");
//     }
//   };

//   const formatDuration = (duration) => {
//     const minutes = Math.floor(duration / 60);
//     const seconds = Math.floor(duration % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const renderContent = () => {
//     const { video, image, text, duration } = videos[currentIndex];
//     if (video) {
//       return (
//         <div className={styles.videoPlayerBox}>
//           <ReactPlayer
//             url={video}
//             playing={isPlaying}
//             width="100%"
//             height="100%"
//             className={styles.videoPlayerContent}
//             ref={playerRef}
//           />
//         </div>
//       );
//     } else if (image) {
//       return (
//         <div className={styles.imageContainer}>
//           <img src={image} alt="content" className={styles.image} />
//         </div>
//       );
//     } else if (text) {
//       return <div className={styles.textContent}>{text}</div>;
//     }
//     return null;
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>Video Page</div>
//       {renderContent()}
//       {videos[currentIndex].duration && (
//         <>
//           <div
//             className={styles.progressBar}
//             onClick={handleProgressBarClick}
//             role="button"
//             aria-label="Progress bar"
//           >
//             <div
//               className={styles.progressBarFill}
//               style={{
//                 width: `${(progress / videos[currentIndex].duration) * 100}%`,
//               }}
//             />
//           </div>
//           <div className={styles.controls}>
//             <div>
//               <Button onClick={handlePrevious} disabled={currentIndex === 0}>
//                 <ChevronLeftIcon />
//               </Button>
//               <Button onClick={handlePlayPause}>
//                 {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
//               </Button>
//               <Button
//                 onClick={handleNext}
//                 disabled={currentIndex === videos.length - 1}
//               >
//                 <ChevronRightIcon />
//               </Button>
//             </div>
//             <span className={styles.duration}>
//               {formatDuration(progress)} /{" "}
//               {formatDuration(videos[currentIndex].duration)}
//             </span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default VideoPage;

// ***********************************************************************************

// const videos = [
//   {
//     video: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
//     content:
//       "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
//     duration: 52, // Ensure duration is specified for videos
//   },
//   {
//     video: "https://www.youtube.com/watch?v=jLshY-zUfZ4",
//     content:
//       "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
//     duration: 137,
//   },
//   {
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
//     content: "It's images Learning images",
//     duration: 70,
//   },
//   {
//     text: "Welcome to video page",
//     content: "It's text",
//     duration: 10,
//   },
//   {
//     text: "Text-to-speech feature is now available on relatively any website or blog. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech functionality.",
//     content: "It's second text",
//     duration: 49,
//   },
//   {
//     image:
//       "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
//     content: "It's second image",
//     duration: 25,
//   },
//   {
//     image:
//       "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
//     content: "It's 3rd image",
//     duration: 60,
//   },
//   {
//     text: "Let start from here second slide",
//     content: "It's 3rd text",
//     duration: 10,
//   },
// ];

import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoPage.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReactPlayer from "react-player/lazy";

const videos = [
  {
    video: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    content:
      "Shaitaan Theme (Song) | Shaitaan | Ajay Devgn, R. Madhavan, Jyotika | Amit T, Kumaar, Siddharth B",
    duration: 52, // Ensure duration is specified for videos
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
    duration: 49,
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

const splitTextIntoChunks = (text, maxLength = 500) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  return chunks;
};

const VideoPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [textChunks, setTextChunks] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isTextPlaying, setIsTextPlaying] = useState(false);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const textTimeoutRef = useRef(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const updateVoices = () => {
      setVoices(synth.getVoices());
    };

    updateVoices();
    synth.onvoiceschanged = updateVoices;

    return () => {
      if (utterance) {
        synth.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (videos[currentIndex].text) {
      setTextChunks(splitTextIntoChunks(videos[currentIndex].text));
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isPlaying && videos[currentIndex].duration) {
      if (videos[currentIndex].text && !isTextPlaying) {
        const synth = window.speechSynthesis;
        const speech = new SpeechSynthesisUtterance();
        speech.voice = selectedVoice || synth.getVoices()[0];
        speech.rate = 1;
        speech.pitch = 1;

        speech.onstart = () => {
          setIsTextPlaying(true);
          setCurrentChunkIndex(0); // Start from the beginning of the text chunks
        };

        speech.onend = () => {
          setIsTextPlaying(false);
          if (currentIndex < videos.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setProgress(0);
          } else {
            setIsPlaying(false);
          }
        };

        const speakChunk = (index) => {
          if (index < textChunks.length) {
            speech.text = textChunks[index];
            window.speechSynthesis.speak(speech);

            // Schedule the next chunk
            textTimeoutRef.current = setTimeout(() => {
              window.speechSynthesis.cancel(); // Stop current chunk
              speakChunk(index + 1); // Speak the next chunk
            }, speech.text.length * 100); // Adjust this timeout based on chunk length
          }
        };

        speakChunk(currentChunkIndex);
      } else if (videos[currentIndex].video) {
        const timer = setInterval(() => {
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
    } else if (!isPlaying && utterance) {
      window.speechSynthesis.cancel();
      setIsTextPlaying(false);
    }

    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(textTimeoutRef.current);
      if (utterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentIndex, selectedVoice, textChunks, currentChunkIndex]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsTextPlaying(false);
    setProgress(0);
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

  const handleVoiceChange = (event) => {
    const selected = voices.find((voice) => voice.name === event.target.value);
    setSelectedVoice(selected);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

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
                {isPlaying && !isTextPlaying ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </Button>
              <Button onClick={handleStop}>
                <StopIcon />
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIndex === videos.length - 1}
              >
                <ChevronRightIcon />
              </Button>
            </div>
            {videos[currentIndex].text && (
              <FormControl>
                <InputLabel id="voice-select-label">Voice</InputLabel>
                <Select
                  labelId="voice-select-label"
                  value={selectedVoice ? selectedVoice.name : ""}
                  onChange={handleVoiceChange}
                >
                  {voices.map((voice) => (
                    <MenuItem key={voice.name} value={voice.name}>
                      {voice.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <span className={styles.duration}>
              {videos[currentIndex].text ? formatDuration(progress) : ""}{" "}
              {videos[currentIndex].duration &&
                formatDuration(videos[currentIndex].duration)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPage;
