const express=require('express')
const postController = require('../controllers/posts')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

router.post('',checkAuth,extractFile,postController.createPost )
router.delete('/:id',checkAuth,postController.deletePost)  
router.put('/:id',checkAuth,extractFile,postController.updatePost)
router.get('/:id',postController.getPosts)

module.exports = router