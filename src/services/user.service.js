const { User } = require('../models');
const { TakenUsernameException, UserNotFoundException } = require('../exceptions')
const database = require('../repository/database')

function create(username) {
    if (!database.userExists(username)) {
        const newUser = new User(username)
        database.saveUser(newUser)
        return newUser.getPublicProfile()
    }
    throw new TakenUsernameException(`Username '${username}' is already in use`)
}

function findAll() {
    return database.findAllUsers().map(user => user.getPublicProfile())
}

function findByUsername(username) {
    const user = database.getUserByUsername(username);
    if (user) {
        return user.getPublicProfile()
    }
    throw new UserNotFoundException(`User '${username}' was not found`)
}

function findUserGames(username, status) {
    const user = database.getUserByUsername(username);
    if (user) {
        if(status) {
            return user.getPlayedGames().filter(game => game.status === status).map(getGamePublicRepresentation)
        }
        return user.getPlayedGames().map(getGamePublicRepresentation)
    }
    throw new UserNotFoundException(`User '${username}' was not found`)
}

function getGamePublicRepresentation(game) {
    return game.getPublicRepresentation()
}

module.exports = {
    create,
    findAll,
    findByUsername,
    findUserGames
}
