require('dotenv').config()
require("express-async-errors")

const express = require("express")
const app = express()

const connectDB = require('./db/connectDB')
const authRouter  = require('./routes/User_Auth_Routes')
const chatRouter  = require('./routes/Chat_Routes')



app.use(express.json()) 


//! Errors 
//+ Middleware
const { Not_Found, ErrorHandler } = require('./middleware/z_index')  
 


//+ Routes
app.use("/api/v1/auth", authRouter)  
app.use("/api/v1/chat-messages", chatRouter)  



//- Errors
app.use(Not_Found)
app.use(ErrorHandler) 

 




function connect() {

    try {
        const port = process.env.PORT || 3001
        connectDB(process.env.MONGO_URL)

        app.listen(port, console.log("Connect To the Server"))

    } catch(err) {
        console.log(err);
    }
    
}

connect() 



