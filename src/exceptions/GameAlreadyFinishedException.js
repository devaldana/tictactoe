class GameAlreadyFinishedException extends Error {
    constructor(message) {
        super(message)
        this.name = 'GameAlreadyFinishedException'
        this.statusCode = 400
    }
}

module.exports = GameAlreadyFinishedException
