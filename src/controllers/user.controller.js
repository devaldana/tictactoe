const { Router } = require('express')
const { UserService } = require('./../services')
const userController = Router();

const users = new Map()

userController.post("/users", (req, res) => {
    const username = req.body.username // what if body arrive empty? InvalidParamsException
    const newUserPublicProfile = UserService.create(username)
    res.send(newUserPublicProfile)
})

userController.get("/users", (req, res) => {
    res.send([...users.values()].map(user => user.getPublicProfile()))
})

userController.get("/users/:username", (req, res) => {
    const username = req.params.username;
    if (!users.has(username)) {
        return res.status(404).send()
    }
    res.send(users.get(username).getPublicProfile())
})

userController.get("/users/:username/games", (req, res) => {
    const username = req.params.username;
    const status = req.query.status
    if (!users.has(username)) {
        return res.status(404).send()
    }
    const user = users.get(username)
    if(!status) return res.send(user.getPlayedGames().map(game => game.getPublicRepresentation()))
    res.send(user.getPlayedGames().filter(game => game.status === status).map(game => game.getPublicRepresentation()))
})

module.exports = userController
