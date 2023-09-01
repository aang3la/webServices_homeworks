const nodemailer = require ("nodemailer");

exports.sendEmail = async (options) => {
    try{
        //* 1) Creating the transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        transporter.verify((err, succ) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Success!");
            }
        });

        //* 2) Defining the options of the mail
        const mailOptions = {
            from: "Oglasi <oglasi@gmail.com>",
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        //* 3) Sending the email
        await transporter.sendEmail(mailOptions);
    } catch(err){
        console.log(err);
    }
}