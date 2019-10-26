const client = require('../service/ClientService')
const gateFinder = require('../service/GateFinderService')
const jwt = require('jsonwebtoken')

module.exports = {
  getMe(request, response, next) {
    const url = gateFinder('users')
    const userId = jwt.decode(request.headers.authorization).data.userId

    client[url].get(`/users/me/${userId}`)
      .then(res => res.data ? response.json(res.data) : response.sendStatus(res.status))
      .catch(next)
  },
  deleteParser(request, response, next) {
    const url = gateFinder(request.baseUrl || request.path)

    if (!url || !request.params.id) {
      return response.sendStatus(404)
    }

    client[url].delete(request.baseUrl || request.path)
      .then(res => res.data ? response.json(res.data) : response.sendStatus(res.status))
      .catch(next)
  },
  getParser(request, response, next) {
    const url = gateFinder(request.baseUrl || request.path)

    if (!url) {
      return response.sendStatus(404)
    }

    client[url].get(request.baseUrl || request.path, { params: request.query })
      .then(res => res.data ? response.json(res.data) : response.sendStatus(res.status))
      .catch(next)
  },
  patchParser(request, response, next) {
    const url = gateFinder(request.baseUrl || request.path)
    if (!url) {
      return response.sendStatus(404)
    }

    client[url].patch(request.baseUrl || request.path, request.body || {})
      .then(res => res.data ? response.json(res.data) : response.sendStatus(res.status))
      .catch(next)
  },
  postParser(request, response, next) {
    const url = gateFinder(request.baseUrl || request.path)
    if (!url) {
      return response.sendStatus(404)
    }

    client[url].post(request.baseUrl || request.path, request.body)
      .then(res => res.data ? response.json(res.data) : response.sendStatus(res.status))
      .catch(next)
  },
  putParser(request, response, next) {
    const url = gateFinder(request.baseUrl || request.path)

    if (!url || !request.params.id) {
      return response.sendStatus(404)
    }

    client[url].put(request.baseUrl || request.path, request.body)
      .then(res => res.data ? response.json(res.data) : response.sendStatus(res.status))
      .catch(next)
  },
}
