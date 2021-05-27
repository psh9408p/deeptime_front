import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const StackChart = () => {
  const canvasDom = useRef(null);

  const data = {
    labels: ['진도'],
    datasets: [
      {
        stack: 'stack1',
        backgroundColor: '#008EFC',
        borderColor: '#04A9F5',
        borderWidth: 1,
        hoverBackgroundColor: '#008EFC',
        hoverBorderColor: '#04A9F5',
        data: [25],
      },
      {
        stack: 'stack1',
        backgroundColor: '#7AC6FC',
        borderColor: '#A8C6F5',
        borderWidth: 1,
        hoverBackgroundColor: '#7AC6FC',
        hoverBorderColor: '#A8C6F5',
        data: [34],
      },
      {
        stack: 'stack1',
        backgroundColor: '#D6EEFF',
        borderColor: '#A8C6F5',
        borderWidth: 1,
        hoverBackgroundColor: '#D6EEFF',
        hoverBorderColor: '#A8C6F5',
        data: [31],
      },
      {
        stack: 'stack1',
        backgroundColor: 'white',
        borderColor: '#04A9F5',
        borderWidth: 1,
        hoverBackgroundColor: 'white',
        hoverBorderColor: '#04A9F5',
        data: [25],
      },
    ],
  };
  const options = {
    // responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
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
