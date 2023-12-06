var JWTStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var Users = require('../models/users');

module.exports = function(passport){
    let params = {
        secretOrKey:'dlsfibgvleirbg3h92ob8r7tycn93q486b5yv9346y5p8346yp598v36yp986q9v8346958634p98at9cfnty9c38pt',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    // console.log('===========',process.env.SECRETKEY)
    passport.use( 
        new JWTStrategy(params, function(jwt_payload,next){
            let username = jwt_payload.username
            // console.log(jwt_payload)
            Users.findOne({username:username},function(err,user){
                if(err)
                {
                    return next(err,false)
                }
                if(user){
                    next(null,user)
                }else
                {
                    next(null,false)
                }
            });
        }) 
    )
}