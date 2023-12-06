const express = require('express')
const router = express.Router()
const subCtrl = require('../controllers/subController')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))
var jwt = require('jsonwebtoken')

var passport = require('passport');
require('../config/passport')(passport)

router.get('/',(req,res)=>{
    res.send("hello post")
}) 

router.post('/add-sub',passport.authenticate('jwt', {session:false}),subCtrl.subAdd)
router.get('/get-sub',passport.authenticate('jwt', {session:false}),subCtrl.subShowMine)
router.get('/get-suball',passport.authenticate('jwt', {session:false}),subCtrl.subShowAll)
router.get('/get-subexcp',passport.authenticate('jwt', {session:false}),subCtrl.subShowExcept)
router.get('/get-subOne',passport.authenticate('jwt', {session:false}),subCtrl.subOne)
router.put('/join-req',passport.authenticate('jwt', {session:false}),subCtrl.subReq)
router.get('/get-req',passport.authenticate('jwt', {session:false}),subCtrl.subGetReq)
router.put('/join',passport.authenticate('jwt', {session:false}),subCtrl.subJoin)
router.put('/reject',passport.authenticate('jwt', {session:false}),subCtrl.subReject)
router.get('/get-user',passport.authenticate('jwt', {session:false}),subCtrl.subGetUser)
router.put('/delete-sub',passport.authenticate('jwt', {session:false}),subCtrl.subDelete)
router.put('/leave-sub',passport.authenticate('jwt', {session:false}),subCtrl.subLeave)
// router.get('/get-userBlocked',passport.authenticate('jwt', {session:false}),subCtrl.subGetUserBlocked)

module.exports = router