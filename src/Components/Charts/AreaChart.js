import React, { useEffect, useRef, useState } from "react"
import Chartjs from "chart.js"

export default ({ data_1 }) => {
  const dat_tmp = [
    70,
    90,
    80,
    60,
    40,
    90,
    70,
    80,
    70,
    90,
    80,
    90,
    80,
    60,
    80,
    70,
    70,
    90,
    80,
    60,
    90,
    80,
    60,
    100,
  ]

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
        // {
        //   label: "수업",
        //   data: dat,
        //   backgroundColor: ["rgba(255, 255, 255, 0.1)"],
        //   borderColor: ["rgba(255, 255, 255, 0.2)"],
        //   pointBackgroundColor: ["rgba(255, 255, 255, 0.2)"],
        //   pointBorderColor: ["rgba(255, 255, 255, 0.2)"],
        //   pointRadius: 0,
        // },
        {
          label: "학습량",
          data: data_1,
          backgroundColor: ["rgba(54, 162, 235, 1)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          pointRadius: 3,
        },
      ],
    },

    options: {
      legend: {
        display: false,
      },
      responsive: true,
      hoverMode: "index",
      stacked: false,
      title: {
        display: true,
        text: "Today 시간 별 학습량",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "시간 (하루 24시 기준)",
            },
          },
        ],
        yAxes: [
          {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "left",
            id: "y-axis-1",
            scaleLabel: {
              display: true,
              labelString: "학습량(분, Min)",
            },
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

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData
    chartInstance.update()
  }

  const AreaChartUpdate = () => {
    updateDataset(0, data_1)
  }

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    AreaChartUpdate()
  }, [data_1])

  return <canvas ref={chartContainer} />
}
