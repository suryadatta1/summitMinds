const express = require("express");
const router = express.Router();

const Prize = require("../model/Prize");

// sorting
router.get("/", async (req, res) => {
  const prize = await Prize.find().sort({ year: -1, category: 1 });
  res.send(prize);
});

//finding with year
router.get("/year", async (req, res) => {
  console.log(req.body);
  try {
    await Prize.findOne({ year: req.body.year }, (err, obj) => {
      if (err) {
        console.log(err);
        res.send("operation failed");
      } else {
        res.send(obj);
        console.log(obj);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// searching with categoy and Year
router.get("/categoryYear", async (req, res) => {
  console.log(req.body);
  try {
    await Prize.find(
      { $and: [{ year: req.body.year }, { category: req.body.category }] },
      (err, obj) => {
        if (err) {
          console.log(err);
          res.send("operation failed");
        } else {
          res.send(obj);
          console.log(obj);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
//search with name
router.get("/name", async (req, res) => {
  console.log(req.body);
  try {
    await Prize.findOne(
      { "laureates.firstname": req.body.firstname },
      (err, obj) => {
        if (err) {
          console.log(err);
          res.send("operation failed");
        } else {
          res.send(obj);
          console.log(obj);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
