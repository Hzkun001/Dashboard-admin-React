import React, { useState, useEffect } from 'react';
import BarChart01 from '../../charts/BarChart01'; // Impor BarChart01 untuk chart
import EditMenu from '../../components/DropdownEditMenu';
import { Link } from 'react-router-dom';

function DashboardCard01() {
  const [chartData, setChartData] = useState(null);
  const [bitcoinPrice, setBitcoinPrice] = useState(null); // State untuk harga Bitcoin dalam IDR
  const [volumeChange, setVolumeChange] = useState(null); // State untuk persentase perubahan volume

  useEffect(() => {
    // Mengambil data volume perdagangan Bitcoin dari CoinGecko (data 1 tahun terakhir)
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=idr&days=365')
      .then(response => response.json())
      .then(data => {
        // Format data yang diterima menjadi format chart.js
        const formattedData = {
          labels: data.total_volumes.map(item => new Date(item[0])),
          datasets: [
            {
              label: 'Bitcoin Trading Volume',
              data: data.total_volumes.map(item => item[1]),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: true,
            },
          ],
        };

        setChartData(formattedData);

        // Menambahkan logika untuk menghitung persentase perubahan volume dari hari ke hari
        const volumeToday = data.total_volumes[data.total_volumes.length - 1][1];
        const volumeYesterday = data.total_volumes[data.total_volumes.length - 2][1];
        const volumePercentageChange = ((volumeToday - volumeYesterday) / volumeYesterday) * 100;
        setVolumeChange(volumePercentageChange.toFixed(2));

      })
      .catch(error => console.error('Error fetching volume data:', error));

    // Mengambil harga Bitcoin saat ini dari CoinGecko dalam IDR
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=idr')
      .then(response => response.json())
      .then(data => {
        setBitcoinPrice(data.bitcoin.idr);
      })
      .catch(error => console.error('Error fetching Bitcoin price:', error));
  }, []); // Hanya memanggil API saat pertama kali komponen dimuat

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Bitcoin Trading Volume (Last Year)</h2>
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
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            Volume: {bitcoinPrice ? `Rp ${(bitcoinPrice * chartData?.datasets[0].data[chartData?.datasets[0].data.length - 1]).toLocaleString()}` : 'Loading...'}
          </div>
          <div className={`text-sm font-medium ${volumeChange > 0 ? 'text-green-700 bg-green-500/20' : 'text-red-700 bg-red-500/20'} px-1.5 rounded-full`}>
            {volumeChange ? `${volumeChange}%` : 'Loading...'}
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Jika data chart tersedia, tampilkan chart */}
        {chartData ? (
          <BarChart01 data={chartData} width={389} height={128} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard01;
