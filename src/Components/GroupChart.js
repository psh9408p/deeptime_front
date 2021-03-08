import React from 'react';
import Chart from 'react-apexcharts';

const GroupChart = ({ averageTime, myTime, targetTime }) => {
  const chartOption = {
    series: [
      { name: '나', data: [2, targetTime] },
      { name: '최소학습시간', data: [averageTime, targetTime] },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: ['나', '그룹'],
      },
    },
  };

  return (
    <>
      <div>
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={chartOption.options}
                series={chartOption.series}
                type="bar"
                width="600"
                height="300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChart;
