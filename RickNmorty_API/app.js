const express = require("express");
const rickandmortyapi = require("./handlers/rickandmortyapi");

const app = express();

app.get("/api/v1/rickandmortyapi/character/:id", rickandmortyapi.getCharacter);
app.get("/api/v1/rickandmortyapi/episode/:episodeId", rickandmortyapi.getEpisode);
app.get("/api/v1/rickandmortyapi/location/:locationId", rickandmortyapi.getLocation);

app.listen(10000, (err) => {
    if(err){
        return console.log("Couldn't start the server.")
    }
    console.log("Server started successfully on port 10000.")
});
