const express = require('express')
const app = express()
const port = 8080
// const userRoute = require('./routes/users')
const passport = require('passport')
const path = require('path')
const cors = require("cors")

// require('./models/users')
// require('./config/db') // connction ban gaya to hata diya... then placed it in module
app.use(cors())
app.use(passport.initialize())
require('dotenv').config({
    path :path.join(__dirname,'.env')
})


app.use('/users',require('./routes/users'))
app.use('/subs',require('./routes/subs'))
app.use('/posts',require('./routes/posts'))
app.use('/reports',require('./routes/reports'))



app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`)
})