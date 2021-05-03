const { User } = require("../models");
const { TakenUsernameException, UserNotFoundException } = require('./../exceptions')
const users = new Map()

function create(username) {
    if (users.has(username)) {
        throw new TakenUsernameException(`Username '${username}' is already in use`)
    }
    const newUser = new User(username)
    users.set(username, newUser) // saving the user
    return newUser.getPublicProfile()
}

function findAll() {
    return [...users.values()].map(user => user.getPublicProfile())
}

function findByUsername(username) {
    if (!users.has(username)) {
       throw new UserNotFoundException(`User '${username}' was not found`)
    }
    return users.get(username).getPublicProfile()
}

function findUserGames(username, status) {
    if (!users.has(username)) {
        throw new UserNotFoundException(`User '${username}' was not found`)
    }
    const user = users.get(username)
    if(!status) return user.getPlayedGames().map(game => game.getPublicRepresentation())
    return user.getPlayedGames().filter(game => game.status === status).map(game => game.getPublicRepresentation())
}

module.exports = {
    create,
    findAll,
    findByUsername,
    findUserGames
}
