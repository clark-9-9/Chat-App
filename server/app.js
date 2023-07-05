require('dotenv').config()
require("express-async-errors")

const express = require("express")
const cors = require('cors');
const app = express() 

const connectDB = require('./db/connectDB')
const authRouter  = require('./routes/User_Auth_Routes')
const chatRouter  = require('./routes/Chat_Routes')


app.use(
    cors({
        origin:["http://localhost:3000", "https://mern-chat-app-frontend-4h6s.onrender.com"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], 
        allowedHeaders: ['Content-Type', 'Authorization']
    }) 
);



//! Errors 
//+ Middleware
const { Not_Found, ErrorHandler } = require('./middleware/z_index')  
app.use(express.json()) 



//+ Routes
app.use("/api/v1/auth", authRouter)  
app.use("/api/v1/chat-messages", chatRouter)  



//- Errors
app.use(Not_Found)
app.use(ErrorHandler) 

 




function connect() {

    try {
        const port = process.env.PORT || 3001
        const URI = process.env.MONGO_URI;
        
        if (!URI) throw new Error('MongoDB URI is not defined');
        connectDB(URI)

        app.listen(port, console.log("Connect To the Server"))

    } catch(err) {
        console.log(err);
    }
    
}

connect() 



