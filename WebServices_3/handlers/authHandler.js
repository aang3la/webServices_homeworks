//! Handler za avtentikacija

//* Povrzuvanje so user shemata
const User = require("../pkg/users/userSchema");

const jwt = require("jsonwebtoken"); //za avtentikacija na user
const bcrypt = require("bcryptjs"); //za sporeduvanje na passwords
const sendEmail = require("./emailHandler");

exports.signUp = async (req, res) => {
    try{
        //kreirame nov korisnik
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password,
        });

        //generiranje token za korisnikot
        const token = jwt.sign(
            {id: newUser._id, name: newUser.name}, //payload, zacuvuvanje na info
            process.env.JWT_SECRET, //tajna recenica
            {expiresIn: process.env.JWT_EXPIRES} //rok na istekuvanje na logiran korisnik
        );

        // res.kkoies ima tri parametri prviot so kako se vika kukisot vtoriot vrednosta na kukisot i tretiot parametar dodatni opcii
        res.cookie("jwt", token, {
            expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            secure: false,
            httpOnly: true,
        });

        //sending email
        await sendEmail({
            email: newUser.email,
            subject: "Thank you for subscribing",
            message: `We thank you for your trust and support for choosing us ${newUser.name}.`
        });

        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser,
            },
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.logIn = async (req, res) => {
    try{
        const {email, password} = req.body;

        //* Proveruvame dali ima vneseno email ili pass
        if(!email || !password) {
            return res.setatus(400).send("Please provide an email and password!");
        };

        //* Proveruvame dali korisnikot postoi
        const user = await User.findOne({email});
        if(!user) { return res.status(400).send("This user with this email doesn't exist!")}

        //* Sporeduvame passwords
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if(!isPasswordValid){ return res.status(400).send("Invalid email or password.")}

        //* Ako se e tocno, se generira tokenot
        const token = jwt.sign(
            {id: user._id, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES});

         // 5. go isprakjame cookisot so tokenot
        res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
        });

        //* Na kraj go isprakjame tokenot
        res.status(201).json({
            status: "success",
            token,
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};