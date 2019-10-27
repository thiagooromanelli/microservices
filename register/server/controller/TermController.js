const debug = require('debug')('courier:controller:term')
const model = require('../repository/TermRepository')

const TermController = {

  list(request, response, next) {
    model.find().then(res => {
      response.status(200).send(res)
    }).catch(next)
  },

  latest(request, response, next) {
    model.findOne({}, {}, { sort: { _id: -1 } }).then(res => {
      response.status(200).send(res)
    }).catch(next)
  },

  byId(request, response, next) {
    model.findById(request.params.id).then(res => {
      response.status(200).send(res)
    }).catch(next)
  },

  byVersion(request, response, next) {
    model.findOne({ version: request.params.version }).then(res => {
      response.status(200).send(res)
    }).catch(next)
  },

  create(request, response, next) {
    model.create(request.body).then((res) => {
      response.status(200).send(res)
    }).catch(next)
  },

  update(request, response, next) {
    model.updateOne({ version: request.params.version }, request.body).then((res) => {
      response.status(200).send(res)
    }).catch(next)
  },

  delete(request, response, next) {
    model.updateOne({ version: request.params.version }, { status: "inativo" }).then((res) => {
      response.status(200).send(res)
    }).catch(next)
  }

}

module.exports = TermController
