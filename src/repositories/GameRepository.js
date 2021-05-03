const gamesCollection = new Map()

function saveGame(room, game) {
    gamesCollection.set(room, game)
}

function findByRoom(room) {
    return gamesCollection.get(room)
}

module.exports = {
    saveGame,
    findByRoom
}
