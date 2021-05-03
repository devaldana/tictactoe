const usersCollection = new Map()

function exists(username) {
    return usersCollection.has(username)
}

function save(user) {
    usersCollection.set(user.username, user)
}

function findAll() {
    return  [...usersCollection.values()]
}

function findByUsername(username) {
    return usersCollection.get(username)
}

module.exports = {
    exists,
    save,
    findAll,
    findByUsername
}
