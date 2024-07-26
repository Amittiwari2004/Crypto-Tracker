import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './LineChart.css';

const LineChart = ({ historicalData, width }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const formattedData = [
        ['Date', 'Price'],
        ...historicalData.prices.map(([timestamp, price]) => [
          new Date(timestamp),
          price
        ])
      ];
      setChartData(formattedData);
      setLoading(false);
    }
  }, [historicalData]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="chart-container">
      <h2>Price History (Last 10 Days)</h2>
      <Chart
        width={width}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          hAxis: {
            title: 'Date',
            textStyle: { color: '#ffffff' },
            titleTextStyle: { color: '#ffffff' },
          },
          vAxis: {
            title: 'Price (USD)',
            textStyle: { color: '#ffffff' },
            titleTextStyle: { color: '#ffffff' },
          },
          colors: ['#4285F4'],
          backgroundColor: '#1e1e1e',
          legend: { textStyle: { color: '#ffffff' } },
          chartArea: { width: '80%', height: '70%' },
        }}
      />
    </div>
  );
};

export default LineChart;