const debug = require('debug')('courier:service:register')
const axios = require('axios')
const url = `${config.protocol}://${config.api.register}`

const RegisterService = {
  users: {
    list() {
      return axios.get(`${url}/users`).then(res => res.data)
    },

    byId(id) {
      return axios.get(`${url}/users/${id}`).then(res => res.data)
    },

    create(data) {
      return axios.post(`${url}/users`, data).then(res => res.data)
    },

    update(id, data) {
      return axios.put(`${url}/users/${id}`, data).then(res => res.data)
    },
  }
}

module.exports = RegisterService
