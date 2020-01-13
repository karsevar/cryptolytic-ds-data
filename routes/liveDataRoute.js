const express = require("express");
const {
  findRecordByExchange,
  findRecordOneMonthAgo
} = require("./liveDataModels.js");

const router = express.Router();

router.post("/getExchangeData", (req, res) => {
  findRecordByExchange({ exchange: req.body.exchange })
    .then(result => {
      res.status(200).json({ data: result });
    })
    .catch(error => {
      res.status(500).json({ message: "command didnt work!", err: error });
    });
});

router.post("/getDataMonthAgo", (req, res) => {
  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  d.setHours(0, 0, 0);
  d.setMilliseconds(0);

  findRecordOneMonthAgo(
    (d / 1000) | 0,
    req.body.exchange,
    req.body.trading_pair
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
    req.body.trading_pair
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
  d.setHours(d.getHours() - 24);
  d.setMilliseconds(0);

  findRecordOneMonthAgo(
    (d / 1000) | 0,
    req.body.exchange,
    req.body.trading_pair
  )
    .then(result => {
      res.status(200).json({ data: result, "24_hours_ago": (d / 1000) | 0 });
    })
    .catch(error => {
      res.status(500).json({ message: "query didnt work", err: error });
    });
});

module.exports = router;
