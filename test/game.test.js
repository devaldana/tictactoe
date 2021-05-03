const { Game, User } = require('../src/models')

const game = new Game(new User('David', 'X'), new User('Caro', 'O'))

// David plays
const winAfterMarkE = game.playerXMarkCell('E')
// Caro plays
const winAfterMarkG = game.playerOMarkCell('G')
// David plays
const winAfterMarkA = game.playerXMarkCell('A')
// Caro plays
const winAfterMarkI = game.playerOMarkCell('I')
// David plays
const winAfterMarkH = game.playerXMarkCell('H')
// Caro plays
const winAfterMarkB = game.playerOMarkCell('B')
// David plays
const winAfterMarkD = game.playerXMarkCell('D')
// Caro plays
const winAfterMarkC = game.playerOMarkCell('C')
// David plays and should win
const winAfterMarkF = game.playerXMarkCell('F')

test('All marks before winner mark should be false', () => {
    expect(winAfterMarkE ||
           winAfterMarkG ||
           winAfterMarkA ||
           winAfterMarkI ||
           winAfterMarkH ||
           winAfterMarkB ||
           winAfterMarkD ||
           winAfterMarkC
    ).toBe(false);
});

test('Should win after marking F', () => {
    expect(winAfterMarkF).toBe(true);
});

test('Game should be in FINISHED status', () => {
    expect(game.status).toBe('FINISHED');
});

test('Check playerX in game', () => {
    expect(game.playerX.username).toBe('David');
    expect(game.playerX.symbol).toBe('X');
    expect(game.playerX.games.length).toBe(1);
    expect(game.playerX.getInProgressGames().length).toBe(0);
    expect(game.playerX.getPlayedGames().length).toBe(1);
    expect(game.playerX.getWonGames().length).toBe(1);
    expect(game.playerX.getTiedGames().length).toBe(0);
    expect(game.playerX.getPercentageOfSuccess()).toBe(100);
    expect(game.playerXMarkedCells.join('')).toBe('ADEFH');
});

test('Check playerO in game', () => {
    expect(game.playerO.username).toBe('Caro');
    expect(game.playerO.symbol).toBe('O');
    expect(game.playerO.games.length).toBe(1);
    expect(game.playerO.getInProgressGames().length).toBe(0);
    expect(game.playerO.getPlayedGames().length).toBe(1);
    expect(game.playerO.getWonGames().length).toBe(0);
    expect(game.playerO.getTiedGames().length).toBe(0);
    expect(game.playerO.getPercentageOfSuccess()).toBe(0);
    expect(game.playerOMarkedCells.join('')).toBe('BCGI');
});

test('Check game winner', () => {
    expect(game.winner.username).toBe('David');
});

test('Check board available cells', () => {
    expect(game.board.availableCells.size).toBe(0);
});

test('Check board symbols row by row', () => {
    // The board, at the end, should looks like the next:
    //   X | O | O
    //  ---|---|---
    //   X | X | X
    //  ---|---|---
    //   O | X | O
    expect(game.board.matrix[0].join('')).toBe('XOO');
    expect(game.board.matrix[1].join('')).toBe('XXX');
    expect(game.board.matrix[2].join('')).toBe('OXO');
});
