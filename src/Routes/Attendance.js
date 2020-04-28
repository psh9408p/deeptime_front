import React, { useEffect, useRef, useState } from "react"
import Chartjs from "chart.js"

export default () => {
  const Chart = ({ dat, dat2 }) => {
    const chartConfig = {
      type: "line",
      data: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8 ",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
        datasets: [
          {
            label: "수업",
            data: dat,
            backgroundColor: ["rgba(238, 238, 238, 0.5)"],
            borderColor: ["rgba(255, 255, 255, 0.2)"],
            pointBackgroundColor: ["rgba(255, 255, 255, 0.2)"],
            pointBorderColor: ["rgba(255, 255, 255, 0.2)"],
            pointRadius: 0,
          },
          {
            label: "집중",
            data: dat2,
            backgroundColor: ["rgba(54, 162, 235, 1)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            pointRadius: 3,
          },
        ],
      },

      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
        title: {
          display: false,
          text: "Chart.js Line Chart - Multi Axis",
        },
        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
    const chartContainer = useRef(null)
    const [chartInstance, setChartInstance] = useState(null)

    useEffect(() => {
      if (chartContainer && chartContainer.current) {
        const newChartInstance = new Chartjs(chartContainer.current, chartConfig)
        setChartInstance(newChartInstance)
      }
    }, [chartContainer])

    return <canvas ref={chartContainer} />
  }
}
