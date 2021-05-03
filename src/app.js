const express = require('express')
const { UserController } = require('./controllers')

const app = express()
const port = 3000

app.use(express.json())
app.use(UserController)
app.listen(port, () => console.log(`Task Manager service listening on port ${port}`))
