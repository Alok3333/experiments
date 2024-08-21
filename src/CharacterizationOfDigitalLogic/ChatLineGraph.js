// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid } from "@mui/material";
import styles from "./CharacterizationOfDigitalLogic.module.css";

const data = {
  labels: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  values: [
    3.94, 3.92, 3.76, 3.53, 3.22, 2.02, 0.31, 0.17, 0.15, 0.15, 0.15, 0.15,
    0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15,
    0.15, 0.15,
  ],
};

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Define the chart data and options
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "My Line Chart",
        data: data.values,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "NAND-2 INPUT[V]",
        },
      },
      y: {
        title: {
          display: true,
          text: "NAND-2 OUTPUT[V]",
        },
      },
    },
  };

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <div className={styles.cardWrapperChatLine}>
            <div style={{ width: "100%", height: "100%" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LineChart;
