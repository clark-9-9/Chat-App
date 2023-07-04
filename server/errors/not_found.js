const CustomApiError = require("./custom_api")

class Not_Found_Error extends CustomApiError {
    constructor(message) {
        super(message)
        this.StatusCode = 404
    }
}


module.exports = Not_Found_Error 