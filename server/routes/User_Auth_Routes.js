const express = require("express")
const Router = express.Router()
const { Authenticate } = require("../middleware/z_index") 



const { 
    Register, Login, Logout, 
    Get_All_User, Reset_Password 

} = require("../controllers/Auth_Controller")



Router.get("/", Get_All_User)

Router.post('/register', Register)
Router.post('/login', Login)
Router.post('/logout', Authenticate, Logout)

Router.patch('/change/reset', Reset_Password)



module.exports = Router