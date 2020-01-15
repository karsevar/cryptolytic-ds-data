const dataScienceDb = require("../data/dbConfig.js");

module.exports = {
  findRecordByExchange,
  findRecordOneMonthAgo
};

function findRecordByExchange(filter) {
  return dataScienceDb("candlesticks")
    .where(filter)
    .limit(10);
}

function findRecordOneMonthAgo(monthAgo, exchange, trading_pair) {
  return dataScienceDb("candlesticks")
    .where({ exchange })
    .where({ trading_pair })
    .where("timestamp", ">", monthAgo)
    .limit(100);
}
