const express = require("express");
const {
  findRecordByExchange,
  findRecordOneMonthAgo,
  findRecordByExchangeAndPeriod,
  findArbitrage,
  findTrade,
  findTradeUpDown
} = require("./liveDataModels.js");

const router = express.Router();

router.post("/CompareTwoExchanges", (req, res) => {
  var d = new Date();
  d.setMonth(d.getMonth() - 2);

  d.setHours(0, 0, 0);
  d.setMilliseconds(0);

  findRecordOneMonthAgo(
    (d / 1000) | 0,
    req.body.exchange_1,
    req.body.trading_pair,
    300
  )
    .then(result1 => {
      findRecordOneMonthAgo(
        (d / 1000) | 0,
        req.body.exchange_2,
        req.body.trading_pair,
        300
      )
        .then(result2 => {
          res
            .status(200)
            .json({ data: { exchange_1: result1, exchange_2: result2 } });
        })
        .catch(err => {
          res.status(500).json({ message: err });
        });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

router.post("/getExchangeDataByPeriod", (req, res) => {
  findRecordByExchangeAndPeriod({
    exchange: req.body.exchange,
    period: req.body.period
  })
    .then(result => {
      res.status(200).json({ data: result });
    })
    .catch(error => {
      res.status(500).json({ message: "command didnt work", err: error });
    });
});

router.post("/getExchangeData", (req, res) => {
  findRecordByExchange({ exchange: req.body.exchange })
    .then(result => {
      res.status(200).json({ data: result });
    })
    .catch(error => {
      res.status(500).json({ message: "command didnt work!", err: error });
    });
});

router.post("/getDataByMonth", (req, res) => {
  var d = new Date();
  d.setMonth(d.getMonth() - 2);

  d.setHours(0, 0, 0);
  d.setMilliseconds(0);

  findRecordOneMonthAgo(
    (d / 1000) | 0,
    req.body.exchange,
    req.body.trading_pair,
    300
  )
    .then(result => {
      res.status(200).json({ data: result, lastMonth: (d / 1000) | 0 });
    })
    .catch(error => {
      res.status(500).json({ message: "query didnt work", err: error });
    });
});

router.post("/getDataByWeek", (req, res) => {
  var d = new Date();
  d.setHours(d.getHours() - 168);
  d.setMilliseconds(0);

  findRecordOneMonthAgo(
    (d / 1000) | 0,
    req.body.exchange,
    req.body.trading_pair,
    300
  )
    .then(result => {
      res.status(200).json({ data: result, lastWeek: (d / 1000) | 0 });
    })
    .catch(error => {
      res.status(500).json({ message: "query didnt work", err: error });
    });
});

router.post("/getDataByDay", (req, res) => {
  var d = new Date();
  d.setHours(d.getHours() - 36);
  d.setMilliseconds(0);

  findRecordOneMonthAgo(
    (d / 1000) | 0,
    req.body.exchange,
    req.body.trading_pair,
    300
  )
    .then(result => {
      res.status(200).json({ data: result, "24_hours_ago": (d / 1000) | 0 });
    })
    .catch(error => {
      res.status(500).json({ message: "query didnt work", err: error });
    });
});

router.get("/getTradePredictions", (req, res) => {
  findTrade()
    .then(result => {
      let newArray = result.map(trade => {
        var date = trade.timestamp * 1000;

        return { ...trade, timestamp: date };
      });

      res.status(200).json({
        data: newArray,
        message: "Trading prediction call was a success"
      });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

router.get("/getTradePredictionsClean", (req, res) => {
  findTradeUpDown()
    .then(results => {
      var d = new Date();
      d.setHours(d.getHours() - 24);
      unixTime = d.getTime() / 1000;

      console.log(unixTime);
      let newArray = results.filter(trade => trade.timestamp >= unixTime);

      let newArray2 = newArray.map(trade => {
        var date = trade.timestamp * 1000;

        return { ...trade, timestamp: date };
      });

      res
        .status(200)
        .json({ data: newArray2, message: "find arbitrage endpoint success" });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

router.get("/getArbitragePredictions", (req, res) => {
  findArbitrage()
    .then(results => {
      let newArray = results.map(trade => {
        var date = new Date(trade.timestamp * 1000);

        return { ...trade, timestamp: date };
      });

      res
        .status(200)
        .json({ data: newArray, message: "find arbitrage endpoint success" });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

module.exports = router;
