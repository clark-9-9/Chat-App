const { BadRequest } = require("../errors/z_index")
const{ UserModel, ContactModel } = require("../model/Auth_Model")
const Chat_Messages_Model = require("../model/Chat_Model")



async function Create_Contact(req, res, next) {


    const Current_User = req.user
    const{ id: UserIdParams } = req.params

    //+ models
    const current_user = await UserModel.findOne({ _id: Current_User.user.userId })
    const Add_Contact = await UserModel.findOne({ _id: UserIdParams })
    const contact = await ContactModel.findOne({ "user.userId": Current_User.user.userId }) 


    const chat_message = await Chat_Messages_Model.findOne({
        "Current_User.userId": Current_User.user.userId,
        "Other_User.userId": UserIdParams,
    })




    
    //+ checking and adding last message and how many message we recieved

    const number_of_messages_needs_to_be_checked = chat_message ? chat_message.User_Messages.filter((message) => {
        return JSON.stringify(message.from) === JSON.stringify(UserIdParams) && message.Message_Checked === false
    }).length : 0 ;

    const last_message_from_other_user = chat_message ? chat_message.User_Messages.filter(message => {
        return JSON.stringify(message.from) === JSON.stringify(UserIdParams)  
    }) : "" ;
    
    const the_last_message = last_message_from_other_user !== "" && last_message_from_other_user[0] !== undefined 
        ? last_message_from_other_user[last_message_from_other_user.length - 1] 
        : "" 
    ;

    
    
    const check_for_existing_user = contact ? contact.user_contact.filter((user) => {
        return JSON.stringify(user.userId) === JSON.stringify(UserIdParams)
    }) : [] ;

    const length_of_contact_coll = contact ? contact.user_contact.map(user => user).length : []
    const length_of_user_contact = current_user.contact.map(user => user).length


    console.log(last_message_from_other_user);
    console.log(the_last_message);
    

    //+ conditions
    if(JSON.stringify(UserIdParams) === JSON.stringify(Current_User.user.userId)) 
        throw new BadRequest("you can't add current user to current user's contact")
    ;

    if( check_for_existing_user[0] !== undefined && length_of_contact_coll === length_of_user_contact )    
        throw new BadRequest("user already exist in your contact")
    ;



    if(
        contact && check_for_existing_user[0] === undefined && 
        contact.user.userId !== Current_User.user.userId 
    ) {
        contact.user_contact = [
            ...contact.user_contact,
            {
                userId: Add_Contact._id,
                name: Add_Contact.name,
                lastname: Add_Contact.lastname,
                img: Add_Contact.img,
                checked_message: number_of_messages_needs_to_be_checked,
                messages_from_this_person: [the_last_message]
            }
        ]

    }
    
    await contact.save()

    next()

}








module.exports =  Create_Contact 