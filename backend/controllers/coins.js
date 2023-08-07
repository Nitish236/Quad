const { default: axios } = require("axios");
const { StatusCodes } = require("http-status-codes");

// Error
const CustomAPIError = require("../errors/custom-api");

// Coin Model
const Coin = require("../models/CoinModel");

/* ----------------------------------------------------------------------------------- */

//                                Function to Get the Coins

const getCoins = async (req, res) => {
  const URL = "https://api.wazirx.com/api/v2/tickers";

  const { data } = await axios.get(URL); // Get all the coins

  const top10 = []; // Stores top 10 coins

  let count = 0;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const coinData = data[key];

      // Make coin object
      const newCoin = {
        name: coinData.name.substring(0, coinData.name.indexOf("/")),
        last: parseFloat(coinData.last),
        buy: parseFloat(coinData.buy),
        sell: parseFloat(coinData.sell),
        volume: parseFloat(coinData.volume),
        base_unit: coinData.base_unit,
      };

      top10.push(newCoin);
      count++;
    }
    if (count == 10) break; // Break when we traversed 10 coins
  }

  // Inserting in the database
  const createCoins = await Coin.insertMany(top10);

  if (!createCoins) {
    throw new CustomAPIError("Server error try after some time");
  }

  // Pipeline to find the recent top 10 coins
  const pipeline = [
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        name: 1,
        last: 1,
        buy: 1,
        sell: 1,
        volume: 1,
        base_unit: 1,
      },
    },
  ];

  // Get the recent Top 10 coins
  const coins = await Coin.aggregate(pipeline);

  //Send the coins
  res.status(StatusCodes.OK).json(coins);
};

// Export Functionality

module.exports = {
  getCoins,
};
