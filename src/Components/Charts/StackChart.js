import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const StackChart = () => {
  const canvasDom = useRef(null);

  const data = {
    labels: ['진도'],
    datasets: [
      {
        label: '계계',
        stack: 'stack1',
        backgroundColor: '#04A9F5',
        borderColor: '#04A9F5',
        borderWidth: 1,
        hoverBackgroundColor: '#04A9F5',
        hoverBorderColor: '#04A9F5',
        data: [25],
      },
      {
        label: '계획',
        stack: 'stack1',
        backgroundColor: '#A8C6F5',
        borderColor: '#A8C6F5',
        borderWidth: 1,
        hoverBackgroundColor: '#A8C6F5',
        hoverBorderColor: '#A8C6F5',
        data: [34],
      },
      {
        label: '미계획',
        stack: 'stack1',
        backgroundColor: 'black',
        borderColor: '#A8C6F5',
        borderWidth: 1,
        hoverBackgroundColor: '#A8C6F5',
        hoverBorderColor: '#A8C6F5',
        data: [31],
      },
      {
        label: '계계',
        stack: 'stack1',
        backgroundColor: '#04A9F5',
        borderColor: '#04A9F5',
        borderWidth: 1,
        hoverBackgroundColor: '#04A9F5',
        hoverBorderColor: '#04A9F5',
        data: [25],
      },
      {
        label: '계획',
        stack: 'stack1',
        backgroundColor: '#A8C6F5',
        borderColor: '#A8C6F5',
        borderWidth: 1,
        hoverBackgroundColor: '#A8C6F5',
        hoverBorderColor: '#A8C6F5',
        data: [34],
      },
      {
        label: '미계획',
        stack: 'stack1',
        backgroundColor: 'black',
        borderColor: '#A8C6F5',
        borderWidth: 1,
        hoverBackgroundColor: '#A8C6F5',
        hoverBorderColor: '#A8C6F5',
        data: [31],
      },
    ],
  };
  const options = {
    // responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
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
