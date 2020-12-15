const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/tag')
const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const { errorHandler } = require('../helpers/dbErrorHandler')
const fs = require('fs')
const { smartTrim } = require('../helpers/blog')

//@desc     Create a blog
//@route    POST /api/blog
//@access   Admin
exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: errorHandler('error parse')
            })
        }

        const {title, body, categories, tags} = fields

        if(!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            })
        }

        if(!body || body.length < 200)  {
            return res.status(400).json({
                error: 'Content is short'
            })
        }

        if(!categories || !categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            })
        }

        if(!tags || !tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            })
        }




        //blog
        const blog = new Blog()
        blog.title = title
        blog.body = body
        blog.excerpt = smartTrim(body, 320, ' ', '...')
        blog.slug = slugify(title).toLowerCase()
        blog.mtitle = `${title} | ${process.env.APP_NAME}`
        blog.mdesc = stripHtml(body.substring(0, 160)).result
        blog.postedBy = req.user._id

        //categirues
        const categoriesArray = categories && categories.split(',')
        const tagsArray = tags && tags.split(',')



        if(files.photo) {
            if(files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1MB'
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path)
            blog.photo.contentType = files.photo.type
        }

        console.log(blog)
        blog.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
            console.log('Here')
            //res.josn(result)
            Blog.findByIdAndUpdate(result._id, {
                $push: {categories: categoriesArray}
            }, {new: true}).exec((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err.message)
                    })
                } else{
                    Blog.findByIdAndUpdate(result._id, {$push: 
                    {tags: tagsArray}}, {new: true}).exec((err, result) => {
                        if(err){
                            return res.status(400).json({
                                error: errorHandler(err.message)
                         })
                        } else{
                            res.json(result)
                        }
                    })
                }
            })
        })
    })
}


exports.list = (req, res) => {
    
}

exports.listAllBlogsCategoriesTags = (req, res) => {

}

exports.read = (req, res) => {

}

exports.remove = (req, res) => {

}

exports.update = (req, res) => {

}
