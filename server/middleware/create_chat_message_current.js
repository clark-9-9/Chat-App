const { UserModel } = require("../model/Auth_Model")



async function Create_Chat_Messages_Current_User(req, res, next) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params


    //+ models
    const other_user = await UserModel.findOne({ _id: UserIdParams })


    let create_messages = {

        Current_User: {
            userId: Current_User.user.userId,
            name: Current_User.user.name
        },

        Other_User: {
            userId: other_user._id,
            name: other_user.name
        },


        User_Messages: [
            // {   
            //     from: Current_User.user.userId,
            //     name: Current_User.user.name,
            //     body: CurrentUser_Body_Message,    
            // },
        ],
    

    }


    req.create_messages_current_user = create_messages
    next()
}



module.exports = Create_Chat_Messages_Current_User