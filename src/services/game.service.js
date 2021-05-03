const { User, Game } = require('../models')
const { UnregisteredUserException } = require('../exceptions')
const { GameRepository, UserRepository } = require('../repositories')
const computer = new User('Computer')

function create(username, room) {
    if (username && room) {
        const user = UserRepository.findByUsername(username)
        if (user) {
            const newGame = new Game(user)
            GameRepository.saveGame(room, newGame)
        }
        throw new UnregisteredUserException(`Before playing, you need to sign up`)
    }
}

module.exports = {
    create
}
