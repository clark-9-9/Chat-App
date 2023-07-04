const CustomApiError = require("../errors/custom_api");


function ErrorHandler(err, req, res, next) {
    
    console.log(err);

    if(err instanceof CustomApiError) {
       return res.status(err.StatusCode).json({ msg:err.message })
    }

    res.status(500).json({ err })
}

module.exports = ErrorHandler
