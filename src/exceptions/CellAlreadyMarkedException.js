class CellAlreadyMarkedException extends Error {
    constructor(message) {
        super(message)
        this.name = 'CellAlreadyMarkedException'
        this.statusCode = 400
    }
}

module.exports = CellAlreadyMarkedException
