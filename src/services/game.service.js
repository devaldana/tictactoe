const { User, Game } = require('../models');
const { TakenUsernameException, UserNotFoundException } = require('../exceptions')
const { GameRepository, UserRepository } = require('../repositories')
const computer = new User('Computer', 'X')

function create(username, room) {
    if (username && room) {
        const user = UserRepository.findByUsername(username)
        if (user) {
            const newGame = new Game(user);
            GameRepository.saveGame(room, newGame)
        }
        throw new UserNotFoundException(`User '${username}' was not found`)
    }
    const game = new Game(new User('David', 'X'), new User('Caro', 'O'));
}

module.exports = {
    create
}
