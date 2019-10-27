require('newrelic')

const app = require('express')()
const controller = require('./controller/AppController')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./config/mongoose')

app.set('port', process.env.PORT || config.port)

app.use(bodyParser.json())
app.use(cors())
app.use(require('./route'))
app.use(controller.notFound)
app.use(controller.handleErrors)

module.exports = app
