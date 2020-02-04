const dataScienceDb = require("../data/dbConfig.js");

module.exports = {
  findRecordByExchange,
  findRecordOneMonthAgo,
  findRecordByExchangeAndPeriod,
  findArbitrage,
  findTrade,
  findTradeUpDown
};

function findRecordByExchange(filter) {
  return dataScienceDb("candlesticks")
    .where(filter)
    .limit(1000);
}

function findRecordOneMonthAgo(monthAgo, exchange, trading_pair, period) {
  return dataScienceDb("candlesticks")
    .where({ exchange })
    .where({ trading_pair })
    .where({ period })
    .where("timestamp", ">", monthAgo);
}

function findRecordByExchangeAndPeriod(exchange, period) {
  return dataScienceDb("candlesticks")
    .where({ exchange })
    .where({ period })
    .limit(200);
}

function findTrade() {
  return dataScienceDb("predictions")
    .where({ model_type: "trade" })
    .limit(20);
}

function findArbitrage() {
  return dataScienceDb("predictions").where({ model_type: "arbitrage" });
}

function findTradeUpDown() {
  return dataScienceDb("predictions")
    .where({ model_type: "trade" })
    .whereNot("prediction", "=", "0.0");
}
