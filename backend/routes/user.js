const express=require('express')
const router = express.Router()
const userConroller = require('../controllers/user')

router.post('/signup',userConroller.createUser)

router.post('/login',userConroller.loginUser)
module.exports = router