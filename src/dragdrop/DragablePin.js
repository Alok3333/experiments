// import React, { useState } from 'react';

// export const Circle = ({ id, cx, cy, onMouseDown }) => {
//   return (
//     <circle
//       id={id}
//       cx={cx}
//       cy={cy}
//       r="15"
//       fill="orange"
//       onMouseDown={(e) => onMouseDown(e, id)}
//       style={{ cursor: 'pointer' }}
//     />
//   );
// };

// export const Connection = ({ x1, y1, x2, y2 }) => {
//   return (
//     <line
//       x1={x1}
//       y1={y1}
//       x2={x2}
//       y2={y2}
//       stroke="orange"
//       strokeWidth="4"
//     />
//   );
// };

// const App = () => {
//   // Default positions of circles
//   const defaultPositions = {
//     A: { cx: 100, cy: 100 },
//     B: { cx: 100, cy: 100 },
//     C: { cx: 300, cy: 100 },
//     D: { cx: 300, cy: 100 }
//   };

//   const [circles, setCircles] = useState(defaultPositions);

//   const [isDragging, setIsDragging] = useState(null);

//   // Target positions for circles to snap to (only keep the ones you need)
//   const targetPositions = {
//     A: { cx: 200, cy: 200 },
//     C: { cx: 400, cy: 200 }
//   };

//   const [connections] = useState([
//     { from: 'A', to: 'B' },
//     { from: 'C', to: 'D' }
//   ]);

//   const onMouseDown = (e, id) => {
//     setIsDragging(id);
//   };

//   const onDrag = (e) => {
//     if (isDragging) {
//       const rect = e.target.closest('svg').getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       setCircles((prevCircles) => ({
//         ...prevCircles,
//         [isDragging]: { cx: x, cy: y }
//       }));
//     }
//   };

//   const onMouseUp = () => {
//     if (isDragging) {
//       const draggedCircle = circles[isDragging];
//       const targetCircle = targetPositions[isDragging];

//       if (targetCircle) {
//         const distance = Math.sqrt(
//           Math.pow(draggedCircle.cx - targetCircle.cx, 2) +
//           Math.pow(draggedCircle.cy - targetCircle.cy, 2)
//         );

//         const snapRadius = 50; // Distance threshold to snap to the target circle

//         if (distance < snapRadius) {
//           // Snap to the target position if within snap radius
//           setCircles((prevCircles) => ({
//             ...prevCircles,
//             [isDragging]: targetCircle
//           }));
//         } else {
//           // Reset to the default position
//           setCircles((prevCircles) => ({
//             ...prevCircles,
//             [isDragging]: defaultPositions[isDragging]
//           }));
//         }
//       }
//     }
//     setIsDragging(null);
//   };

//   return (
//     <svg 
//       width="100%" 
//       height="100vh" 
//       onMouseMove={onDrag} 
//       onMouseUp={onMouseUp}
//       style={{ backgroundColor: '#f9f9f9' }}
//     >
//       {connections.map((conn, index) => (
//         <Connection
//           key={index}
//           x1={circles[conn.from].cx}
//           y1={circles[conn.from].cy}
//           x2={circles[conn.to].cx}
//           y2={circles[conn.to].cy}
//         />
//       ))}
//       {Object.keys(circles).map((key) => (
//         <Circle
//           key={key}
//           id={key}
//           cx={circles[key].cx}
//           cy={circles[key].cy}
//           onMouseDown={onMouseDown}
//         />
//       ))}

//       {/* Render the target circles */}
//       {Object.keys(targetPositions).map((key) => (
//         <circle
//           key={key}
//           cx={targetPositions[key].cx}
//           cy={targetPositions[key].cy}
//           r="15"
//           fill="green"
//           opacity="0.5"
//         />
//       ))}
//     </svg>
//   );
// };

// export default App;


import React, { useState } from 'react';

export const Circle = ({ id, cx, cy, onMouseDown }) => {
  return (
    <circle
      id={id}
      cx={cx}
      cy={cy}
      r="15"
      fill="orange"
      onMouseDown={(e) => onMouseDown(e, id)}
      style={{ cursor: 'pointer' }}
    />
  );
};

export const Connection = ({ x1, y1, x2, y2 }) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="orange"
      strokeWidth="4"
    />
  );
};

const DragablePin = () => {
  // Default positions of circles
  const defaultPositions = {
    A: { cx: 100, cy: 100 },
    B: { cx: 100, cy: 100 },
    C: { cx: 300, cy: 100 },
    D: { cx: 300, cy: 100 }
  };

  const [circles, setCircles] = useState(defaultPositions);
  const [isDragging, setIsDragging] = useState(null);

  // Target positions for circles to snap to (only keep the ones you need)
  const targetPositions = {
    A: { cx: 200, cy: 200 },
    C: { cx: 400, cy: 200 }
  };

  const [connections] = useState([
    { from: 'A', to: 'B' },
    { from: 'C', to: 'D' }
  ]);

  const onMouseDown = (e, id) => {
    setIsDragging(id);
  };

  const onDrag = (e) => {
    if (isDragging) {
      const rect = e.target.closest('svg').getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCircles((prevCircles) => ({
        ...prevCircles,
        [isDragging]: { cx: x, cy: y }
      }));
    }
  };

  const onMouseUp = () => {
    if (isDragging) {
      const draggedCircle = circles[isDragging];
      let snapped = false;

      // Check if the circle should snap to any target position
      Object.keys(targetPositions).forEach((key) => {
        const targetCircle = targetPositions[key];
        const distance = Math.sqrt(
          Math.pow(draggedCircle.cx - targetCircle.cx, 2) +
          Math.pow(draggedCircle.cy - targetCircle.cy, 2)
        );

        const snapRadius = 50; // Distance threshold to snap to the target circle

        if (distance < snapRadius) {
          // Snap to the target position if within snap radius
          setCircles((prevCircles) => ({
            ...prevCircles,
            [isDragging]: targetCircle
          }));
          snapped = true;
        }
      });

      if (!snapped) {
        // Reset to the default position if no snap occurred
        setCircles((prevCircles) => ({
          ...prevCircles,
          [isDragging]: defaultPositions[isDragging]
        }));
      }
    }
    setIsDragging(null);
  };

  return (
    <svg 
      width="100%" 
      height="100vh" 
      onMouseMove={onDrag} 
      onMouseUp={onMouseUp}
      style={{ backgroundColor: '#f9f9f9' }}
    >
      {connections.map((conn, index) => (
        <Connection
          key={index}
          x1={circles[conn.from].cx}
          y1={circles[conn.from].cy}
          x2={circles[conn.to].cx}
          y2={circles[conn.to].cy}
        />
      ))}
      {Object.keys(circles).map((key) => (
        <Circle
          key={key}
          id={key}
          cx={circles[key].cx}
          cy={circles[key].cy}
          onMouseDown={onMouseDown}
        />
      ))}

      {/* Render the target circles */}
      {Object.keys(targetPositions).map((key) => (
        <circle
          key={key}
          cx={targetPositions[key].cx}
          cy={targetPositions[key].cy}
          r="15"
          fill="green"
          opacity="0.5"
        />
      ))}
    </svg>
  );
};

export default DragablePin;
