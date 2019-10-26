const axios = require('axios')
const client = name => {
  const baseOptions = { baseURL: `${config.protocol}://${config.api[name]}` }
  const options = name === 'notification' ?
    { ...baseOptions, headers: { Authorization: config.jwt.notification } } : 
    baseOptions
 
  return axios.create(options)
}
const {
  username,
  password,
  url,
  oauthUri,
  postalServiceUri
} = config.zipCodeSearch

clients = {
  config: client('config'),
  notification: client('notification'),
  quote: client('quote'),
  register: client('register'),
  shipment: client('shipment'),
  tracking: client('tracking'),
  training: client('training'),
  uaa: client('uaa'),
  settings: client('settings'),
  financial: client('financial'),
  zipCodeSearch: {
    client: axios.create({ baseURL: url }),
    oauth: () => clients.zipCodeSearch.client.post(oauthUri, null, { auth: { username, password }, params: { grant_type: 'client_credentials' } }),
    search: (postalCode, access_token) => clients.zipCodeSearch.client.get(postalServiceUri, { params: { postalCode, access_token } })
  }
}

module.exports = clients
