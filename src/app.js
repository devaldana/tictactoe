const express = require('express')
const { UserController, GameController } = require('./controllers')
const { GlobalErrorHandler } = require('./middlewares')

const app = express()
const port = 3000

app.use(express.json())
app.use(UserController)
app.use(GameController)
app.use(GlobalErrorHandler)

app.listen(port, () => console.log(`Tic Tac Toe service listening on port ${port}`))
