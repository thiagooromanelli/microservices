const TermSchema = require('../schema/TermSchema')
const mongoose = require('mongoose')

const TermRepository = mongoose.model('Term', TermSchema)

module.exports = TermRepository
