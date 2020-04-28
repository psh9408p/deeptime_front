import React, { useEffect, useRef, useState } from "react"
import Chartjs from "chart.js"

export default ({ data_1, data_2, labels }) => {
  // const dat = [15, 9, 3, 5, 8, 3, 9]
  // const dat2 = [20, 9, 3, 5, 8, 3, 9]

  const chartConfig = {
    type: "horizontalBar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Actual",
          backgroundColor: "rgba(0, 0, 255, 0.5)",
          borderWidth: 1,
          data: data_1,
          yAxisID: "bar-y-axis1",
          stack: "background",
        },
        {
          label: "Target",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          data: data_2,
          yAxisID: "bar-y-axis2",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "수업 별 학습 성취도",
      },
      scales: {
        xAxes: [
          {
            id: "bar-x-axis1",
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        yAxes: [
          {
            id: "bar-y-axis2",
            categoryPercentage: 0.8,
            barPercentage: 0.9,
          },
          {
            display: false,
            offset: true,
            id: "bar-y-axis1",
            type: "category",
            categoryPercentage: 0.8,
            barPercentage: 0.9,

            gridLines: {
              offsetGridLines: true,
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

  console.log(chartInstance)

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData
    chartInstance.update()
  }

  const updateLabel = (newData) => {
    chartInstance.data.labels = newData
    chartInstance.update()
  }

  const AreaChartUpdate = () => {
    updateDataset(0, data_1)
    updateDataset(1, data_2)
    updateLabel(labels)
  }

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    AreaChartUpdate()
  }, [data_1, data_2])

  return <canvas ref={chartContainer} />
}
