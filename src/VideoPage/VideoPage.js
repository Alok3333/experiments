// 1. Create a data array of obj.
// 2. Inside data insert {images/text, duration}.
// 3. Creating video section with progressBar.
// 4. Video start with user data it's contin... running when data will end
// 5. Making this thing with react with mui.

// import React, { useEffect, useState } from "react";
// import styles from "./VideoPage.module.css";
// import { LinearProgress } from "@mui/material";
// import ReactPlayer from "react-player";

// const videos = [
//   {
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
//     duration: 2, //duration in second
//   },
//   {
//     text: "Welcome to video page",
//     duration: 2, //duration in second
//   },
//   {
//     text: "Let start with first slide",
//     duration: 3, //duration in second
//   },
//   {
//     image:
//       "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
//     duration: 2, //duration in second
//   },
//   {
//     image:
//       "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
//     duration: 3, //duration in second
//   },
//   {
//     text: "Let start from here second slide",
//     duration: 1, //duration in second
//   },
// ];

// const VideoPage = () => {
//   const [progress, setProgress] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleProgress = (state) => {
//     setProgress(state.playedSeconds / state.duration);
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress === 100) {
//           return 0;
//         }
//         // const diff = Math.random() * 10;
//         return Math.min(prevProgress + 1, 100);
//       });
//     }, 100);

//     return () => {
//       clearInterval(timer);
//     };
//   });

//   return (
//     <>
//       <div className={styles.text}>Video Page</div>
//       <ReactPlayer
//         className={styles.videoPlayerBox}
//         url="https://video-links.b-cdn.net/media/videolinks/video/haida.MP4"
//         playing={isPlaying}
//         onProgress={handleProgress}
//       />
//       <LinearProgress
//         className={styles.progressBar}
//         variant="determinate"
//         value={progress * 100}
//       />
//       <button onClick={() => setIsPlaying(!isPlaying)}>
//         {isPlaying ? "Pause" : "Play"}
//       </button>
//     </>
//   );
// };

// export default VideoPage;

// ************************ second code
// import React, { useState, useEffect, useRef } from "react";
// import styles from "./VideoPage.module.css";
// import { LinearProgress } from "@mui/material";
// import ReactPlayer from "react-player";

// const videos = [
//   {
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
//     duration: 2000, //duration in second
//   },
//   {
//     text: "Welcome to video page",
//     duration: 2000, //duration in second
//   },
//   {
//     text: "Let start with first slide",
//     duration: 3000, //duration in second
//   },
//   {
//     image:
//       "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
//     duration: 2000, //duration in second
//   },
//   {
//     image:
//       "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
//     duration: 3000, //duration in second
//   },
//   {
//     text: "Let start from here second slide",
//     duration: 1000, //duration in second
//   },
// ];

// const VideoPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     let timer;
//     if (isPlaying) {
//       timer = setInterval(() => {
//         setProgress((prevProgress) => {
//           if (prevProgress >= videos[currentIndex].duration) {
//             clearInterval(timer);
//             setCurrentIndex((prevIndex) => {
//               if (prevIndex < videos.length - 1) {
//                 return prevIndex + 1;
//               } else {
//                 return 0;
//               }
//             });
//             setProgress(0);
//           }
//           return Math.min(prevProgress + 1, videos[currentIndex].duration);
//         });
//       }, 0);
//     }
//     return () => {
//       clearInterval(timer);
//     };
//   }, [isPlaying, currentIndex]);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleProgress = (state) => {
//     setProgress(state.playedSeconds);
//   };

//   return (
//     <>
//       <div className={styles.text}>Video Page</div>
//       {videos[currentIndex].image ? (
//         <img
//           src={videos[currentIndex].image}
//           alt="image"
//           className={styles.videoPlayerBox}
//         />
//       ) : (
//         <div className={styles.videoPlayerBox}>{videos[currentIndex].text}</div>
//       )}
//       {/* {currentIndex === 0 && (
//         <ReactPlayer
//           ref={playerRef}
//           url="https://video-links.b-cdn.net/media/videolinks/video/haida.MP4"
//           playing={isPlaying}
//           onProgress={handleProgress}
//         />
//       )} */}
//       <LinearProgress
//         className={styles.progressBar}
//         variant="determinate"
//         value={(progress / videos[currentIndex].duration) * 100}
//       />
//       <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
//     </>
//   );
// };

// export default VideoPage;

// ************** 3rd code *************************8
// import React, { useState, useEffect } from "react";
// import styles from "./VideoPage.module.css";
// import { LinearProgress } from "@mui/material";

// const videos = [
//   {
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5tBCXngoqUVlR4bwi619gquT3UtCHBSffOQ2EM5rWr4Zh3Ht9XoCqMgnrN7FC2FzupYHuj3UhIhf_oz0rglhGt0UcFzcVgJV0Hg6ANOYWqAt0ubOc1AGJ7AXJqQ5p8cADuwvw_fYFmd-J/s1600/learning-1959541_1920.jpg",
//     duration: 1000, //duration in second
//   },
//   {
//     text: "Welcome to video page",
//     duration: 500, //duration in second
//   },
//   {
//     text: "Let start with first slide",
//     duration: 500, //duration in second
//   },
//   {
//     image:
//       "https://th.bing.com/th/id/R.ff3a044a3fa044105293a5fd1fda1d7f?rik=QIfOnCdYyhmZSA&riu=http%3a%2f%2feducation.okfn.org%2ffiles%2f2015%2f07%2fedusoft.jpg&ehk=a33FReMH2rrdBgDFgp%2fKM0wrjqXgbgGoEi%2b5vtu0toE%3d&risl=&pid=ImgRaw&r=0",
//     duration: 1000, //duration in second
//   },
//   {
//     image:
//       "https://opensource.com/sites/default/files/lead-images/computer_desk_home_laptop_browser.png",
//     duration: 1000, //duration in second
//   },
//   {
//     text: "Let start from here second slide",
//     duration: 500, //duration in second
//   },
// ];

// const VideoPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   //   const playerRef = useRef(null);

//   //   console.log(playerRef, "playRef")
//   //   console.log(progress, "progress");

//   useEffect(() => {
//     let timer;
//     if (isPlaying) {
//       timer = setInterval(() => {
//         setProgress((prevProgress) => {
//           //   console.log(prevProgress, "prevProgress");
//           if (prevProgress >= videos[currentIndex].duration) {
//             clearInterval(timer);
//             setCurrentIndex((prevIndex) => {
//               if (prevIndex < videos.length - 1) {
//                 return prevIndex + 1;
//               } else {
//                 return 0;
//               }
//             });
//             setProgress(0);
//           }
//           //   console.log(videos[currentIndex].duration, "videos duration");
//           return Math.min(prevProgress + 1, videos[currentIndex].duration);
//         });
//       }, 10);
//     }
//     return () => {
//       clearInterval(timer);
//     };
//   }, [isPlaying, currentIndex]);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <>
//       <div className={styles.text}>Video Page</div>
//       {videos[currentIndex].image ? (
//         <img
//           src={videos[currentIndex].image}
//           alt="image"
//           className={styles.videoPlayerBox}
//         />
//       ) : (
//         <div className={styles.videoPlayerBox}>{videos[currentIndex].text}</div>
//       )}
//       <LinearProgress
//         className={styles.progressBar}
//         variant="determinate"
//         value={(progress / videos[currentIndex].duration) * 100}
//       />
//       <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
//     </>
//   );
// };

// export default VideoPage;

// ************************* passed 1st use this code*********************
import React, { useState, useEffect } from "react";
import styles from "./VideoPage.module.css";
import { Button, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
    text: "Let start with first slide",
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

  // const formatDuration = (duration) => {
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = duration % 60;
  //   return `${minutes > 0 ? minutes + "min " : ""}${seconds}s`;
  // };

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
    <>
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
    </>
  );
};

export default VideoPage;
