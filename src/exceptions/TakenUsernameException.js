class TakenUsernameException extends Error {
    constructor(message) {
        super(message);
        this.name = 'TakenUsernameException'
        this.statusCode = 400
    }
}

module.exports = TakenUsernameException
