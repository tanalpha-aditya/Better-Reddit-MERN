const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))
var jwt = require('jsonwebtoken')

var passport = require('passport');
require('../config/passport')(passport)

// ab mujhe iske through nahi karna authorize, mujhe passport ke through karna hai

router.get('/',(req,res)=>{
    res.send("hello world")
})

router.get('/list',passport.authenticate('jwt', {session:false}),userCtrl.userList)
router.post('/add',userCtrl.userAdd)
router.post('/login',userCtrl.userLogin)
router.post('/user-update',passport.authenticate('jwt', {session:false}),userCtrl.userUpdate)


module.exports = router