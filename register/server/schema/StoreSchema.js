const { Schema } = require('mongoose')
const addressSchema = require('./addressSchema')

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  address: addressSchema,
  active: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  deletedAt: Date
})

module.exports = StoreSchema