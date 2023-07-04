const CustomApiError = require("./custom_api")

class BadRequest extends CustomApiError {
    constructor(message) {
        super(message)
        this.StatusCode = 400
    }
}


module.exports = BadRequest