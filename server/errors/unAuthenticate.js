const CustomApiError = require("./custom_api")

class UnAuthenticated extends CustomApiError {
    constructor(message) {
        super(message)
        this.StatusCode = 401
    }
}


module.exports = UnAuthenticated