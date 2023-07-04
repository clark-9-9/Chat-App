const { UserModel, ContactModel } = require("../model/Auth_Model");
const Chat_Messages_Model = require("../model/Chat_Model");
const{ BadRequest, UnAuthenticated, Not_Found_Error } = require("../errors/z_index");




 
async function Current_User(req, res) {

    const current_user = req.user
    const user = await UserModel.findOne({ _id: current_user.user.userId })

    if(!user)
        throw new Not_Found_Error(`there is no id by ${current_user.user.userId}`)
    ;

    console.log(user);
    
    res.status(200).json({ current_user, user })
} 



const Other_User_Information = async (req, res) => {

    const{ id: UserIdParams } = req.params
    const other_user = await UserModel.findOne({ _id: UserIdParams })
    
    res.status(200).json({ other_user })
    
}




async function Get_Chat_Messages(req, res) {    
    const chat_messages = await Chat_Messages_Model.find({ })
    res.status(200).json({ chat_messages })
}



async function Add_Contact(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params


    //+ models
    const current_user = await UserModel.findOne({ _id: Current_User.user.userId })
    const contact_current_user = await ContactModel.findOne({ "user.userId": Current_User.user.userId }) 

    
    current_user.contact = [ ...contact_current_user.user_contact ]
    await current_user.save()

    
    res.json({ 
        contact_current_user,
        users_model_contact: current_user.contact
    })

}


async function User_Who_IsNot_In_Contact(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params
    const current_user_contact = await UserModel.findOne({ _id: Current_User.user.userId })
    const users = await UserModel.find({ _id: { $ne: Current_User.user.userId } })
    
    let contact = current_user_contact.contact; 
    let r1 = [];

    for(let i = 0; i < contact.length; i++) {
        r1.push(JSON.stringify(contact[i].userId))
    }

    const user = users.filter((user) => {
        console.log(r1.includes(JSON.stringify(user._id)));
        if(r1.includes(JSON.stringify(user._id)) === false) return user;
    })
    
    res.status(200).json({ user, length: user.length })
}




    // const user = await UserModel.find({ _id: { $ne: Current_User.user.userId }, "contact.$.userId"  })
    // const user = await UserModel.find({ "contact.$.userId": { $nin: [current_user_contact.contact.userId] }  })

    // const user = await UserModel.find({ 
    //     _id: { $ne: Current_User.user.userId }, 
    //     "contact.$.userId": { $nin: [current_user_contact.contact.userId] }  
    // })

    // const user = await UserModel.find({ 
    //     _id: { $ne: Current_User.user.userId }, 
    //     "contact.$.userId": { $ne: current_user_contact.contact.userId }  
    // })


async function Delete_Contact(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params
    const is_contact_exist = await ContactModel.findOne({ "user.userId": Current_User.user.userId })

    if(!is_contact_exist)
        throw new Not_Found_Error("there is no contact to remove")
    ;

    const removed_contact = await ContactModel.findOneAndUpdate({ "user.userId": Current_User.user.userId } , { $pull: {user_contact: {userId: UserIdParams}} })
    const current_user = await UserModel.findOne({ _id: Current_User.user.userId })
    const other_user = await UserModel.findOne({ _id: UserIdParams })
    

    //- we have to declare contact down here after remove_contact <--- which is update our document if wanted see the result after updated document
    //- but if we decalre contact above removed_contact , it shows us the the result befor it update the the document 
    //- so here the work will be done it means the contact we want will be deleted, but we still see the contact in our docment

    
    const contact = await ContactModel.findOne({ "user.userId": Current_User.user.userId })
    current_user.contact = [ ...contact.user_contact ] 

    await current_user.save()

    // const contact = await ContactModel.updateOne({ "user.userId": Current_User.user.userId } , { $pull: {user_contact: {userId: UserIdParams}} })
    // const contact = await ContactModel.findOneAndUpdate({ "user_contact": { $elemMatch:{ userId: UserIdParams }} }, { $pull: {user_contact: UserIdParams} })
    // const contact = await ContactModel.findOneAndRemove({ "user_contact": { $elemMatch:{ userId: UserIdParams }}  })
    // ({  "user_contact": { $elemMatch:{ userId: ObjectId("6357e0757a114317c349b91d") }}  })


    res.status(200).json({
        removed_contact: other_user,
        contact: contact.user_contact,
        user_contact: current_user.contact
    })


}





