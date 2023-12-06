const mongoose = require('mongoose')
const conn = require('../config/db')
const {ObjectId} = mongoose.Schema.Types


var createsubSchema = new mongoose.Schema({
    caption : String,
    desc : String,
    image : String,
    tags : [{
        type : String
    }],
    bannedWords : [{
        type : String
    }],
    owner : {
        type : ObjectId,
        ref : 'users'
    },
    req : [{
        type : ObjectId,
        ref : 'users'
    }],
    joined : [{
        type : ObjectId,
        ref : 'users'
    }],
    left : [{
        type : ObjectId,
        ref : 'users'
    }],
    blocked : [{
        type : ObjectId,
        ref : 'users'
    }],
},{
    timestamps:true
})

const createSub = conn.model('createSub',createsubSchema)
module.exports = createSub