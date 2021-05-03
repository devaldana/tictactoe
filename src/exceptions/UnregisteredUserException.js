class UnregisteredUserException extends Error {
    constructor(message) {
        super(message)
        this.name = 'UnregisteredUserException'
        this.statusCode = 400
    }
}

module.exports = UnregisteredUserException
