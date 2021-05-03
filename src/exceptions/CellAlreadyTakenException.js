class CellAlreadyTakenException extends Error {
    constructor(message) {
        super(message);
        this.name = 'CellAlreadyTakenException'
    }
}

module.exports = CellAlreadyTakenException
