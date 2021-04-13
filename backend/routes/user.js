const express = require('express')
const router = express.Router()
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth')
const { read, publicProfile, update, photo, latestUsers } = require('../controllers/user')


//routes

router.get('/user/latest', requireSignin, adminMiddleware, latestUsers)
router.get('/user/profile', requireSignin,authMiddleware, read)
router.put('/user/update', requireSignin,authMiddleware, update)
router.get('/user/:username', publicProfile)
router.get('/user/photo/:username', photo)

module.exports = router