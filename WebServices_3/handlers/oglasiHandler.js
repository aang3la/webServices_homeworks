//! Handler za prikazuvanje, kreiranje, promenuvanje i brishenje na oglasi

//* Povikuvanje na oglas shemata za da komunicirame so database
const Oglas = require("../pkg/oglasi/oglasSchema");

//* Prikazuvanje na site oglasi
exports.siteOglasi = async(req, res) => {
    try{
        //filtriranje na podatoci preku query
        const queryObj = {...req.query} //kreiranje kopija
        let queryString = JSON.stringify(queryObj) //konvertiranje vo string
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`) //da se zameni $
        const query = JSON.parse(queryString); //go vrakjame vo objekt

        const oglasi = await Oglas.find(query);

        res.status(200).json({
            status: "success",
            data: {
                oglasi
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

//* Kreiranje nov dokument vo kolekcijata
exports.kreirajOglas = async (req, res) => {
    try{
        const newOglas = await Oglas.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                newOglas,
            },
        });

    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

//* Prikazuvanje na eden dokument od kolekcijata
exports.edenOglas = async (req, res) => {
    try{
        const oglas = await Oglas.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                oglas,
            },
        });
    }
    catch(err){
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

//* Pravenje promeni na postoecki dokument
exports.promeniOglas = async (req, res) => {
    try{
        const promenetOglas = await Oglas.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                promenetOglas,
            },
        });
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

//* Brishenje na postoecki dokument
exports.izbrisiOglas = async (req, res) => {
    try{
        await Oglas.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
        })

    }
    catch(err){
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

//* Kreiranje na nov oglas so ime na user
exports.kreirajMojOglas = async (req, res, next) => {
    try{
        const postirajOglas = await Movie.create({
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            author: req.auth.id
        });
        res.status(201).json(postirajOglas);
    }
    catch(err) {
        res.status(500).json({ error: err });
    }
};

//* Prikazuvanje na site oglasi so ime na user
exports.siteMoiOglasi = async (req, res) => {
    try{
        const userId = req.auth.id;
        const moiOglasi = await Movie.find({author: userId}).populate("author");

        res.status(201).json(moiOglasi);
    }
    catch(err) {
        res.status(500).json({ error: err});
    }
};