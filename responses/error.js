const ERROR_CODES = {
    // HTTP status codes are used as they are (100-599)

    // Internal backend errors (10000 - 19999)
    UNKNOWN_INTERNAL_ERROR: 10000,
    AUTHENTICATION_FAILED: 10001,
    AUTHORIZATION_FAILED: 10002,


};

class ErrorResponse {
    constructor(code, description) {
        this.error = { code, description };
    }
}


module.exports = {ErrorResponse, ...ERROR_CODES};
