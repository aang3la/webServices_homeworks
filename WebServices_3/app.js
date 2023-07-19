//? DA SE KE KREIRA WEB SERVIS ILI REST API
//? DA SE KREIRA OGLAS KAKO REKLAMA5
//? I DA SE KREIRA AFTENTIKACIJA (korisnici - logiranje)
//? DA IMAME KOLEKCIJA SO AVTOMOBILI, VELOSIPEDI, NEDVIZNINI, TELEFONI
//? SITE KORISNICI BEZ RAZLIKA NA LOGIRANJE DA IMAAT PRISTAP DO SITE KOLEKCII
//? SAMO LOGIRANI KORISNI DA MOZE DA KREIRAAT BRISHAT I UPDEJTIRAAT DOKUMENTI VO KOLKEKCIITE

//* Povikuvanje na paketite
const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt"); //zastita na urls za lugjeto sto ne se najaveni

//* Povikuvanje na handler
const oglasiHandler = require("./handlers/oglasiHandler");
const authHandler = require("./handlers/authHandler");

//* Ja inicijalizirame app
const app = express();

//* Povikuvanje middlewares
app.set("view engine", "ejs"); //app da koristi ejs
app.use(express.json()); //persiranje na podatoci
app.use(express.urlencoded({extended: true})); //od front gi isprakjame podatocite, se persiraat i prakjaat do serverot

//* Izvrsuvanje na f-ja so koja se konektirame so database
db.init();

app.use(jwt.expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    })
    .unless({
        path: ["/api/v1/signup", "/api/v1.login", "/api/oglasi"]
    })
);

app.post("/api/v1/signup", authHandler.signUp);
app.post("/api/v1/login", authHandler.logIn);

app.get("/api/oglasi", oglasiHandler.siteOglasi);
app.post("/api/oglasi", oglasiHandler.kreirajOglas);
app.get("/api/oglasi/:id", oglasiHandler.edenOglas);
app.patch("/api/oglasi/:id", oglasiHandler.promeniOglas);
app.delete("/api/oglasi/:id", oglasiHandler.izbrisiOglas);

//* Slusame app
app.listen(process.env.PORT, (err) => {
    if(err){
        return console.log("Couldn't start the service.");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
})