const mongoose = require("mongoose");

//* Blueprint - tempalte za dokumentite vo databazata
const oglasSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["avtomobili", "velosipedi", "nedviznini", "telefoni"],
        required: [true, "The category of the product is required."],
    },
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    description: {
        type: String,
        required: [true, "Decription of the product is required"],
    },
    price: {
        type: Number,
        required: [true, "You must enter the price of the product."]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
});

//* Baza na shemata sto ja definirame
const Oglas = mongoose.model("Oglas", oglasSchema);
module.exports = Oglas;