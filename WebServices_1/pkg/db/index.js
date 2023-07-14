const mongoose = require("mongoose");
const dotenv = require("dotenv");

//* So dotenv ja konfigurirame okolinata i vmetnuvame config.env da e del od process.env objektot
dotenv.config({path: `${__dirname}/../../config.env`});

//* Da se zameni nasiot password so zborot <password> vo url-ot
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//* Kreiravme funkcija so koja funkcija kje eksportirame i kje povikame vo app.js (povrzuvanje so database)
exports.init = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to the DATABASE");
  } catch (err) {
    console.log(err);
  }
};