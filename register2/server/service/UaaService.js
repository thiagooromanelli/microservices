const debug = require('debug')('courier:service:uaa')
const axios = require('axios')
const url = `${config.protocol}://${config.api.uaa}`

const UaaService = {

  signup(data) {
    return axios.post(`${url}/signup`, data).then(res => res.data)
  },

  login(data) {
    return axios.post(`${url}/login`, data).then(res => res.data)
  },

  test() {
    return axios.get(`${url}`).then(res => res.data)
  },

  validate(data) {
    return axios.get(`${url}/${data}`).then(res => res.data)
  },

  changePassword(data) {
    return axios.post(`${url}/changePassword`, data).then(res => res.data)
  },

  logout(data) {
    return axios.post(`${url}/logout`, data).then(res => res.data)
  },

}

module.exports = UaaService
