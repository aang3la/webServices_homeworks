const mongoose = require("mongoose");
const dotenv = require("dotenv");

//* Ja konfigurirame okolinata i vmetnuvame config.env da e del od process.env objektot
dotenv.config({path: `${__dirname}/../../config.env`});

//* Da se zameni nasiot pass wo zborot pass vo url-ot
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

//* Kreirame funkcija za povrzuvanje so database
exports.init = async () => {
    try{
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Sucessfully connected to the DATABASE")
    }
    catch(err) {
        console.log(err);
    }
}