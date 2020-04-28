import React, { useEffect, useRef, useState } from "react"
import Chartjs from "chart.js"

export default ({ data_1, data_2 }) => {
  const chartConfig = {
    type: "doughnut",
    data: {
      label: ["공부", "집중"],
      datasets: [
        {
          label: ["공부", "집중"],
          data: [data_1, data_2],
          backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(238, 238, 238, 0.5)"],
          borderColor: ["rgba(15, 76, 130, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Today 학습 성취도",
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

  const updateDataset = (datasetIndex, datasetIndex_2, newData) => {
    chartInstance.data.datasets[datasetIndex].data[datasetIndex_2] = newData
    chartInstance.update()
  }

  const AreaChartUpdate = () => {
    updateDataset(0, 0, data_1)
    updateDataset(0, 1, data_2)
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
