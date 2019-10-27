const StoreSchema = require('../schema/StoreSchema')
const mongoose = require('mongoose')
const StoreRepository = mongoose.model('Store', StoreSchema)

module.exports = StoreRepository