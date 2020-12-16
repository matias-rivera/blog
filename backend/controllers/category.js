const Category = require('../models/category')
const Blog = require('../models/blog')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')

//@desc     Create a category
//@route    POST /api/category
//@access   Admin
exports.create = (req, res) => {
    const { name } = req.body
    const slug = slugify(name).toLowerCase()
    const category = new Category({name, slug})

    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//@desc     Get a list of categories
//@route    GET /api/categories
//@access   Public
exports.list = (req, res) => {
    Category.find({}).exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(categories)
    })
}

//@desc     Get a Category
//@route    GET /api/category/:slug
//@access   Public
exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Category.findOne({ slug }).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        //res.json(category)
        Blog.find({categories: category})
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
                res.json({category: category, blogs: data})
            })
    })
}

//@desc     Delete a Category
//@route    DELETE /api/category/:slug
//@access   Public
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Category.findOneAndRemove({ slug }).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Category deleted successfully'
        })
    })
}