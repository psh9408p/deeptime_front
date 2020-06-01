import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({ data, color, title, labels }) => {
  // const data_tmp_1 = 60;
  // const data_tmp_2 = 40;
  const chartConfig = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data,
          // data: [data_tmp_1, data_tmp_2],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
      labels,
    },
    options: {
      title: {
        display: true,
        text: title,
      },
    },
  };
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData, color) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.data.datasets[datasetIndex].borderColor = color;
    chartInstance.data.datasets[datasetIndex].backgroundColor = color;
    chartInstance.update();
  };

  const AreaChartUpdate = () => {
    updateDataset(0, data, color);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    AreaChartUpdate();
  }, [data]);

  return <canvas ref={chartContainer} />;
};
