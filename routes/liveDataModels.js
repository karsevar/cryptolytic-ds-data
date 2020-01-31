const dataScienceDb = require("../data/dbConfig.js");

module.exports = {
  findRecordByExchange,
  findRecordOneMonthAgo,
  findRecordByExchangeAndPeriod,
  findArbitrage,
  findTrade
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

function findArbitrage() {
  return dataScienceDb("predictions").where({ model_type: "trade" });
}

function findTrade() {
  return dataScienceDb("predictions").where({ model_type: "arbitrage" });
}
