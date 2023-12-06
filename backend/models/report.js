const mongoose = require('mongoose')
const conn = require('../config/db')
const {ObjectId} = mongoose.Schema.Types


var reportSchema = new mongoose.Schema({
    concern : String,
    reportedBy : [{
        type : ObjectId,
        ref : 'users'
    }],
    reportedPost : [{
        type : ObjectId,
        ref : 'posts'
    }],
    reportedSub : {
        type : ObjectId,
        ref : 'createSub'
    },
    isIgnored : {
        type : Boolean,
        default : false
    },
    isBlocked : {
        type : Boolean,
        default : false
    }
},{
    timestamps:true
})

const reports = conn.model('reports',reportSchema)
module.exports = reports