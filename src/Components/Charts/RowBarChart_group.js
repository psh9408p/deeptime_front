import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({ data_1, data_2, dateRange }) => {
  const labels = ['1st', 'Me', 'Group'];
  const title = '학습 시간 통계';
  const data_color = ['red', '#00BFFE', '#6de8a6'];

  const chartConfig = {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        {
          // label: label_1,
          backgroundColor: data_color,
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          borderWidth: 1,
          data: data_1,
          yAxisID: 'bar-y-axis1',
          stack: 'background',
        },
        {
          // label: label_2,
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
      responsive: false,
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
              decimalTime = decimalTime * 60;
              hours = Math.floor(decimalTime / 60);
              decimalTime = decimalTime - hours * 60;
              minutes = Math.round(decimalTime);
            }
            return (
              (tooltipItem.datasetIndex === 0
                ? tooltipItem.label === 'Group'
                  ? '평균 시간'
                  : '학습 시간'
                : '최소 시간') +
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
              labelString: dateRange === 'today' ? '시간(분)' : '시간(시)',
            },
            ticks: {
              beginAtZero: true,
              // min: 0,
              stepSize: dateRange === 'today' ? 10 : 1,
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
  }, [data_1, data_2, data_color, dateRange]);

  return (
    <canvas ref={chartContainer} style={{ width: '90%', height: '90%' }} />
  );
};
