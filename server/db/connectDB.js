const mongoose = require("mongoose")


function connectDB(URL) {
   
    return mongoose.connect(URL, console.log("Connect to DB"))

}


module.exports = connectDB