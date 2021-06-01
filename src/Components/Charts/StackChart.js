import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const StackChart = ({ inputData, start, end }) => {
  const canvasDom = useRef(null);

  const data = {
    labels: ['진도'],
    datasets: [
      {
        label: '학습 완료',
        backgroundColor: '#008EFC',
        data: [0],
      },
      {
        label: '이번주 완료',
        backgroundColor: '#7AC6FC',
        data: [0],
      },
      {
        label: '이번주 목표',
        backgroundColor: '#D6EEFF',
        data: [0],
      },
      ...inputData,
    ],
  };
  const options = {
    // responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
        filter: function (legendItem, chartData) {
          const viewCount = 2;
          // return true or false based on legendItem's datasetIndex (legendItem.datasetIndex)
          // 앞에 viewCount 순서 만큼 Legend가 나오게 설정
          return legendItem.datasetIndex > viewCount ? false : true;
        },
      },
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            min: start - 1,
            max: end,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  useEffect(() => {
    const ctx = canvasDom.current.getContext('2d');
    new Chart(ctx, {
      type: 'horizontalBar',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasDom} height={100} width={300}></canvas>
    </div>
  );
};

export default StackChart;
