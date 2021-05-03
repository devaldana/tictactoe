const { Router } = require('express')
const { InvalidParamsException } = require('../exceptions')
const { UserService } = require('../services')
const userController = Router()

userController.post('/users', (req, res) => {
    const username = validateUsername(req.body.username)
    res.send(UserService.create(username))
})

userController.get('/users', (req, res) => {
    res.send(UserService.findAll())
})

userController.get('/users/:username', (req, res) => {
    const username = validateUsername(req.params.username)
    res.send(UserService.findByUsername(username))
})

userController.get('/users/:username/games', (req, res) => {
    const username = validateUsername(req.params.username)
    res.send(UserService.findUserGames(username, req.query.status))
})

function validateUsername(username) {
    if(username === undefined || username.trim() === '')
        throw new InvalidParamsException('A valid username must be provided')
    return username
}

module.exports = userController
