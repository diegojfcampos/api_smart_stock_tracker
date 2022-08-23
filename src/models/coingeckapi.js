

//Importing CoinGecko API
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();
var func = async() => {
  let data = await CoinGeckoClient.ping();
  let coins = await CoinGeckoClient.coins.markets(price, volume);
};

