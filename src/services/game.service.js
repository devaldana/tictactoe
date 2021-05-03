const randomstring = require('randomstring')
const { User, Game } = require('../models')
const { GameRepository, UserRepository } = require('../repositories')
const {
    UnregisteredUserException,
    GameAlreadyFinishedException,
    GameNotFoundException,
    UnauthorizedToPlayInGameException
} = require('../exceptions')

// Registering default computer user
const computer = new User('computer')
UserRepository.save(computer)

/**
 * Allows a user join to play considering:
 *  - If no room was provided, a random room is created and the opponent is the computer,
 *    computer is always player X and always plays first.
 *  - If a room was provided and the room IS already registered, the user joins as player O.
 *  - If a room was provided and the room is NOT already registered, the user joins as player X.
 *
 * @throws {UnregisteredUserException} if there is no registered user for the given username.
 * @param username of the player to join.
 * @param room in which the player wants to play.
 * @returns data about the joined room and opponent.
 */
function join(username, room) {
    const user = validateUser(UserRepository.findByUsername(username))

    // No room case, random room and plays against the PC - computer start playing.
    if (!room) {
        const randomRoom = randomstring.generate()
        const newGame = new Game(computer, user)
        computerPlays(newGame)
        GameRepository.saveGame(randomRoom, newGame)
        return buildResponse(randomRoom, 'O', 'X', computer.getPublicProfile(), user.getPublicProfile(), newGame.board.getPublicRepresentation())
    } else {
        const game = GameRepository.findByRoom(room)
        if (game) {
            // A room was provided and a game was found in it - user will join the game.
            validateGameStatus(game, room)
            user.registerGame(game)
            game.playerO = user
            return buildResponse(room, 'O', 'X', game.playerX.getPublicProfile(), user.getPublicProfile(), game.board.getPublicRepresentation())
        } else {
            // A room was provided but not game in it was found - The user is creating a new board and joining as player X
            const newGame = new Game(user)
            GameRepository.saveGame(room, newGame)
            return buildResponse(room, 'X', 'O', undefined, user.getPublicProfile(), newGame.board.getPublicRepresentation())
        }
    }
}

function play(username, room, cellKey) {
    const user = validateUser(UserRepository.findByUsername(username))
    const game = validateGameStatus(GameRepository.findByRoom(room), room)
    if (game.playerX === user) {
        let message = undefined
        const win = game.playerXMarkCell(cellKey)
        if (win) message = 'You win!'
        return buildResponse(room, 'X', 'O', game.playerO.getPublicProfile(), user.getPublicProfile(), game.board.getPublicRepresentation(), message)
    } else if (game.playerO === user) {
        let message = undefined
        const win = game.playerOMarkCell(cellKey)
        if (win) {
            message = 'You win!'
        } else if (game.playerX === computer) {
            const computerWins = computerPlays(game)
            if (computerWins) message = 'Computer win!'
        }
        return buildResponse(room, 'O', 'X', game.playerX.getPublicProfile(), user.getPublicProfile(), game.board.getPublicRepresentation(), message)
    }
    throw new UnauthorizedToPlayInGameException('You are not a player in this game')
}

function computerPlays(game) {
    const cellToMarkByComputer = pickRandomAvailableCellFromGameBoard(game)
    return game.playerXMarkCell(cellToMarkByComputer)
}

function pickRandomAvailableCellFromGameBoard(game) {
    const availableCells = [...game.board.availableCells]
    const randomIndex = Math.floor(Math.random() * availableCells.length)
    return availableCells[randomIndex]
}

function validateGameStatus(game, room) {
    if(!game) throw new GameNotFoundException(`No game was found in room '${room}'`)
    if(game.isFinished()) throw new GameAlreadyFinishedException(`Game in room '${room}' was already finished`)
    return game
}

function validateUser(user) {
    if (!user) throw new UnregisteredUserException('Before playing, you need to sign up')
    return user
}

function buildResponse(room, yourSymbol, opponentSymbol, opponentProfile, yourProfile, board, message) {
    return {
        message,
        room,
        yourSymbol,
        opponentSymbol,
        yourProfile,
        opponentProfile,
        board
    }
}

module.exports = {
    join,
    play
}
