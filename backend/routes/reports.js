const express = require('express')
const router = express.Router()
const reportCtrl = require('../controllers/reportController')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))
var jwt = require('jsonwebtoken')

var passport = require('passport');
require('../config/passport')(passport)

router.get('/',(req,res)=>{
    res.send("hello reports")
})

router.post('/add-report',passport.authenticate('jwt', {session:false}),reportCtrl.reportAdd)
router.get('/get-report',passport.authenticate('jwt', {session:false}),reportCtrl.reportShow)
router.put('/block',passport.authenticate('jwt', {session:false}),reportCtrl.block)
router.put('/delete',passport.authenticate('jwt', {session:false}),reportCtrl.deleteReport)
router.post('/ignore',passport.authenticate('jwt', {session:false}),reportCtrl.ignore)
router.get('/check',passport.authenticate('jwt', {session:false}),reportCtrl.check)

module.exports = router