async function Create_Chat_Message(req, res, next) { //. <----- midleware

    const Current_User = req.user
    const{ id: UserIdParams } = req.params

    const create_messages_current_user = req.create_messages_current_user
    const create_messages_other_user = req.create_messages_other_user
    let chat_message_current;
    let chat_message_other;

    


    //+ models
    const current_user = await UserModel.findOne({ _id: Current_User.user.userId })
    const other_user = await UserModel.findOne({ _id: UserIdParams })

    let chat_message_current_user = await Chat_Messages_Model.findOne({
        "Current_User.userId": Current_User.user.userId ,
        "Other_User.userId":  UserIdParams ,
    })

    let chat_message_other_user = await Chat_Messages_Model.findOne({
        "Current_User.userId": UserIdParams,
        "Other_User.userId": Current_User.user.userId,
    })


    //+ conditions
    if(JSON.stringify(UserIdParams) === JSON.stringify(Current_User.user.userId))
        throw new BadRequest("you can't create chat message with yourself")
    ;

    //+ check if chat message does exist
    if(chat_message_current_user)
        chat_message_current = `Chat message already exist for current user: (${current_user.name}) | to talk with: (${other_user.name})`
    ;

    if(chat_message_other_user)
        chat_message_other = `Chat message already exist for current user: (${other_user.name}) | to talk with: (${current_user.name})`
    ;



    //+ creating chat && check if chat message doesn't exist
    if(
        !chat_message_current_user && 
        JSON.stringify(current_user._id) !== JSON.stringify(UserIdParams)
    ) {
        chat_message_current = await Chat_Messages_Model.create(create_messages_current_user)
    }


    if(
        !chat_message_other_user && 
        JSON.stringify(current_user._id) !== JSON.stringify(UserIdParams)
    ) {
        chat_message_other = await Chat_Messages_Model.create(create_messages_other_user)
    }


    next()


    // const current_exist = typeof chat_message_current === "string" ? true : false
    // const other_exist = typeof chat_message_other === "string" ? true : false

    // res.status(201).json({
    //     current_exist,
    //     other_exist,
    //     chat_message_current,
    //     chat_message_other
    // }) 

}




async function Sending_Message(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params
    const{ the_message } = req.body;
    let result_of_other_contact;
    let result_chat_message_other_user;


    //+ models
    //+ ContactModel
    const check_if_current_user_exist_in_other_users_contact = await ContactModel.findOne({ 
        "user.userId": UserIdParams, 
        "user_contact": { $elemMatch:{ userId: Current_User.user.userId }} 
    })

    const check_if_other_user_exist_in_current_users_contact = await ContactModel.findOne({ 
        "user.userId": Current_User.user.userId, 
        "user_contact": { $elemMatch:{ userId: UserIdParams }} 
    })
        

    const check_if_cuurent_user_contact_model_exist = await ContactModel.findOne({ "user.userId": Current_User.user.userId })
    const check_if_other_user_contact_model_exist = await ContactModel.findOne({ "user.userId": UserIdParams })
        

    //+ Chat_Messages_Model
    let chat_message_current_user = await Chat_Messages_Model.findOne({
        "Current_User.userId": Current_User.user.userId,
        "Other_User.userId":  UserIdParams,
    })


    let chat_message_other_user = await Chat_Messages_Model.findOne({
        "Current_User.userId": UserIdParams,
        "Other_User.userId": Current_User.user.userId,
    })


    const chat_message = await Chat_Messages_Model.findOne({
        "Current_User.userId": UserIdParams,
        "Other_User.userId": Current_User.user.userId,
    })


    const number_of_messages_needs_to_be_checked = chat_message ? chat_message.User_Messages.filter((message) => {
        return JSON.stringify(message.from) === JSON.stringify(Current_User.user.userId) && message.Message_Checked === false
    }).length : 0 ;


    const last_message_from_other_user = chat_message ? chat_message.User_Messages.filter(message => {
        return JSON.stringify(message.from) === JSON.stringify(Current_User.user.userId) ? message : ""
    }) : ""
    

    const the_last_message = last_message_from_other_user !== "" && last_message_from_other_user[0] !== undefined 
        ? last_message_from_other_user[last_message_from_other_user.length - 1] 
        : "" 
    ;





    //+ coditions
    if(JSON.stringify(UserIdParams) === JSON.stringify(Current_User.user.userId)) 
        throw new BadRequest("it cant be Current User id equal to Current user id")
    ;

    if(!chat_message_current_user) 
        throw new Not_Found_Error("create a chat message to communicate")
    ;   
    
    if(!check_if_cuurent_user_contact_model_exist) 
        throw new Not_Found_Error("we didn't find current users ContactModel")
    ;

    if(!check_if_other_user_contact_model_exist) 
        throw new Not_Found_Error("we didn't find other users ContactModel")
    ;

    

    
    //+ updating ContactModel, if exist but doesn't have current user in his contact  
    if(
        !check_if_current_user_exist_in_other_users_contact && check_if_other_user_exist_in_current_users_contact &&
        JSON.stringify(UserIdParams) !== JSON.stringify(Current_User.user.userId)
    ) {
        await ContactModel.findOneAndUpdate(
            { "user.userId": UserIdParams },
            { 
                $push:{ user_contact: { 
                    userId: Current_User.user.userId,
                    name: Current_User.user.name,
                    lastname: Current_User.user.lastname,
                    img:"",
                    checked_message: number_of_messages_needs_to_be_checked,
                    messages_from_this_person: [the_last_message]
                }}
            }
        )

        result_of_other_contact = "current user added to other users contact"
    } 

    else {
        result_of_other_contact = 'current user already exist in other users contact'
    };
    


    //- create chat message for other user, if current users chat message does exist but other users chat message does not exist
    if( chat_message_current_user && !chat_message_other_user ) {
        await Chat_Messages_Model.create(req.create_messages_other_user)
        result_chat_message_other_user = "chat message for other user created"
    } 
    else { 
        result_chat_message_other_user = 'chat message for other user already exist' 
    } 
        

    
    //+ sending message after finshing conditions
    Sending_Message_Complement(req, res)

    const Update_Contact_Model = await ContactModel.findOne({ 
        "user.userId": UserIdParams ,
        "user_contact.userId":  Current_User.user.userId   
    })



    res.status(200).json({
        result_of_other_contact,
        check_if_current_user_exist_in_other_users_contact: !check_if_current_user_exist_in_other_users_contact ? false : true,
        result_chat_message_other_user,
        the_message,
        Update_Contact_Model
    })


}


