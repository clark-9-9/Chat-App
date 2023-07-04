const express = require("express")
const Router = express.Router()
const{ 
    Authenticate, Create_Contact, 
    Create_Chat_Messages_Current_User, Create_Chat_Messages_Other_User

} = require('../middleware/z_index')




const { 
    Current_User, Other_User_Information, Get_Chat_Messages, 
    Add_Contact, Delete_Contact, Create_Chat_Message, 
    Sending_Message, Get_Messages, Click_Contact_Event,
    User_Who_IsNot_In_Contact
    
} = require("../controllers/Chat_Controller")



Router.get("/current-user", Authenticate, Current_User)
Router.get("/other-user/info/:id", Other_User_Information)
// Router.get("/:id", Get_Chat_Messages)
Router.get("/not-in-contat", Authenticate, User_Who_IsNot_In_Contact)
Router.get("/get-messages/:id", Authenticate, Get_Messages)
Router.get("/contact-event/:id", Authenticate, Click_Contact_Event)


Router.post('/contact/:id', Authenticate, 
    Create_Chat_Messages_Current_User,Create_Chat_Messages_Other_User, Create_Chat_Message,
    Create_Contact, Add_Contact 
)


Router.post("/send-message/:id", Authenticate, Create_Chat_Messages_Other_User, Sending_Message)
Router.delete('/contact/:id', Authenticate, Delete_Contact) 



// Router.post('/create-chat-message/:id', 
//     Authenticate, Create_Chat_Messages_Current_User,
//     Create_Chat_Messages_Other_User,
//     Create_Chat_Message
// )


// Router.post("/check-message-befor-sending/:id", Authenticate, Checking_Befor_Sending_Message)
// Router.post("/get-messages/:id", Authenticate, Get_Messages)






module.exports = Router


