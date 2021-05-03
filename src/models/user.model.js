class User {
    constructor(username) {
        this.username = username
        this.games = []
        this.createdAt = new Date()
    }

    registerGame(game) {
        this.games.push(game)
    }

    getPlayedGames(){
        return this.games
    }

    getInProgressGames(){
        return this.games.filter(game => game.status === 'PLAYING')
    }

    getWonGames(){
        return this.games.filter(game => game.winner === this)
    }

    getTiedGames(){
        return this.games.filter(game => game.status === 'TIED')
    }

    getPercentageOfSuccess() {
        const totalWonGames = this.getWonGames().length
        const totalPlayedGames = this.getPlayedGames().length
        if(totalPlayedGames === 0) return 0
        return Math.round(totalWonGames / totalPlayedGames * 100)
    }

    getPublicProfile() {
        return {
            createdAt: this.createdAt,
            username: this.username,
            totalPlayedGames: this.getPlayedGames().length,
            totalInProgressGames: this.getInProgressGames().length,
            totalWonGames: this.getWonGames().length,
            totalTiedGames: this.getTiedGames().length,
            percentageOfSuccess: `${this.getPercentageOfSuccess()}%`
        }
    }
}

module.exports = User
