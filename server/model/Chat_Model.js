const mongoose = require("mongoose")
const UserModel = require("./Auth_Model")



const Chat_Message_Schema = new mongoose.Schema({
    Current_User: {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type:String, required:true },
    },

    Other_User: {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type:String, required:true },
    },
     
    User_Messages: [
        {   
            from: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
            name: String,
            body: { type:String },
            Message_Checked: {
                type: Boolean,
                // default: false
            }
        },
    ],


}, { collection: "Chat_Messages", timestamps: true })




const Chat_Messages_Model = mongoose.model("Chat_Messages", Chat_Message_Schema)
module.exports = Chat_Messages_Model






/* 
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now, set: v => v.Date.now()}
*/




