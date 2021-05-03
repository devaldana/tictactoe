const { Router } = require('express')
const { InvalidParamsException } = require('../exceptions')
const { GameService } = require('../services')
const gameController = Router()

gameController.post('/games/tic-tac-toe/join', (req, res) => {
    const username = validParam('username', req.body.username)
    res.send(GameService.join(username, req.body.room))
})

gameController.post('/games/tic-tac-toe/play', (req, res) => {
    const username = validParam('username', req.body.username)
    const room = validParam('room', req.body.room)
    const cellKey = validParam('cellKey', req.body.cellKey)
    res.send(GameService.play(username, room, cellKey))
})

function validParam(paramName, value) {
    if(value === undefined || value.trim() === '')
        throw new InvalidParamsException(`A valid ${paramName} must be provided`)
    return value
}

module.exports = gameController
