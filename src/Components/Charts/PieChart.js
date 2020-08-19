import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import 'chartjs-plugin-labels';

export default ({
  data_1,
  data_2,
  dataColor_1,
  dataColor_2,
  title,
  labels,
}) => {
  var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
  };

  const chartConfig = {
    type: 'pie',
    data: {
      datasets: [
        {
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
          backgroundColor: [
            'rgba(123, 169, 235, 1)',
            'rgba(123, 169, 235, 1)',
            'rgba(123, 169, 235, 1)',
            'rgba(123, 169, 235, 1)',
            'rgba(123, 169, 2, 1)',
          ],
          label: 'Dataset 1',
        },
        // {
        //   data: [
        //     randomScalingFactor(),
        //     randomScalingFactor(),
        //     randomScalingFactor(),
        //     randomScalingFactor(),
        //     randomScalingFactor(),
        //   ],
        //   backgroundColor: [
        //     'rgba(123, 169, 235, 1)',
        //     'rgba(123, 169, 235, 1)',
        //     'rgba(123, 169, 235, 1)',
        //     'rgba(123, 169, 235, 1)',
        //     'rgba(123, 169, 2, 1)',
        //   ],
        // },
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
        labels: {
          // mode 'label', 'value' or 'percentage', default is 'percentage'
          render: 'percentage',

          // precision for percentage, default is 0
          precision: 1,

          // font size, default is defaultFontSize
          fontSize: 15,

          // font color, default is '#fff'
          fontColor: 'black',

          // font style, default is defaultFontStyle
          fontStyle: 'bold',

          position: 'outside',
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
