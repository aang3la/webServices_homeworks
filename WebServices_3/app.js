//? DA SE KE KREIRA WEB SERVIS ILI REST API
//? DA SE KREIRA OGLAS KAKO REKLAMA5
//? I DA SE KREIRA AFTENTIKACIJA (korisnici - logiranje)
//? DA IMAME KOLEKCIJA SO AVTOMOBILI, VELOSIPEDI, NEDVIZNINI, TELEFONI
//? SITE KORISNICI BEZ RAZLIKA NA LOGIRANJE DA IMAAT PRISTAP DO SITE KOLEKCII
//? SAMO LOGIRANI KORISNI DA MOZE DA KREIRAAT BRISHAT I UPDEJTIRAAT DOKUMENTI VO KOLKEKCIITE

//? ZA DOMASNA DA SE IMMPLEMENTIRA OGLASI, da moze sekoj korisnik da si kreira sopstveni oglasi
//? isto taka sekoj korisnik da moze da gi vidi samo sopstvenite oglasi
//? bonus: se sto imame uceno implementirajte


//* Povikuvanje na paketite
const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt"); //zastita na urls za lugjeto sto ne se najaveni

//* Povikuvanje na handler
const oglasiHandler = require("./handlers/oglasiHandler");
const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");

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

    getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null; // vo slucaj ako nemame isprateno token
      },
    })
    .unless({
        path: ["/api/v1/signup", "/api/v1.login", "/api/oglasi", "/siteoglasi"]
    })
);

app.post("/api/v1/signup", authHandler.signUp);
app.post("/api/v1/login", authHandler.logIn);

app.get("/api/oglasi", oglasiHandler.siteOglasi);
app.post("/api/oglasi", oglasiHandler.kreirajOglas);
app.get("/api/oglasi/:id", oglasiHandler.edenOglas);
app.patch("/api/oglasi/:id", oglasiHandler.promeniOglas);
app.delete("/api/oglasi/:id", oglasiHandler.izbrisiOglas);

//Licni oglasi
app.get("/moioglasi", oglasiHandler.siteMoiOglasi);
app.post("/moioglasi", oglasiHandler.kreirajMojOglas);

// View ruti
app.get("/login", viewHandler.getLoginForm);
app.get("/siteoglasi", viewHandler.pregledOglasi);
app.post("/kreirajoglas", viewHandler.kreiranjeOglas);

//* Slusame app
app.listen(process.env.PORT, (err) => {
    if(err){
        return console.log("Couldn't start the service.");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
})