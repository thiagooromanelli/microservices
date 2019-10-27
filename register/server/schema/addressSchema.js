const { Schema } = require('mongoose')
const addressSchema = Schema({
  postalCode: String,
  address: String,
  number: String,
  complement: String,
  state: String,
  city: String,
  neighborhood: String,
  type: {
    type: String,
    enum: ['home', 'work', 'delivery', 'billing'],
    default: 'home'
  },
  notes: String,
  country: String,
}, { _id: false })

module.exports = addressSchema
