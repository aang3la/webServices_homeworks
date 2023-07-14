const mongoose = require("mongoose");

//? ZA DOMASNA DA SE ZAVRSHI WEB SERVSIOT
//? SHEMATA DA SE SOSTOI OD: NASLOV, Godina, imdbRating, metascore
//? Da se krera CRUD - CREATE- READ - UPDATE - DELETE
//? baza na rutata da e /api/movies
//? Da se stavat 10 filma preku postman so koristenje na raw jason format

//* Kreirame blueprint za nasata databaza
const movieShema = new mongoose.Schema({
    title: {
        type: String,
        required: [true],
    },
    year: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 3,
    },
    metascore: {
        type: Number,
    }
});

//* Baza na shemata sto ja definirame
const Movie = mongoose.model("Movie", movieShema);

module.exports = Movie;