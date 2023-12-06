const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://aditya:aditya@cluster0.klla0xc.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify : false,
    // useCreateIndex: true
    
}).then (con=> {
    console.log("connected DB")
}).catch(err =>{
    console.log('error',err)
})

module.exports = mongoose