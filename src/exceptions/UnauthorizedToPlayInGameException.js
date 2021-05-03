class UnauthorizedToPlayInGameException extends Error {
    constructor(message) {
        super(message)
        this.name = 'UnauthorizedToPlayInGameException'
        this.statusCode = 401
    }
}

module.exports = UnauthorizedToPlayInGameException
