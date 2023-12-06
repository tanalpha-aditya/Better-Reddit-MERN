const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/postController')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))
var jwt = require('jsonwebtoken')

var passport = require('passport');
require('../config/passport')(passport)

router.get('/',(req,res)=>{
    res.send("hello posts")
}) 

router.post('/add-post',passport.authenticate('jwt', {session:false}),postCtrl.postAdd)
router.get('/get-post',passport.authenticate('jwt', {session:false}),postCtrl.postShow)
router.get('/get-postB',passport.authenticate('jwt', {session:false}),postCtrl.postShowBlocked)
router.put('/follow',passport.authenticate('jwt', {session:false}),postCtrl.follow)
router.put('/unfollow',passport.authenticate('jwt', {session:false}),postCtrl.unfollow)
router.put('/unfollowing',passport.authenticate('jwt', {session:false}),postCtrl.unfollowing)
router.post('/saved',passport.authenticate('jwt', {session:false}),postCtrl.postSave)
router.get('/get-savedPost',passport.authenticate('jwt', {session:false}),postCtrl.postShowSavedPost)
router.post('/savedDelete',passport.authenticate('jwt', {session:false}),postCtrl.postSaveDelete)
router.put('/upvote',passport.authenticate('jwt', {session:false}),postCtrl.postUpvote)
router.put('/downvote',passport.authenticate('jwt', {session:false}),postCtrl.postDownvote)
router.get('/get-follow',passport.authenticate('jwt', {session:false}),postCtrl.showfollow)
router.get('/get-following',passport.authenticate('jwt', {session:false}),postCtrl.showfollowing)
router.put('/add-comment',passport.authenticate('jwt', {session:false}),postCtrl.postComment)


module.exports = router