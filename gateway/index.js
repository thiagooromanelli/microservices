global.config = require('courier-config').loadConfig('gateway', process.env.NODE_ENV)
const app = require('./server/app')
const debug = require('debug')('courier:listen')
const port = app.get('port')
const logger = require('./server/logger')

app.listen(port, () => {
  debug('Gateway server is up on port', port)
  logger.info('Server is up on port', port)
})
