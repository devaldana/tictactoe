const gamesCollection = new Map()

function saveGame(room, game) {
    gamesCollection.set(room, game)
}

module.exports = {
    saveGame
}
