const Oglas = require("../pkg/oglasi/oglasSchema");

exports.getLoginForm = async (req, res) => {
    try{
        res.status(200).render("login", {
            title: "Login"
        }) //se renderira ejs file
    }
    catch(err) {
        res.status(500).send("Error!");
    }
};

//* Prikazuvanje na site oglasi vo ejs
exports.pregledOglasi = async (req, res) => {
    try{
        const oglasi = await Oglas.find();

        res.status(200).render("viewOglasi", {
            status: "Success",
            naslov: "Site oglasi na edno mesto",
            text: "Najgolemata platforma za trguvanje vo Makedonija",
            oglasi,
        });
    }
    catch(err) {
        res.status(500).send("Error with this page!");
    }
};

//* Kreiranje na nov oglas
exports.kreiranjeOglas = async (req, res) => {
    try{
        console.log(req.auth);
        await Oglas.create(req.body);
        res.redirect("/siteoglasi");
    }
    catch(err) {
        res.status(500).send(err);
    }
}