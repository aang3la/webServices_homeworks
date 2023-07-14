//* Povikuvanje na movie shemata za komunikacija so databazata
const Movie = require("../pkg/movies/moviesShema");

//! Kreiranje na CRUD - CREATE- READ - UPDATE - DELETE

//* Prikazuvanje na site dokumenti od kolekcijata
exports.getAllMovies = async(req, res) => {
    try{
        //za da mozeme da filtrirame podatoci preku query
        const queryObj = {...req.query} //kreiranje kopija
        let queryString = JSON.stringify(queryObj); //konveritranje vo string
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        const query = JSON.parse(queryString); //go vrakjame vo objekt

        const movies = await Movie.find(query);

        res.status(200).json({
            status: "success",
            data: {
                movies,
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

//* Prikazuvanje na eden odreden dokument od kolekcijata
exports.getMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
              movie,
            },
          });
    }
    catch(err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

//* Kreiranje na nov dokument vo kolekcijata
exports.createMovie = async(req, res) => {
    try{
        const newMovie = await Movie.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                newMovie,
            },
        });
        
    }
    catch(err){
        res.status(400).json ({
            status: "fail",
            message: err,
        });
    }
};

//* Pravenje promeni na postoecki dokument
exports.updateMovie = async(req, res) => {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true,
        });

        res.status(200).json({
            status: "success",
            data: {
                updatedMovie,
            }
        });
    }
    catch(err){
        res.status(404).json ({
            status: "fail",
            message: err,
        });
    }
};

//* Brishenje na postoecki dokument
exports.deleteMovie = async(req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
        });
    }
    catch(err){
        res.status(404).json ({
            status: "fail",
            message: err,
        });
    }
};
