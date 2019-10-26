const { logger } = require('node-commons')
const { splunk } = config

logger.init({ splunk })

module.exports = logger
