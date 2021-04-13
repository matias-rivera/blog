const User = require('../models/user')
const Blog = require('../models/blog')
const { errorHandler } = require('../helpers/dbErrorHandler')
const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs')

//@desc     Return user
//@route    GET /api/user/profile
//@access   User
exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}


//@desc     Return public user info
//@route    GET /api/user/:username
//@access   Public
exports.publicProfile = (req, res) => {
    const username = req.params.username
    let user 

    //find user
    User.findOne({username}).exec((err, userFromDB) => {
        if(err || !userFromDB){
            return res.status(400).json({
                error: 'User not found'
            })
        }

        user = userFromDB
        const userId = user._id
        //find user blogs
        Blog.find({postedBy: userId})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name')
            .limit(10)
            .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
            .exec((err, data) => {
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                user.photo = undefined
                user.hashed_password = undefined
                res.json({
                    user, blogs: data
                })
            })
    })
}

//@desc     Update user info
//@route    PUT /api/user/update
//@access   User
exports.update = (req, res) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            })
        }
        let user = req.profile
        // any changed fields will be merged into user
        user = _.extend(user, fields)

        if(fields.password && fields.password.length < 6) {
            return res.status(400).json({
                error: 'Password should be at least 6 characters long'
            })
        }


        //if user has photo
        if(files.photo){
            if(files.photo.size > 10000000){
                return res.status(400).json({
                    error: 'Image should be less than 1MB'
                })
            }
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
            
        }

        //save changes
        user.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            user.hashed_password = undefined
            user.salt = undefined
            user.photo = undefined
            res.json({message: 'User updated successfully'})

        })
    })
}


//@desc     Return user profile photo
//@route    DELETE /api/user/photo/:username
//@access   Public
exports.photo = (req, res) => {
    //get user from params
    const username = req.params.username
    //find user
    User.findOne({username}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        //if user has photo
        if(user.photo.data) {
            res.set('Content-Type',user.photo.contentType)
            return res.send(user.photo.data)
        } else{
            return res.status(400).json({message: 'cannot find photo'})
        }
    })

}

//@desc     Return latest users
//@route    GET /api/user/latest
//@access   Admin
exports.latestUsers = (req, res) => {
    User.find()
        .sort({'createdAt':"desc"})
        .select('_id name profile createdAt username')
        .limit(10)
        .exec((err, data) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })

}