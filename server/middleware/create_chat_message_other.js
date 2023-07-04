const { UserModel } = require("../model/Auth_Model")



async function Create_Chat_Messages_Other_User(req, res, next) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params


    //+ models
    const other_user = await UserModel.findOne({ _id: UserIdParams })


    let create_messages = {

        Current_User: {
            userId: other_user._id,
            name: other_user.name
        },

        Other_User: {
            userId: Current_User.user.userId,
            name: Current_User.user.name
        },


        User_Messages: [
            // {   
            //     from: User_Added._id,
            //     name: User_Added.name,
            //     body: OtherUser_Body_Message,    
            // },
        ],
    
    }


    req.create_messages_other_user = create_messages
    next()
}



module.exports = Create_Chat_Messages_Other_User