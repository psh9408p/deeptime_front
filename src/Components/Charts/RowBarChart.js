import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({
  data_1,
  data_2,
  data_color,
  labels,
  label_1,
  label_2,
  title,
  title_x,
  dateRange,
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
          backgroundColor: data_color,
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
        fontSize: 13,
        fontColor: 'black',
        text: title,
      },
      plugins: {
        datalabels: false,
      },
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
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
            return (
              (tooltipItem.datasetIndex === 0 ? label_1 : label_2) +
              ': ' +
              hours +
              '시간 ' +
              minutes +
              '분'
            );
          },
        },
      },
      scales: {
        xAxes: [
          {
            id: 'bar-x-axis1',
            // ticks: {
            //   beginAtZero: true,
            //   stepSize: stepSize_x,
            // },
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
  };

  const AreaChartUpdate = () => {
    updateDataset(0, data_1);
    updateDataset(1, data_2);
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].backgroundColor = data_color;
    chartInstance.update();
    // console.log(chartInstance);
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
  }, [data_1, data_2, data_color]);

  return <canvas ref={chartContainer} />;
};
