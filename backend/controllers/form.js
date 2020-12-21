const nodemailer = require('nodemailer')

const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
}

exports.contactForm = (req, res) => {
    const {email, name, message} = req.body;

    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>www.matiasrivera.com</p>
        `
    }

    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(transport);

    // send mail with defined transport object
        transporter.sendMail(emailData).then(sent => {
            res.json({
                success: true
            })
        }).catch(err => {
            res.status(400).json({error: err.message})
        });

}

exports.contactBlogAuthorForm = (req, res) => {
    const {authorEmail, email, name, message} = req.body;

    const emailData = {
        to: authorEmail,
        from: email,
        subject: `Someone messaged you from - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Message received from:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>www.matiasrivera.com</p>
        `
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(transport);

// send mail with defined transport object
    transporter.sendMail(emailData).then(sent => {
        res.json({
            success: true
        })
    }).catch(err => {
        res.status(400).json({error: err.message})
    });
}