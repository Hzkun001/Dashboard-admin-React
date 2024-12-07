import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';

function CryptoMarketCard() {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    // Mengambil data harga Bitcoin dari CoinGecko
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
      .then(response => response.json())
      .then(data => setCryptoData(data))
      .catch(error => console.error('Error fetching crypto data:', error));
  }, []);

  if (!cryptoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Bitcoin Market Data</h2>
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
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Market Data</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            ${cryptoData.market_data.current_price.idr.toLocaleString()}
          </div>
          <div className={`text-sm font-medium ${cryptoData.market_data.price_change_percentage_24h > 0 ? 'text-green-700' : 'text-red-500'} px-1.5 bg-opacity-20 rounded-full`}>
            {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoMarketCard;
