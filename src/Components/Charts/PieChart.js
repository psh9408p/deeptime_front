import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import 'chartjs-plugin-datalabels';

export default ({ data, dataColor, title, labels, updateBoolean }) => {
  const chartConfig = {
    type: 'pie',
    data: {
      datasets: [
        {
          data,
          backgroundColor: dataColor,
          label: '시간 비율',
        },
      ],
      labels: labels,
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title,
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
            var dataset = context.dataset;
            var count = dataset.data.length;
            var value = dataset.data[context.dataIndex];
            return value > count * 1.5;
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

  const updateDataset = (datasetIndex, newData, newColor) => {
    chartInstance.data.labels = labels;
    chartInstance.options.title.text = title;
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.data.datasets[datasetIndex].backgroundColor = newColor;
    chartInstance.update();
    // console.log(chartInstance);
  };

  const AreaChartUpdate = () => {
    updateDataset(0, data, dataColor);
    // updateDataset(0, 1, data_2);
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
  }, [data, updateBoolean]);

  return <canvas ref={chartContainer} />;
};
