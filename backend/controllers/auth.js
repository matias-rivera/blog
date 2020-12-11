const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')




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