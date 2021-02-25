import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({
  data_1,
  data_2,
  labels,
  legend,
  title,
  title_y,
  dateRange,
  max = 0,
  stepSize,
}) => {
  const yTicks = {
    beginAtZero: true,
    min: 0,
    stepSize,
    callback: function (value, index, values) {
      if (value > 60) {
        return '';
      }
      return value;
    },
  };
  if (max !== 0) {
    yTicks.max = max;
  }

  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: legend[0],
          data: data_1,
          backgroundColor: ['rgba(123, 169, 235, 0)'],
          borderColor: ['#0F4C82'],
          pointRadius: 3,
        },
        {
          label: legend[1],
          data: data_2,
          backgroundColor: ['rgba(123, 169, 235, 0)'],
          borderColor: ['rgba(123, 213, 245, 0.5)'],
          // pointBackgroundColor: ["rgba(255, 255, 255, 0.2)"],
          // pointBorderColor: ["rgba(255, 255, 255, 0.2)"],
          pointRadius: 3,
        },
      ],
    },
    options: {
      legend: {
        display: true,
      },
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        fontSize: 13,
        fontColor: 'black',
        text: title,
      },
      plugins: {
        datalabels: false,
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            let returnValue = '';
            if (dateRange === 'today') {
              returnValue =
                tooltipItem[0].xLabel +
                '~' +
                (parseFloat(tooltipItem[0].xLabel) + 1) +
                '시';
            } else if (dateRange === 'week') {
              returnValue = tooltipItem[0].xLabel + '요일';
            } else {
              returnValue = tooltipItem[0].xLabel + '일';
            }
            return returnValue;
          },
          label: function (tooltipItem, data) {
            // console.log(tooltipItem, data, 'sdd');
            let decimalTime = parseFloat(tooltipItem.value);
            let hours = 0;
            let minutes = 0;
            if (dateRange === 'today') {
              hours = Math.floor(decimalTime / 60);
              decimalTime = decimalTime - hours * 60;
              minutes = Math.round(decimalTime);
            } else {
              hours = Math.floor(decimalTime);
              decimalTime = decimalTime - hours;
              minutes = Math.round(decimalTime * 60);
            }
            return hours + '시간 ' + minutes + '분';
          },
        },
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
            ticks: yTicks,
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

  const updateDataset = (newArray) => {
    // console.log(newArray, chartInstance);
    for (let i = 0; i < newArray.length; i++) {
      chartInstance.data.datasets[i].data = newArray[i];
    }
    chartInstance.data.labels = labels;
    chartInstance.update();
  };

  const AreaChartUpdate = () => {
    updateDataset([data_1, data_2]);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    AreaChartUpdate();
  }, [data_1, data_2, labels]);

  return <canvas ref={chartContainer} />;
};
