const express = require('express')
const router = express.Router()
const { requireSignin, authMiddleware } = require('../controllers/auth')
const { read, publicProfile, update, photo } = require('../controllers/user')


//routes
router.get('/user/profile', requireSignin,authMiddleware, read)
router.get('/user/:username', publicProfile)
router.put('/user/update', requireSignin,authMiddleware, update)
router.get('/user/photo/:username', photo)


module.exports = router