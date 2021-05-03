class InvalidParamsException extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidParamsException'
        this.statusCode = 400
    }
}

module.exports = InvalidParamsException