async function Sending_Message_Complement(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params
    const{ the_message } = req.body;


    

    //+ sending message after finshing conditions
    const current_user = await UserModel.findOne({ _id: Current_User.user.userId })

    let existing_chat_current_user = await Chat_Messages_Model.findOne({
        "Current_User.userId": Current_User.user.userId,
        "Other_User.userId":  UserIdParams,
    })

    let existing_chat_other_user = await Chat_Messages_Model.findOne({
        "Current_User.userId": UserIdParams,
        "Other_User.userId": Current_User.user.userId,
    })


    

    if(existing_chat_current_user) {
        await Chat_Messages_Model.findOneAndUpdate(
            { 
                "Current_User.userId": Current_User.user.userId,
                "Other_User.userId":  UserIdParams,
            },
            {
                $push:{ User_Messages: { 
                    from: current_user._id,
                    name: current_user.name,
                    body: the_message,    
                    Message_Checked: false  
                }}
            }
        )
    };

    if(existing_chat_other_user) {
        await Chat_Messages_Model.findOneAndUpdate(
            {
                "Current_User.userId": UserIdParams,
                "Other_User.userId": Current_User.user.userId,
            },
            {
                $push:{ User_Messages: { 
                    from: current_user._id,
                    name: current_user.name,
                    body: the_message,  
                    Message_Checked: false  
                }}
            }
        )
    };
    


    //+ update ContactModel collection
    const chat_message = await Chat_Messages_Model.findOne({
        "Current_User.userId": UserIdParams,
        "Other_User.userId": Current_User.user.userId,
    })


    const number_of_messages_needs_to_be_checked = chat_message ? chat_message.User_Messages.filter((message) => {
        return JSON.stringify(message.from) === JSON.stringify(Current_User.user.userId) && message.Message_Checked === false
    }).length : 0 ;


    const last_message_from_other_user = chat_message ? chat_message.User_Messages.filter(message => {
        return JSON.stringify(message.from) === JSON.stringify(Current_User.user.userId) 
    }) : ""
    

    const the_last_message = last_message_from_other_user !== "" && last_message_from_other_user[0] !== undefined 
    ? last_message_from_other_user[last_message_from_other_user.length - 1] 
    : "" 
;



    await ContactModel.findOneAndUpdate(
        { 
            "user.userId": UserIdParams ,
            "user_contact.userId":  Current_User.user.userId   
        },
        {
            $set: { 
                "user_contact.$.checked_message": number_of_messages_needs_to_be_checked,
                "user_contact.$.messages_from_this_person": [the_last_message]            
            }
        }
    )



    const other_user = await UserModel.findOne({ _id: UserIdParams })
    const other_users_contact_coll = await ContactModel.findOne({ "user.userId": UserIdParams }) 


    //- after we add new contact to our ContactModel collection we also need to add for users contact
    //- or if user doesn't want to see the contact and removing it and we adding to the list of the contact if the one who got removed sent a message 
    other_user.contact = [ ...other_users_contact_coll.user_contact ]
    await other_user.save()
}





