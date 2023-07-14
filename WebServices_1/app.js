//* Gi povikuvame paketite sto ni se potrebni
const express = require("express");
const db = require("./pkg/db/index");

//* Go povikuvame handlerot
const moviesHandler = require("./handlers/moviesHandler");

//* Ja inicijalizirame app
const app = express();

//* Povikuvame middlewares
app.set("view engine", "ejs");
app.use(express.json()); //persiranje na podatocite
app.use(express.urlencoded({extended: true}));

//* izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

app.get("/api/movies", moviesHandler.getAllMovies);
app.post("/api/movies", moviesHandler.createMovie);
app.get("/api/movies/:id", moviesHandler.getMovie);
app.patch("/api/movies/:id", moviesHandler.updateMovie);
app.delete("/api/movies/:id", moviesHandler.deleteMovie)

//* Slusame app
app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log("Couldn't start the service.");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
})