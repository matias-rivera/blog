const Tag = require('../models/tag')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')
const Blog = require('../models/blog')

//@desc     Create a tag
//@route    POST /api/tag
//@access   Admin
exports.create = (req, res) => {
    const { name } = req.body
    const slug = slugify(name).toLowerCase()
    const tag = new Tag({name, slug})

    tag.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//@desc     Get a list of tags
//@route    GET /api/tags
//@access   Public
exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//@desc     Get a Tags
//@route    GET /api/tag/:slug
//@access   Public
exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Tag.findOne({ slug }).exec((err, tag) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        Blog.find({tags: tag})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name')
            .select('_id title slug excerpt categories postedBy tags createdAt updatedAt')
            .exec((err, data) => {
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json({tag: tag, blogs: data})
            })
    })
}

//@desc     Delete a Tag
//@route    DELETE /api/tag/:id
//@access   Public
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Tag.findOneAndRemove({ slug }).exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Tag deleted successfully'
        })
    })
}