async function Click_Contact_Event(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params

    //+ models

    const chat = await Chat_Messages_Model.findOne({
        "Current_User.userId": Current_User.user.userId,
        "Other_User.userId": UserIdParams,
    })


    chat.User_Messages.filter((message) => {
        if(JSON.stringify(message.from) === JSON.stringify(UserIdParams)) 
            return message.Message_Checked = false
        ;
    })



    // const chat_message = await Chat_Messages_Model.findOne({
    //     "Current_User.userId": UserIdParams,
    //     "Other_User.userId": Current_User.user.userId,
    // })


    // const number_of_messages_needs_to_be_checked = chat_message ? chat_message.User_Messages.filter((message) => {
    //     return JSON.stringify(message.from) === JSON.stringify(Current_User.user.userId) && message.Message_Checked === false
    // }).length : 0 ;


    // const last_message_from_other_user = chat_message ? chat_message.User_Messages.filter(message => {
    //     return JSON.stringify(message.from) === JSON.stringify(UserIdParams) 
    // }) : ""
    

    // const the_last_message = last_message_from_other_user !== "" && last_message_from_other_user[0] !== undefined 
    // ? last_message_from_other_user[last_message_from_other_user.length - 1] 
    // : "" 




    // await ContactModel.findOneAndUpdate(
    //     { 
    //         "user.userId": UserIdParams ,
    //         "user_contact.userId":  Current_User.user.userId   
    //     },
    //     {
    //         $set: { 
    //             "user_contact.$.checked_message": number_of_messages_needs_to_be_checked,
    //             "user_contact.$.messages_from_this_person": [the_last_message]            
    //         }
    //     }
    // )


    // const other_user = await UserModel.findOne({ _id: UserIdParams })
    // const other_users_contact_coll = await ContactModel.findOne({ "user.userId": UserIdParams }) 



    // other_user.contact = [ ...other_users_contact_coll.user_contact ]



    await chat.save()
    // await other_user.save()


    const update = await Chat_Messages_Model.findOne({
        "Current_User.userId": Current_User.user.userId,
        "Other_User.userId": UserIdParams,
    })


    // const Update_Contact_Model = await ContactModel.findOne({ 
    //     "user.userId": UserIdParams ,
    //     "user_contact.userId":  Current_User.user.userId   
    // })

    
    res.status(200).json({
        update_chat: update.User_Messages,
        // Update_Contact_Model

    })

}




async function Get_Messages(req, res) {

    const Current_User = req.user
    const{ id: UserIdParams } = req.params


    const find_messages = await Chat_Messages_Model.findOne({ 
        "Current_User.userId": Current_User.user.userId,
        "Other_User.userId": UserIdParams,
    })


    const messages = find_messages.User_Messages
    
    res.status(200).json({
        messages
    })

} 







module.exports = {
    Current_User, Other_User_Information, Get_Chat_Messages, 
    Add_Contact, Delete_Contact, Create_Chat_Message, 
    Sending_Message, Get_Messages, Click_Contact_Event,
    User_Who_IsNot_In_Contact
}






    // if(UserIdParams)
        // await Chat_Messages_Model.updateMany(
        //     {
        //         "Current_User.userId": Current_User.user.userId,
        //         "Other_User.userId": UserIdParams,
        //         User_Messages: {$elemMatch: { from: UserIdParams }}
        //         // "User_Messages.from": UserIdParams 
        //     }, 
        //     {
        //         $set:{ 
        //             "User_Messages.$.Message_Checked": true 
        //         }
        //     }
        // )
    // ;





