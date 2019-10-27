require('newrelic')

const app = require('express')()
const controller = require('./controller/AppController')
const bodyParser = require('body-parser')
const cors = require('cors')

app.set('port', process.env.PORT || config.port)

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())
app.use(require('./route'))
app.use(controller.notFound)
app.use(controller.handleErrors)

module.exports = app
