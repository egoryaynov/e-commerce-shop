const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // todo set up own mail server ↓ example (try hmailserver maybe)
    // const transporter = nodemailer.createTransport({
    //     pool: true,
    //     host: "smtp.example.com",
    //     port: 465,
    //     secure: true, // use TLS
    //     auth: {
    //         user: "username",
    //         pass: "password"
    //     }
    // })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

module.exports = sendEmail