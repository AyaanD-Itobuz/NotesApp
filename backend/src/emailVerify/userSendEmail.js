import nodemailer from 'nodemailer';
import { config } from "dotenv";
import hbs from "nodemailer-express-handlebars"
import path from "path"

config(); 


const sendEmail = async(msg, to) => 
{
    const mailTransporter = nodemailer.createTransport ({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL_ID,
            // user : "ayaan@itobuz.com",
            pass : process.env.EMAIL_PASS,
            // pass : "rbdu rhox cyxd fgrm"
        }
    });


    mailTransporter.use(
        "compile",
        hbs({
            viewEngine : {
                partialsDir : path.resolve("src/views/partials"),
                defaultLayout: false,
            },
            viewPath: path.resolve("src/views/layouts"),
        })
    );

    let mailDetails = {
        from: process.env.EMAIL_ID,
        // to: process.env.EMAIL_ID,
        to: to,
        subject: 'Verification Mail',
        html:`<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://localhost:5173/EmailVerify/${msg}">Click here to verify</a>`
    };
    
    mailTransporter.sendMail(mailDetails,
            function (err) {
                if (err) {
                    console.log('Error Occurs: ' + err);
                    
                } else {
                    console.log('Email sent successfully');
                }
            });
}

export default sendEmail;