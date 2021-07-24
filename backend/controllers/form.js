const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
    const { email, name, message } = req.body;

    const emailData = {
        to: process.env.EMAIL_FROM,
        from: process.env.EMAIL_FROM, // Use the email address or domain you verified above
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
        `,
    };

    sgMail.send(emailData).then(
        () => {
            res.json({
                success: true,
            });
        },
        (error) => {
            console.error(error);

            res.status(400).json({ error });
        }
    );
};

exports.contactBlogAuthorForm = (req, res) => {
    const { authorEmail, email, name, message } = req.body;

    const emailData = {
        to: authorEmail,
        from: process.env.EMAIL_FROM,
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
        `,
    };

    sgMail.send(emailData).then(
        () => {
            res.json({
                success: true,
            });
        },
        (error) => {
            console.error(error);

            res.status(400).json({ error });
        }
    );
};
