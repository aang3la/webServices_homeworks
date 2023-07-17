


exports.functionA = async (req, res) => {
    try{
        res.status(200).json({
            status: "success",
            data: "Angela Antova"
        });
    }
    catch(err){
        return console.log(err);
    }
}