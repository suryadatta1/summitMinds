const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

 const nobelPrize = require('./routes/nobelPrizes');

const Prize = require("./model/Prize");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

const Prizes = JSON.parse(
  fs.readFileSync(__dirname + "/nobelPrize.json", "UTF8")
);

async function loadPrizes() {
  try {
    await Prize.insertMany(Prizes);
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}
//    loadPrizes()

app.use("/prize", nobelPrize);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
