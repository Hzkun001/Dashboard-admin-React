// src/services/cryptoApi.js
export const fetchCryptoMarkets = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
      const data = await response.json();
  
      return data.map((coin) => ({
        name: coin.name,
        price: coin.current_price,
      }));
    } catch (error) {
      console.error('Error fetching crypto markets:', error);
      return [];
    }
  };
  