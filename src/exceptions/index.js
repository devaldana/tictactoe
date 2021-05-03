const InvalidCellException = require('./InvalidCellException')
const CellAlreadyMarkedException = require('./CellAlreadyMarkedException')
const TakenUsernameException = require('./TakenUsernameException')
const UserNotFoundException = require('./UserNotFoundException')
const InvalidParamsException = require('./InvalidParamsException')
const UnregisteredUserException = require('./UnregisteredUserException')

module.exports = {
    InvalidCellException,
    CellAlreadyMarkedException,
    TakenUsernameException,
    UserNotFoundException,
    InvalidParamsException,
    UnregisteredUserException
}
