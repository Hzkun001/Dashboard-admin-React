// src/components/CryptoChart.jsx
import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';
import { chartColors } from '../charts/ChartjsConfig';
import { formatValue } from '../utils/Utils';

function CryptoChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Ganti dengan API CoinGecko atau API lainnya
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30')
      .then(response => response.json())
      .then(data => {
        const formattedData = {
          labels: data.prices.map(item => new Date(item[0])),
          datasets: [
            {
              label: 'Bitcoin Price',
              data: data.prices.map(item => item[1]),
              backgroundColor: chartColors.primary,
              borderColor: chartColors.primary,
              borderWidth: 1,
              fill: true,
            },
          ],
        };
        setChartData(formattedData);
      })
      .catch(error => console.error('Error fetching crypto data:', error));
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('cryptoChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D',
                },
              },
            },
            y: {
              ticks: {
                callback: function (value) {
                  return formatValue(value);
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className="shadow-lg rounded-lg p-5 bg-white dark:bg-gray-800">
      <h3 className="text-xl text-gray-800 dark:text-gray-100">Bitcoin Price (Last 30 Days)</h3>
      <canvas id="cryptoChart" width="400" height="200"></canvas>
    </div>
  );
}

export default CryptoChart;
