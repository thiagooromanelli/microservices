const app = require('./files/app')
const backoffice = require('./files/backoffice')
const defaultMod = require('./files/default')
const financial = require('./files/financial')
const gateway = require('./files/gateway')
const logger = require('./files/logger')
const notification = require('./files/notification')
const quote = require('./files/quote')
const register = require('./files/register')
const romaneio = require('./files/romaneio')
const shipment = require('./files/shipment')
const tracking = require('./files/tracking')
const training = require('./files/training')
const settings = require('./files/settings')
const uaa = require('./files/uaa')

const projects = {
  app,
  backoffice,
  defaultMod,
  financial,
  gateway,
  logger,
  notification,
  quote,
  register,
  romaneio,
  shipment,
  tracking,
  training,
  settings,
  uaa,
}

module.exports = (appName, env) => {
  if (!appName) throw new Error(`the [appName] argument is required`)
  env = (env === 'prod' || env === 'test') ? env : 'qa'

  return { ...defaultMod[env], ...projects[appName][env]}
}
