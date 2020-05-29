import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({ data_1, labels, title, title_y }) => {
  // const data_tmp = [
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   45,
  //   50,
  //   30,
  //   35,
  //   60,
  //   10,
  //   50,
  //   35,
  //   45,
  //   45,
  //   50,
  //   10,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  // ];

  const chartConfig = {
    type: 'line',
    data: {
      labels,
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
          label: '학습량',
          data: data_1,
          backgroundColor: ['rgba(123, 169, 235, 0)'],
          borderColor: ['rgba(123, 169, 235, 1)'],
          pointRadius: 3,
        },
      ],
    },

    options: {
      legend: {
        display: false,
      },
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        text: title,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
            scaleLabel: {
              display: true,
              labelString: title_y,
            },
            ticks: {
              beginAtZero: true,
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

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const AreaChartUpdate = () => {
    updateDataset(0, data_1);
    // updateDataset(0, data_tmp);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    AreaChartUpdate();
  }, [data_1]);

  return <canvas ref={chartContainer} />;
};
