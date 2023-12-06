const Users = require("../models/users")
var bcrypt = require('bcryptjs')
const { use } = require("passport")


const userList = async (req, res) => {
    // let data = await Users.find()

    let data = req.user
    res.json(data)
    // console.log("i d ==== " ,req.user._id)
}

const userAdd = async (req, res) => {
    let { fname, lname, username, email, password, age, number } = req.body
    let data = new Users({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        age: req.body.age,
        number: req.body.number,
        username: req.body.username,
        password: req.body.password
    })
    console.log(req.body)
    let response = await data.save()
    let myToken = await data.getAuthToken()
    res.status(200).json({ message: 'ok', token: myToken })
}

const userLogin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(301).json({ message: 'Error', message: 'please enter username/password' })
    }
    // console.log(req.body)
    let user = await Users.findOne({ username: req.body.username })
    var responseType = {
        message: 'ok'
    }
    if (user) {
        var match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            let myToken = await user.getAuthToken()
            responseType.message = 'Login Successfully'
            responseType.token = myToken
        } else {
            responseType.message = 'Invalid Password'
        }
    }
    else {
        responseType.message = 'Invalid Username'
    }
    res.status(200).json({ message: 'ok', data: responseType })
}

const userUpdate = async (req, res) => {
    console.log("id ---- ",req.user._id)
    const user = await Users.findById(req.user._id)

    if (user) {
        // console.log(req.user)
    
        user.fname = req.body.fname || user.fname
        user.lname = req.body.lname || user.lname
        user.number = req.body.number || user.number


        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            fname: updatedUser.fname,
            lname: updatedUser.lname,
            number: updatedUser.number,
            email: user.email,
            password: user.password,
            age: user.age,
            username: user.username,
            token: user.getAuthToken()
        })
    }else{
        res.status(404)
        throw new error ("User not found")
    }
}

module.exports = {
    userList,
    userAdd,
    userLogin,
    userUpdate
}