const { UnAuthenticated } = require("../errors/z_index");
const jwt = require("jsonwebtoken")
 
 

function Authenticate(req, res, next) {

    const AuthHeader = req.headers.authorization

    if(!AuthHeader || !AuthHeader.startsWith("Bearer")) {
        throw new UnAuthenticated("Authentication invalid")
    } 


    const token = AuthHeader.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // const { user } = payload
    req.user = { user: payload }


    next()

}


module.exports = Authenticate