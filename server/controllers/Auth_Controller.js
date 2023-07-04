const { UserModel, ContactModel } = require("../model/Auth_Model")
const{ BadRequest, UnAuthenticated, Not_Found_Error } = require("../errors/z_index")
const bcrypt = require('bcryptjs')



const Get_All_User = async (req, res) => {
    const user = await UserModel.find({ })

    res.status(200).json({ user })
}



const Register = async (req, res) => {


    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    const creating_user = await UserModel.create(req.body)

    const contact = await ContactModel.findOne({ _id: creating_user._id })
    let creating_contact;


    
    //+ creating Contact Model for current user
    if(!contact) {
        creating_contact = await ContactModel.create({
            user: {
                userId: creating_user._id,
                name: creating_user.name
            },
            user_contact: []
        })

    }

    


    res.status(201).json({ 
        result: "User Created", 
        user: { 
            name:creating_user.name, 
            lastname:creating_user.lastname 
        },

        creating_contact
    })

}




const Login = async (req, res) => {

    const{ email, password } = req.body
    const user = await UserModel.findOne({ email })


    if(!email && !password)
        throw new BadRequest("please provide email and password")
    ;

    if(!email)
        throw new BadRequest("please provide email")
    ;

    if(!password)
        throw new BadRequest("please provide password")
    ;

    if(!user)
        throw new Not_Found_Error(`there is no email by ${email}`)
    ;


    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect)
        throw new UnAuthenticated(`wrong password please try again ${isPasswordCorrect}`)
    ;


    
    const token = user.CreateJWT()

    if(token)  
        user.online = true
    ;

    await user.save()
 
    
    res.status(200).json({ 
        user: { 
            userId: user._id,
            name:user.name,
            lastname:user.lastname,
            online: user.online
        }, 
        token: token  
    })

}




const Logout = async (req, res) => {

    const Current_User = req.user
    const user = await UserModel.findOne({ _id: Current_User.user.userId })
    
    user.online = false
    await user.save()

    res.status(200).json({ 
        user: {
            name:user.name,
            lastname:user.lastname,
            online: user.online
        } 
    })
}



const Reset_Password = async (req, res) => {

    const{ email, password } = req.body

    const check_email = await UserModel.findOne({ email: email })


    if(!check_email)
        throw new Not_Found_Error(`there is no email by ${email}`)
    ;

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)


    const user = await UserModel.findOneAndUpdate(
        { email:email }, 
        { password: hash },
        { new:true, runValidators:true }
    )


    res.status(200).json({ 
        result: "password was reseted", 
        email: user.email,
        user
    })

}



 

module.exports = {
    Register, Login, Logout, 
    Get_All_User, Reset_Password
}

