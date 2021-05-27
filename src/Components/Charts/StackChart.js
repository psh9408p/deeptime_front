import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const StackChart = () => {
  const canvasDom = useRef(null);

  const dataBox = [15, 20];
  const colorBox = ['green', 'blue'];

  const data = {
    labels: ['진도'],
    datasets: [
      {
        label: 'dd',
        backgroundColor: '#7AC6FC',
        data: [0],
      },
      {
        label: 'dd',
        backgroundColor: '#D6EEFF',
        data: [0],
      },
      {
        label: 'dd',
        backgroundColor: 'green',
        data: [10],
      },
      {
        label: 'sss',
        backgroundColor: 'blue',
        data: [20],
      },
      {
        // label: 'sss',
        backgroundColor: 'blue',
        data: [20],
      },
      // {
      //   stack: 'stack1',
      //   backgroundColor: '#7AC6FC',
      //   borderColor: '#A8C6F5',
      //   borderWidth: 1,
      //   hoverBackgroundColor: '#7AC6FC',
      //   hoverBorderColor: '#A8C6F5',
      //   data: [34],
      // },
      // {
      //   stack: 'stack1',
      //   backgroundColor: '#D6EEFF',
      //   borderColor: '#A8C6F5',
      //   borderWidth: 1,
      //   hoverBackgroundColor: '#D6EEFF',
      //   hoverBorderColor: '#A8C6F5',
      //   data: [31],
      // },
      // {
      //   stack: 'stack1',
      //   backgroundColor: 'white',
      //   borderColor: '#04A9F5',
      //   borderWidth: 1,
      //   hoverBackgroundColor: 'white',
      //   hoverBorderColor: '#04A9F5',
      //   data: [25],
      // },
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
          const viewCount = 1;
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
            min: 0,
            max: 40,
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
