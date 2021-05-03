class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundException'
        this.statusCode = 404
    }
}

module.exports = UserNotFoundException
