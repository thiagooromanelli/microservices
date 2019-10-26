const UserSchema = require('../schema/UserSchema')
const mongoose = require('mongoose')

const UserRepository = mongoose.model('User', UserSchema)

module.exports = UserRepository
