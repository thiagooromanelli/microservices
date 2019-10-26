const mongoose = require('mongoose')
const logger = require('../logger')
const mongooseConfig = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}
const {
  user,
  password,
  uri,
  name,
  replicaSet
} = config.database

const connectionStr = `mongodb://${user ? user + ':' + password + '@' : ''}${uri}/${name}${replicaSet ? '?replicaSet=' + replicaSet : ''}`

mongoose.connect(connectionStr, mongooseConfig)
mongoose.connection.on('error', err => {
  logger.error(err)
  mongoose.connect(connectionStr, mongooseConfig)
})
mongoose.connection.once('open', () => logger.debug('connected to mongodb'))
mongoose.connection.on('disconnected', () => {
  logger.warn('MonDB diconnected')
  mongoose.connect(connectionStr, mongooseConfig)
})
