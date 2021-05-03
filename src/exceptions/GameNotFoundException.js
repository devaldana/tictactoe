class GameNotFoundException extends Error {
    constructor(message) {
        super(message)
        this.name = 'GameNotFoundException'
        this.statusCode = 404
    }
}

module.exports = GameNotFoundException
