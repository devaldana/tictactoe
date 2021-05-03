const InvalidCellException = require('./InvalidCellException')
const CellAlreadyMarkedException = require('./CellAlreadyMarkedException')
const TakenUsernameException = require('./TakenUsernameException')
const UserNotFoundException = require('./UserNotFoundException')
const InvalidParamsException = require('./InvalidParamsException')
const UnregisteredUserException = require('./UnregisteredUserException')
const GameAlreadyFinishedException = require('./GameAlreadyFinishedException')
const GameNotFoundException = require('./GameNotFoundException')
const UnauthorizedToPlayInGameException = require('./UnauthorizedToPlayInGameException')

module.exports = {
    InvalidCellException,
    CellAlreadyMarkedException,
    TakenUsernameException,
    UserNotFoundException,
    InvalidParamsException,
    UnregisteredUserException,
    GameAlreadyFinishedException,
    GameNotFoundException,
    UnauthorizedToPlayInGameException
}
