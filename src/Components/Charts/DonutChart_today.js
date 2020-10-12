import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

export default ({ data, color, title, labels }) => {
  // const data_tmp_1 = 60;
  // const data_tmp_2 = 40;

  // 현재 시간 계산을 위함
  let nowTime_count =
    Math.ceil((new Date().getHours() * 60 + new Date().getMinutes()) / 5) - 1;
  if (nowTime_count === -1) {
    nowTime_count = 0;
  }

  const currentTime_data = [
    0,
    0,
    0,
    0,
    nowTime_count,
    1,
    288 - (nowTime_count + 1),
  ];

  const chartConfig = {
    type: 'doughnut',
    data: {
      datasets: [
        // {
        //   data: [1],
        //   backgroundColor: ['rgba(0, 0, 0, 0)'],
        //   // borderColor: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)'],
        //   borderWidth: 1,
        // },
        {
          data: currentTime_data,
          backgroundColor: [
            '#7BA9EB',
            'rgba(233, 236, 244, 1)',
            '#EAD6D4',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
          ],
          borderColor: [
            'rgba(123, 169, 235, 0)',
            'rgba(233, 236, 244, 0)',
            'rgba(15,76,130, 0)',
            'rgba(255, 118, 117, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
          ],
          borderWidth: 0.5,
        },
        {
          data,
          // data: [data_tmp_1, data_tmp_2],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
      labels,
    },
    options: {
      tooltips: false,
      legend: {
        display: true,
        position: 'right',
      },
      title: {
        display: true,
        fontSize: 13,
        fontColor: 'black',
        text: title,
      },
      plugins: {
        datalabels: false,
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

  //현재 시간전용 업데이트
  const updateDataset_time = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
  };

  const updateDataset = (datasetIndex, newData, color) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.data.datasets[datasetIndex].borderColor = color;
    chartInstance.data.datasets[datasetIndex].backgroundColor = color;
  };

  const AreaChartUpdate = () => {
    updateDataset_time(0, currentTime_data);
    updateDataset(1, data, color);
    chartInstance.update();
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    AreaChartUpdate();
  }, [data]);

  return <canvas ref={chartContainer} />;
};
