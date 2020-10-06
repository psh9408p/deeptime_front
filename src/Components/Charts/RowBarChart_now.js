import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import 'chartjs-plugin-datalabels';

export default ({ data_1, data_2, title1, title2, scheduleColor }) => {
  // 값이 모두 0 검증
  const total_value = data_1 + data_2;
  const chartConfig = {
    type: 'horizontalBar',
    data: {
      datasets: [
        {
          label: '학습(분)',
          backgroundColor: scheduleColor,
          data: [data_1],
        },
        {
          label: '목표(분)',
          backgroundColor: 'rgba(233, 236, 244, 1)',
          data: [data_2],
        },
        {
          label: '해당 없음',
          backgroundColor: 'rgba(233, 236, 244, 1)',
          data: [total_value === 0 ? 1 : 0],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: [title1, title2],
      },
      legend: {
        display: true,
        labels: {
          filter: function (legendItem, data) {
            return legendItem.datasetIndex != 2;
          },
        },
      },
      tooltips: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              display: true,
            },
            gridLines: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          borderColor: 'white',
          borderRadius: 25,
          borderWidth: 2,
          color: 'black',
          display: function (context) {
            console.log(context, 'bb');
            var dataset = context.dataset;
            var datasetIndex = context.datasetIndex;
            var value = dataset.data[context.dataIndex];
            return datasetIndex === 0 && value > 0;
          },
          font: {
            weight: 'bold',
          },
          formatter: (value) => {
            return value + '%';
          },
        },
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
    chartInstance.data.datasets[datasetIndex].data = [newData];
    // console.log(chartInstance, '1');
  };

  const AreaChartUpdate = () => {
    // console.log(chartInstance, '1');
    updateDataset(0, data_1);
    updateDataset(1, data_2);
    updateDataset(2, total_value === 0 ? 1 : 0);
    chartInstance.options.title.text = [title1, title2];
    chartInstance.update();
    // console.log(chartInstance, '2');
    // updateDataset(0, data_tmp_1);
    // updateDataset(1, data_tmp_2);
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
