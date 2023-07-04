require("dotenv").config()
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")



const ContactSchema = new mongoose.Schema({
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        name: String,
    },
    user_contact: [{
        userId: mongoose.Schema.Types.ObjectId,
        name: String,
        lastname: String,
        img: String,
        checked_message: Number,
        messages_from_this_person: [Object]
    }]

}, {collection: "Contact"})


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please provide your name"],
        minLength: 3,
        maxLength: 25,
    },

    lastname: {
        type: String,
        required: [true, "please provide your lastname"],
        minLength: 3,
        maxLength: 25,
    },

    email: {
        type: String,
        required: [true, "please provide your name"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide valid email"
        ],

        unique:true 
    },

    password: {
        type: String,
        required:[true, "please provide password"],
        minLength:6,       
    },

    location: {
        type: String, 
        default:"My Country, City"
    },

    discription: {
        type:String,
        default:"Some Random Discription",
        minLength: 3,
        maxLength: 40,
    },

    online: {
        type: Boolean,
        default: false
    },

    img: {
        type: String,
        default:""
    },

    contact:{
        type: [Object],
        // ref: "ContactModel",
        default:[] 
        // [{  
        //     userId: mongoose.Schema.Types.ObjectId,
        //     name: String,
        //     lastname: String,
        //     img: String,
        //     checked_message: Number,
        //     messages_from_this_person: [Object]
        // }],
    }
    

}, { collection: "Users", timestamps:true })




// UserSchema.pre('save', async function(next) {
    
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })


UserSchema.methods.CreateJWT = function() {

    const payload = jwt.sign(
        { 
            userId:this._id, 
            name: this.name,
            lastname: this.lastname,
            location: this.location 
        },
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
    )

    return payload
}


UserSchema.method("comparePassword", async function(SecretPassword) {
    const compare = await bcrypt.compare(SecretPassword, this.password)
    return compare
})





const UserModel = mongoose.model("UserModel", UserSchema)
const ContactModel = mongoose.model("ContactModel", ContactSchema)

module.exports = { UserModel, ContactModel }