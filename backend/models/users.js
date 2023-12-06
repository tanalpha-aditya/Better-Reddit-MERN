const mongoose = require('mongoose')
const conn = require('../config/db')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')  
const { use } = require('../routes/users')

var userSchema = new mongoose.Schema({
        fname : String,
        lname : String,
        email : String,
        age : String,
        number : String,
        username : String,
        password : String,
        follower : [{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        following : [{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
    tokens : [
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
},{
    timestamps:true
})

//now we want to decrypt the password before sending it
userSchema.pre('save',function(next){
    var salt = bcrypt.genSaltSync(10)
    if(this.password && this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

userSchema.methods.getAuthToken = async function(data){
    let params = {
        id : this._id,
        username : this.username,
        number : this.number
    }
    var tokenValue = jwt.sign(params,'dlsfibgvleirbg3h92ob8r7tycn93q486b5yv9346y5p8346yp598v36yp986q9v8346958634p98at9cfnty9c38pt',{expiresIn:'3000000s'})
    this.tokens = this.tokens.concat({token:tokenValue})
    await this.save()
    return tokenValue
}

let users = conn.model('users',userSchema)

module.exports = users