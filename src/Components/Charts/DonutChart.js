import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({ data_1, data_2, title, labels }) => {
  // const data_tmp_1 = 60;
  // const data_tmp_2 = 40;
  const chartConfig = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [data_1, data_2],
          // data: [data_tmp_1, data_tmp_2],
          backgroundColor: ['rgba(123, 169, 235, 1)', 'rgba(233,236,244,1)'],
          borderColor: ['rgba(123, 169, 235, 1)', 'rgba(233,236,244,1)'],
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
      plugins: {
        labels: false,
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

  const updateDataset = (datasetIndex, datasetIndex_2, newData) => {
    chartInstance.data.datasets[datasetIndex].data[datasetIndex_2] = newData;
    chartInstance.update();
  };

  const AreaChartUpdate = () => {
    updateDataset(0, 0, data_1);
    updateDataset(0, 1, data_2);
    // updateDataset(0, 0, data_tmp_1);
    // updateDataset(0, 1, data_tmp_2);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    AreaChartUpdate();
  }, [data_1, data_2]);

  return <canvas ref={chartContainer} />;
};
