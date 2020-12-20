const Blog = require('../models/blog')
const Category = require('../models/category')
const User = require('../models/user')
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

//@desc     List all Blogs
//@route    GET /api/blogs
//@access   Public
exports.list = (req, res) => {
    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })
}

//@desc     List Blogs with Categories and Tags
//@route    POST /api/blogs-categories-tags
//@access   Public
exports.listAllBlogsCategoriesTags = (req, res) => {
    const limit = req.body.limit ? parseInt(req.body.limit) : 10
    const skip = req.body.skip ? parseInt(req.body.skip) : 0
    
    let blogs
    let categories
    let tags

    console.log(skip, limit)
    //get all blogs
    Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        blogs = data

        //get all categories
        Category.find({}).exec((err, categoriesData) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            categories = categoriesData

            //get all tags
            Tag.find({}).exec((err, tagsData) => {
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                tags = tagsData
            
                //return all blogs categories and tags
                res.json({blogs, categories, tags, size: blogs.length})
            })
        })
        
    })

}


//@desc     Get a Single Blog
//@route    DELETE /api/blog/:slug
//@access   Public
exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug})
        
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })
}


//@desc     Delete a Blog
//@route    DELETE /api/blog/:slug
//@access   Admin
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Blog deleted successfully'
        })
    })
}

//@desc     Update a Blog
//@route    PUT /api/blog/:slug
//@access   Admin
exports.update = (req, res) => {

    const slug = req.params.slug.toLowerCase()

    Blog.findOne({slug}).exec((err, oldBlog) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err.message)
            })
        }

        let form = new formidable.IncomingForm()
        form.keepExtensions = true

        form.parse(req, (err, fields, files) => {
            if(err){
                return res.status(400).json({
                    error:'error image'
                })
            }
    
            const slugBeforeMerge = oldBlog.slug
            oldBlog = _.merge(oldBlog, fields)
            oldBlog.slug = slugBeforeMerge

            const {body, desc, categories, tags} = fields
            
            if(body){
                oldBlog.excerpt = smartTrim(body, 320, '', '...')
                oldBlog.mdesc = stripHtml(body.substring(0, 160)).result
            }
            
            if(categories) {
                oldBlog.categories = categories.split(',')
            }

            if(tags) {
                oldBlog.tags = tags.split(',')
            }

    
            if(files.photo) {
                if(files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 1MB'
                    })
                }
                oldBlog.photo.data = fs.readFileSync(files.photo.path)
                oldBlog.photo.contentType = files.photo.type
            }
    
            oldBlog.save((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: err.message
                    })
                }
                
                res.json(result)


            })
        })
    })


    
}


//@desc     Get Blog photo
//@route    GET /api/blog/photo/:slug
//@access   Public
exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug})
        .select('photo')
        .exec((err, blog) => {
            if(err || !blog) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.set('Content-Type', blog.photo.contentType)
            return res.send(blog.photo.data)
        })
}


//@desc     Get Related Blogs
//@route    GET /api/blogs/related
//@access   Public
exports.listRelated = (req, res) => {
    const limit = req.body.limit ? parseInt(req.body.limit) : 3
    const {_id, categories} = req.body.blog

    Blog.find({_id: {$ne: _id}, categories: {$in: categories}})
        .limit(limit)
        .populate('postedBy', '_id name username profile')
        .select('title slug excerpt postedBy createdAt updatedAt')
        .exec((err, blogs) => {
            if(err) {
                return res.status(400).json({
                    error: 'blogs not found'
                })
            }
            res.json(blogs)
        })


}

//@desc     Search blogs
//@route    GET /api/blogs/search
//@access   Public
exports.listSearch = (req, res) => {
    const { search } = req.query

    if(search) {
        Blog.find({
            $or: [{title: {$regex: search, $options: 'i'}}, 
            {body: {$regex: search, $options: 'i'}}]
        }, (err, blogs) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(blogs)
        }).select('-photo -body')

    }
} 

exports.listByUser = (req, res) => {
    User.findOne({username: req.params.username}).exec((err, user) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        const userId = user._id
        Blog.find({postedBy: userId})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug postedBy createdAt updatedAt')
            .exec((err, data) => {
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json(data)
            })
        })
}

