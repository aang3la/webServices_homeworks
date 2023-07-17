const mongoose = require("mongoose");
const validator = require("validator"); //da proverime dali email e vistinski
const bcrypt = require ("bcryptjs"); //da go enkriptirame pass

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    email: {
        type: String,
        reqired: [true, "E-mail is required."],
        unique: true, //da ne moze so ist mail da se najavat poveke
        lowercase: true, //mora site bukvi da se mali
        validate: [validator.isEmail, "Please provide a valid email."] //metoda sto proveruva dali emailot e vistinski
    },
    role: {
        type: String,
        enum: ["user", "admin", "administaror"], //koi elementi da gi iskoristi vo eden array
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [4, "Password must be at least 8 characters long"],
        // validate: [validator.isStrongPassword, "Please provide a strong password."]
    }
});

//* Middleware - most pomegju delot koga gi dobivame podatocite i delot koga gi stavame vo baza; da ne se pokazuva passwordot
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); //ako vo slucaj nema promena vo pass, odi na sledno
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;