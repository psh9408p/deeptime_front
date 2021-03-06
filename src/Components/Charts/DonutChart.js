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
          backgroundColor: ['#0F4C82', 'rgba(233,236,244,1)'],
          borderColor: ['#0F4C82', 'rgba(233,236,244,1)'],
          borderWidth: 1,
        },
      ],
      labels,
    },
    options: {
      title: {
        display: true,
        fontSize: 13,
        fontColor: 'black',
        text: title,
      },
      plugins: {
        datalabels: false,
      },
      aspectRatio: 1,
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
  };

  const AreaChartUpdate = () => {
    updateDataset(0, 0, data_1);
    updateDataset(0, 1, data_2);
    chartInstance.update();
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
