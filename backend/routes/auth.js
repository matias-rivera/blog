const express = require('express')
const { signup, signin, signout, requireSignin, forgotPassword, resetPassword, preSignup } = require('../controllers/auth')
const router = express.Router()

//validators
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator, resetPasswordValidator, forgotPasswordValidator} = require('../validators/auth')

//routes
router.post('/pre-signup', userSignupValidator, runValidation,preSignup)
router.post('/signup', signup)
router.post('/signin', userSigninValidator, runValidation,signin)
router.get('/signout', signout)

router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)


module.exports = router