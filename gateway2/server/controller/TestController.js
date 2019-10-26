const logger = require('../logger')
const client = require('../service/ClientService')
module.exports = (_, response) => {
  let packages

  logger.info('TestController', 'Main scope:')
  client.shipment.get('/packages', {
    params: {
      limit: 3,
      status: ['PENDING', 'PENDING_2'],
      orderAsc: 'zipCode'
    }
  })
    .then(res => {
      if (!res.data.total) {
        throw new Error('NO PENDING PACKAGES')
      }

      logger.info('TestController', 'Get packages:')
      logger.info('Creating crate:')
      packages = res.data.items
      const store = 'Beleza Na Web'

      return client.shipment.post('/crates', {
        store,
        packages: packages.map(pack => pack._id)
      })
    })
    .then(res => {
      logger.info('TestController', 'Creating auction:')
      return client.tracking.post('/auctions', {
        dailyId: res.data.dailyId, 
        crate: res.data._id,
        originStore: res.data.store,
        route: packages.map(p => `${p.address} - ${p.complement ? p.complement + ' - ': ''} ${p.neighborhood}, ${p.city} - ${p.uf}, ${p.zipCode}`)
      })
    })
    .then(res => {
      logger.info('TestController', 'Ended successfully!')
      response.json(res ? res.data : 'OK BUT NO DATA')
    })
    .catch(res => {
      logger.error('TestController', res)
      if (res.message && res.message === 'NO PENDING PACKAGES') {
        return response.status(200).json(res.message)
      }

      response.status(500).json(res.response ? res.response.data : 'ERROR!')
    })
  }
