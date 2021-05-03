const usersCollection = new Map()

function userExists(username) {
    return usersCollection.has(username)
}

function saveUser(user) {
    usersCollection.set(user.username, user)
}

function findAllUsers() {
    return  [...usersCollection.values()]
}

function getUserByUsername(username) {
    return usersCollection.get(username)
}

module.exports = {
    userExists,
    saveUser,
    findAllUsers,
    getUserByUsername
}
