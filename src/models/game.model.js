const Board = require('./board.model')

class Game {
    constructor(playerX, playerO) {
        this.playerX = playerX
        this.playerO = playerO
        this.playerXMarkedCells = []
        this.playerOMarkedCells = []
        this.winner = undefined
        playerX.registerGame(this)
        playerO.registerGame(this)
        this.board = new Board()
        this.status = 'PLAYING'
    }

    /**
     * Mark the given cell in the board with X.
     * @param cellKey key of the cell to be marked.
     * @returns {boolean} true if the user wins marking the given cell, false otherwise.
     */
    playerXMarkCell(cellKey) {
        return this.markCell(cellKey, this.playerX, 'X', this.playerXMarkedCells)
    }

    /**
     * Mark the given cell in the board with O.
     * @param cellKey key of the cell to be marked.
     * @returns {boolean} true if the user wins marking the given cell, false otherwise.
     */
    playerOMarkCell(cellKey) {
        return this.markCell(cellKey, this.playerO, 'O', this.playerOMarkedCells)
    }

    markCell(cellKey, player, symbol, markedCells) {
        // Mark the cell in the board with the given symbol.
        const allCellsMarked = this.board.markCell(cellKey, symbol)

        // Add the cell to the player marked cells set.
        markedCells.push(cellKey)

        // Keeps the player marked cells ordered alphabetically.
        markedCells.sort()

        // 3 is the minimum number of cells required to be marked to win.
        if(markedCells.length < 3) return false

        // If the user has 3 or more marked cells, check if there are one winner vector.
        if (this.checkIfWins(markedCells)) {
            this.winner = player
            this.status = 'FINISHED'
            return true
        }

        if (allCellsMarked) {
            this.status = 'TIED'
        }

        return false
    }

    /**
     * Check if the marked cells are in the possible winner vectors.
     * Let's say markedCells = [A, D, E, F, H], then it starts taking the first 3
     * letters, 'ADE', and check it against the 8 possibles winner vectors listed in board.model.js
     * Then, isWinnerVector('ADE') returns false. Then, it takes the next 3 letters, 'DEF' and check it.
     * This time, isWinnerVector('DEF') returns true, it means that 'DEF' is a winner vector.
     * @param markedCells
     * @returns {boolean}
     */
    checkIfWins(markedCells) {
        for (let i = 0, n = 3; n <= markedCells.length; i++, n++) {
            const vector = markedCells.slice(i, n).join('')
            if(this.board.isWinnerVector(vector)) return true
        }
        return false
    }

    /**
     * Evaluates if the game has finished. The game is considered finished if is in FINISHED
     * or TIED status.
     * @returns {boolean} true if the game is not in PLAYING status, false otherwise.
     */
    isFinished() {
        return this.status !== 'PLAYING'
    }

    getPublicRepresentation() {
        return {
            playerX: this.playerX.getPublicProfile(),
            playerO: this.playerO.getPublicProfile(),
            playerXMarkedCells: this.playerXMarkedCells,
            playerOMarkedCells: this.playerOMarkedCells,
            winner: this.winner.getPublicProfile(),
            status: this.status,
            board: this.board.getPublicRepresentation()
        }
    }
}

module.exports = Game