/* 
+ Removing specific items from array with MongoDB
+ or remove object in array

"comments": [
    {
        "user_id": ObjectId("4f240b433dc7937d68030000"),
        "user_name": "james",
        "user_comment": "This is a comment",
        "created_at": "2012-01-2821: 20: 44"
    },
    {
        "user_id": ObjectId("4f240b433dc7937d68030000"),
        "user_name": "mandy",
        "user_comment": "This is another comment",
        "created_at": "2012-01-2821: 31: 07"
    }
],



If you can identify the comment item by matching userid, name or comment -- then you can remove that comment using update() command with $pull modifier along with the appropriate condition.

If you cannot do as above, include an unique id in the comments (like UUID).

To delete the comment, do the following:

db.coll.update({<cond to identify document}, {$pull: {'comments': {'name': <name>}}} )
If you use the id, which is preferred:

db.coll.update({<cond to identify document}, {$pull: {'comments': {'id': <id>}}} )

+__________________________________________________________________________________________________________

+ similar problem

contact: {
    phone: [
        {
            number: "+1786543589455",
            place: "New Jersey",
            createdAt: ""
        }
        {
            number: "+1986543589455",
            place: "Houston",
            createdAt: ""
        }

    ]
}


Here I only know the mongo id(_id) and phone number(+1786543589455) and I need to remove that whole corresponding array element from document. i.e zero indexed element in phone array is matched with phone number and need to remove the corresponding array element.

I tried with following update method

collection.update(
    { _id: id, 'contact.phone': '+1786543589455' },
    { $unset: { 'contact.phone.$.number': '+1786543589455'} }
);
But it removes number:  +1786543589455 from inner array object, not zero indexed element in phone array. Tried with pull also without a success.

How to remove the array element in mongodb?


+ solve

+1-

Try the following query:

collection.update(
  { _id: id },
  { $pull: { 'contact.phone': { number: '+1786543589455' } } }
);
It will find document with the given _id and remove the phone +1786543589455 from its contact.phone array.

You can use $unset to unset the value in the array (set it to null), but not to remove it completely.

Share
Improve this answer
Follow

+2-

This below code will remove the complete object element from the array, where the phone number is '+1786543589455'

db.collection.update(
  { _id: id },
  { $pull: { 'contact': { number: '+1786543589455' } } }
);

+3- 

You can simply use $pull to remove a sub-document. The $pull operator removes from an existing array all instances of a value or values that match a specified condition.

Collection.update({
    _id: parentDocumentId
  }, {
    $pull: {
      subDocument: {
        _id: SubDocumentId
      }
    }
  });
This will find your parent document against given ID and then will remove the element from subDocument which matched the given criteria.

Read more about pull here.


+_____________________________________________________________________________
+ push object into array

people: {
    name: String, 
    friends: [{firstName: String, lastName: String}]
}



The $push operator appends a specified value to an array.

{ $push: { <field1>: <value1>, ... } }
$push adds the array field with the value as its element.

Above answer fulfils all the requirements, but I got it working by doing the following

var objFriends = { fname:"fname",lname:"lname",surname:"surname" };
Friend.findOneAndUpdate(
   { _id: req.body.id }, 
   { $push: { friends: objFriends  } },
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
)


+________________________________________________________________________________________________________

Mongoose, check if value exists in an array of objects

+ question
I have a collection with: I want to use the $in operator

Person = {
 name: String,
 members: [ {id: String, email: String}... {}]
}

+ answer
$elemMatch can be used with Arrays of Embedded Documents:

In your case you could try:

Person.find({ 
   members: { 
      $elemMatch: { id: id1 } 
   }
}); 


+ my answer

    - const check_if_current_user_exist_in_other_users_contact = await ContactModel.findOne(
    -     { 
    -         "user.userId": UserIdParams, 
    -         "user_contact.$": {userId: Current_User.user.userId} 
    -     }
    - ) 


+ The same can be done in mongoose in the following ways:

query.elemMatch('arrayfield', { id: ObjectId("5eaaeedd00101108e1123461") })
.

query.where('arrayfield').elemMatch({ id: ObjectId("5eaaeedd00101108e1123461") })
.

query.elemMatch('arrayfield', function (elem) {
  elem.where('id').equals(ObjectId("5eaaeedd00101108e1123461"));
})
.

query.where('arrayfield').elemMatch(function (elem) {
  elem.where({ id: ObjectId("5eaaeedd00101108e1123461") });
})
I have used this example collection:

[
  {
    "_id": ObjectId("5eaaeedd00101108e1123451"),
    "arrayfield": [
      {
        id: ObjectId("5eaaeedd00101108e1123461"),
        name: "David"
      },
      {
        id: ObjectId("5eaaeedd00101108e1123462"),
        name: "Brown"
      }
    ]
  },
  {
    "_id": ObjectId("5eaaeedd00101108e1123452"),
    "arrayfield": [
      {
        id: ObjectId("5eaaeedd00101108e1123471"),
        name: "Maple"
      },
      {
        id: ObjectId("5eaaeedd00101108e1123472"),
        name: "Green"
      }
    ]
  },
  {
    "_id": ObjectId("5eaaeedd00101108e1123453"),
    "arrayfield": [
      {
        id: ObjectId("5eaaeedd00101108e1123461"),
        name: "David"
      },
      {
        id: ObjectId("5eaaeedd00101108e1123482"),
        name: "Lacey"
      }
    ]
  }
]




*/