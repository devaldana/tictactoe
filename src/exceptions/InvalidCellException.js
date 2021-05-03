class InvalidCellException extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidCellException'
        this.statusCode = 400
    }
}

module.exports = InvalidCellException
