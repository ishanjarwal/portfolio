const { count } = require('console');
const express = require('express')
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors')
require('dotenv').config();
const path = require('path')


app.use(express.static(path.resolve(__dirname, "build")))
app.use(express.json())
app.use(cors())


app.post('/mail', async (req, res) => {
    const { email, name, country, message, category } = req.body
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailDetails = {
        from: email,
        to: 'ishan.professional01@gmail.com',
        subject: 'Client Message',
        text: `
        name: ${name},
        email: ${email},
        country: ${country},
        Website Type: ${category},
        message: ${message}
        `
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
            res.json({ msg: 'email not sent', err: err })
        } else {
            console.log('Email sent successfully');
            res.json({ sent: true })
        }
    });
})


app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Server Started")
    }
})