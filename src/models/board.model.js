const { InvalidCellException, CellAlreadyMarkedException } = require('../exceptions')

/**
 * Default value for board's cells initialization.
 * @type {string}
 */
const DEFAULT_CELL_VALUE = '_'

/** Each cell in the board is represented by a letter:
*
*       A | B | C
*      ---|---|---
*       D | E | F
*      ---|---|---
*       G | H | I
*
*   There are only 8 possibles winner vectors (aka cells concatenations):
*   1. ABC
*   2. DEF
*   3. GHI
*   4. ADG
*   5. BEH
*   6. CFI
*   7. AEI
*   8. CEG
*   Note that the letters in each vector is alphabetically ordered,
*   this has an special purpose for later validations.
*
* @type {Set}
 */
const WINNER_VECTORS = new Set(['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'])

/**
 * Class that represents a cell in the board. The board is build using a 3x3 matrix,
 * each cell in the matrix has a coordinate represented by i and j: (i, j). i is for
 * the index in the row and j is for the index in the column.
 */
class Cell {
    constructor(i, j) {
        this.i = i
        this.j = j
    }
}

/**
 * Map in which the key is the letter that represents that cell. This will help to locate a
 * cell in the matrix given its letter of representation (aka key here).
 * @type {{A: Cell, B: Cell, C: Cell, D: Cell, E: Cell, F: Cell, G: Cell, H: Cell, I: Cell}}
 */
const CELLS = {
    A: new Cell(0, 0), B: new Cell(0, 1), C: new Cell(0, 2),
    D: new Cell(1, 0), E: new Cell(1, 1), F: new Cell(1, 2),
    G: new Cell(2, 0), H: new Cell(2, 1), I: new Cell(2, 2)
}

/**
 * Class that represents a board.
 */
class Board {

    constructor() {
        this.availableCells = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
        this.matrix = Array(3).fill(DEFAULT_CELL_VALUE).map(() => Array(3).fill(DEFAULT_CELL_VALUE))
    }

    /**
     * Mark the cell with the given cell and put the sent symbol.
     * @param cellKey key of the cell to be marked.
     * @param symbol to put on the cell.
     * @returns {boolean} true if all the cells are marked, false otherwise.
     */
    markCell(cellKey, symbol) {
        const cell = this.getCellByKey(cellKey)
        if (this.availableCells.has(cellKey)) {
            this.availableCells.delete(cellKey)
            this.matrix[cell.i][cell.j] = symbol
            return this.availableCells.size === 0
        }
        throw new CellAlreadyMarkedException(`Cell with key '${cellKey}' was already marked`)
    }

    isWinnerVector(vector) {
        return WINNER_VECTORS.has(vector)
    }

    getCellByKey(key) {
        const cell = CELLS[key]
        if(cell) return cell
        throw new InvalidCellException(`Cell with key '${key}' is not valid`)
    }

    getPublicRepresentation() {
        return 'First row: ' + this.matrix[0].join(' | ') + ', Second row: ' + this.matrix[1].join(' | ') + ', Third row: ' + this.matrix[2].join(' | ')
    }
}

module.exports = Board
