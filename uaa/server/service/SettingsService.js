const debug = require('debug')('courier:service:settings')
const axios = require('axios')
const url = `${config.protocol}://${config.api.settings}/settings`

const RegisterService = {
  get() {
    return axios.get(`${url}/`).then(res => res.data)
  },
}

module.exports = RegisterService
