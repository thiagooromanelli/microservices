const AuthSchema = require('../schema/AuthSchema')
const mongoose = require('mongoose')

const AuthRepository = mongoose.model('Auth', AuthSchema)

module.exports = AuthRepository
