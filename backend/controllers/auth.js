const User = require('../models/user')
const Blog = require('../models/blog')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler')
const nodemailer = require('nodemailer')
const _ = require('lodash')

const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
}



exports.signup = (req, res) => {
    const {name, email, password} = req.body

    //check if user exist
    User.findOne({email: email}).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        //create username and profile
        const username = shortId.generate()
        const profile = `${process.env.CLIENT_URL}/profile/${username}`

        //create user
        const newUser = new User({name, email, password, profile, username})
        //save user
        newUser.save((err, user) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({message: 'Signup successfully!'})
        })
    })

}

exports.signin = (req, res) => {
    const { email, password } = req.body

    //check if user exist
    User.findOne({email}).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User doesnt exist'
            })
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password dont match'
            })
        }
        //generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})

        res.cookie('token',token,{expiresIn:'1d'})

        const {_id, username, name, email, role} = user
        return res.json({
            token,
            user: {_id, username, name, email, role}
        })
    })
}

//signout
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Signout success!"
    })
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ['HS256']
})


exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id
    User.findById({_id: authUserId}).exec((err, user) => {
        if(err || !user){
            return res.status(404).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    })
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id
    User.findById({_id: adminUserId}).exec((err, user) => {
        if(err || !user){
            return res.status(404).json({
                error: 'User not found'
            })
        }

        if(user.role !== 1){
            return res.status(404).json({
                error: 'Admin resource. Access denied.'
            })
        }
        req.profile = user
        next()
    })
}

exports.canUpdateDeleteBlog = (req, res, next) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug}).exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        const authorizedUser = data.postedBy._id.toString() === req.profile._id.toString()
        if(!authorizedUser){
            return res.status(400).json({
                error: 'You are not authorized'
            })
        }

        next()
    })
}

exports.forgotPassword = (req, res) => {
    const {email} = req.body
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(401).json({
                error: 'Email is not registered.'
            })
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'})

        //email
        console.log(email)
        const emailData = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: `Password reset link`,
            html: `
                <h4>Please use the following link to restore your password:</h4>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>www.matiasrivera.com</p>
            `
        }
        user.updateOne({resetPasswordLink: token},(err, success) => {
            if(err){
                return res.status(400).json({error: errorHandler(err)})
            } else {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport(transport);

                // send mail with defined transport object
                transporter.sendMail(emailData).then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
                    })
                }).catch(err => {
                    res.status(400).json({error: err.message})
                });
            }
        })
    })
}

exports.resetPassword = (req, res) => {
    const {resetPasswordLink, newPassword} = req.body
    if(resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded){
            if(err){
                return res.status(401).json({
                    error: 'Expired Link. Try again.'
                })
            }
            User.findOne({resetPasswordLink}, (err, user) => {
                if(err || !user){
                    return res.status(401).json({
                        error: 'Something went wrong. Try later.'
                    })
                }
                const updateFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                }

                user = _.extend(user, updateFields)

                user.save((err, result) => {
                    if(err){
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }

                    res.json({
                        message: 'Great! Now you can login with your new password.'
                    })
                })
            })

        })
    }
}