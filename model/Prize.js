const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const prizeSchema = new Schema({
  year: Number,
  category: String,
  overallMotivation: String,
  laureates: [
    {
      id: String,
      firstname: String,
      surname: String,
      motivation: String,
      share: Number
    }
  ]
});

module.exports = Prize = mongoose.model("Prizes", prizeSchema);
