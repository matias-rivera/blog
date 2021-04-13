const express = require('express')
const router = express.Router()
const { info, lastBlogs, create, list, listByUser, listAllBlogsCategoriesTags, read, remove, update, listSearch, photo, listRelated } = require('../controllers/blog')
const { canUpdateDeleteBlog, requireSignin, adminMiddleware, authMiddleware } = require('../controllers/auth')

router.post('/blog', requireSignin, adminMiddleware, create)
router.get('/blogs', list)
router.post('/blogs-categories-tags',  listAllBlogsCategoriesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove)
router.put('/blog/:slug', requireSignin, adminMiddleware, update)
router.get('/blog/photo/:slug', photo)
router.post('/blogs/related', listRelated)
router.get('/blogs/search', listSearch)
router.get('/blogs/last', lastBlogs)
router.get('/blogs/info', requireSignin, adminMiddleware, info)


//auth user
router.post('/user/blog', requireSignin, authMiddleware, create)
router.get('/:username/blogs', listByUser)
router.delete('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, remove)
router.put('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, update)

module.exports = router