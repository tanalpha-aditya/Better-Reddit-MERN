const mongoose = require('mongoose')
const conn = require('../config/db')
const {ObjectId} = mongoose.Schema.Types


var postSchema = new mongoose.Schema({
    text : String,
    fname: String,
    lname: String,
    postedBy : {
        type : ObjectId,
        ref : 'users'
    },
    postedIn : {
        type : ObjectId,
        ref : 'createSub'
    },
    saved : {
        type : Boolean,
        default : false
    },
    savedBy : {
        type : ObjectId,
        ref : 'users'
    },
    upvotes : [{
        type : ObjectId,
        ref : 'users'
    }],
    downvotes : [{
        type : ObjectId,
        ref : 'users'
    }],
    Comment : [{
        text : {
        type : String},
        postedBy:{
            type:String, 
        }
    }]
},{
    timestamps:true
})

postSchema.pre('save', async function (next) {
    const bannedWords = await this.model('createSub').findById(this.postedIn).select('bannedWords -_id').lean()
  
    const regex = new RegExp(bannedWords.bannedWords.join('|'), 'gi')
  
    if (this.text.match(regex)) {
      const error = new Error('Post contains banned words')
      return next(error)
    }
  
    next()
  })

const posts = conn.model('posts',postSchema)
module.exports = posts