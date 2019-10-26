const debug = require('debug')('courier:register:client-service')
const axios = require('axios')

module.exports = {
  UUAService: {
    client: axios.create({ baseURL: `${config.protocol}://${config.api.uaa}` }),
    signup: data => new Promise((resolve, reject) => {
      client.UUAService.client.post('/signup', data)
        .then(res => {
          if (res.status === 200) {
            return resolve(res.data)
          }

          reject(res.data)
        })
        .catch(e => {
          const error = new Error(e.response.data)
          error.status = e.response.status
          debug(error)

          reject(error)
        })
    }),
  },
  TrackingService: {
    client: axios.create({ baseURL: `${config.protocol}://${config.api.tracking}` }),
    search(data) {
      return this.client.get('/auctions', { params: data || {} }).then(res => res.data)
    }
  },
  SettingsService: {
    client: axios.create({ baseURL: `${config.protocol}://${config.api.settings}` }),
    get(data) {
      return this.client.get('/settings', { params: data || {} }).then(res => res.data)
    },
  },
  CrateService: {
    client: axios.create({ baseURL: `${config.protocol}://${config.api.shipment}` }),
    get(data) {
      return this.client.get('/crates', { params: data || {} }).then(res => res.data)
    },
  }
}
