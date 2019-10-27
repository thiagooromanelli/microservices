global.config = require('courier-config').loadConfig('register', process.env.NODE_ENV)
const app = require('./server/app')
const debug = require('debug')('courier:listen')
const logger = require('./server/logger')

const port = app.get('port')

app.listen(port, () => {
  debug('server is up')
  logger.info('Server is up on port', port)
})
