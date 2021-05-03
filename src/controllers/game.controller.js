const { Router } = require('express')
const { InvalidParamsException } = require('../exceptions')
const { GameService } = require('../services')
const gameController = Router();

gameController.post("/games", (req, res) => {
    const username = validateUsername(req.body.username)
    res.send(GameService.create(username))
})

function validateUsername(username) {
    if(username === undefined || username.trim() === '')
        throw new InvalidParamsException('A valid username must be provided')
    return username
}

module.exports = gameController
