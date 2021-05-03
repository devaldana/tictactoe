class InvalidCellException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCellException'
    }
}

module.exports = InvalidCellException
