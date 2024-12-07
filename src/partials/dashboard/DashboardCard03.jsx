import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CryptoVolumeChartCard() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Mengambil data volume perdagangan Bitcoin dari CoinGecko
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=idr&days=7')
      .then(response => response.json())
      .then(data => {
        const formattedData = {
          labels: data.total_volumes.map(item => new Date(item[0])),
          datasets: [
            {
              label: 'Bitcoin Trading Volume',
              data: data.total_volumes.map(item => item[1]),
              backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                return chartAreaGradient(ctx, chartArea, [
                  { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0)` },
                  { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.3)` },
                ]);
              },
              borderColor: tailwindConfig().theme.colors.blue[500],
              borderWidth: 2,
              fill: true,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
              pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
              pointBorderWidth: 0,
              pointHoverBorderWidth: 0,
              tension: 0.4,
            },
          ],
        };
        setChartData(formattedData);
      })
      .catch((error) => console.error('Error fetching volume data:', error));
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Bitcoin Trading Volume (Last 7 Days)</h2>
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                Option 1
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                Option 2
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Volume</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">$9,962</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {chartData && <LineChart data={chartData} width={389} height={128} />}
      </div>
    </div>
  );
}

export default CryptoVolumeChartCard;
