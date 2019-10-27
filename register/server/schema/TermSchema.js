const { Schema } = require('mongoose')

const TermSchema = new Schema({
  content: String,
  version: String,
  publishedAt: Date,
  status: String, //TODO definir função do delete
})

module.exports = TermSchema
