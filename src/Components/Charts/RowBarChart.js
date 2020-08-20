import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({
  data_1,
  data_2,
  labels,
  label_1,
  label_2,
  title,
  title_x,
  stepSize_x,
}) => {
  // const data_tmp_1 = [40, 60, 30, 50, 40];
  // const data_tmp_2 = [60, 90, 30, 60, 100];
  // const labels_tmp = ['국어', '영어', '수학', '과학', '사회'];

  const chartConfig = {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        {
          label: label_1,
          backgroundColor: 'rgba(123, 169, 235, 1)',
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          borderWidth: 1,
          data: data_1,
          yAxisID: 'bar-y-axis1',
          stack: 'background',
        },
        {
          label: label_2,
          backgroundColor: 'rgba(233, 236, 244, 1)',
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          borderWidth: 1,
          data: data_2,
          yAxisID: 'bar-y-axis2',
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: title,
      },
      plugins: {
        datalabels: false,
      },
      scales: {
        xAxes: [
          {
            id: 'bar-x-axis1',
            ticks: {
              beginAtZero: true,
              stepSize: stepSize_x,
            },
            scaleLabel: {
              display: true,
              labelString: title_x,
            },
          },
        ],
        yAxes: [
          {
            id: 'bar-y-axis2',
          },
          {
            display: false,
            offset: true,
            id: 'bar-y-axis1',
            type: 'category',
            gridLines: {
              offsetGridLines: true,
            },
          },
        ],
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

  // console.log(chartInstance);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const updateLabel = (newData) => {
    chartInstance.data.labels = newData;
    chartInstance.update();
  };

  const AreaChartUpdate = () => {
    updateDataset(0, data_1);
    updateDataset(1, data_2);
    updateLabel(labels);
    // updateDataset(0, data_tmp_1);
    // updateDataset(1, data_tmp_2);
    // updateLabel(labels_tmp);
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
