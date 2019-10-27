const defaultData = require('./default')
const { qa, prod } = defaultData

const service = 'gateway'

const data = {
  test: {
    splunk: {},
    path: '',
    endpoint: 'localhost',
    port: 8000,
    zipCodeSearch: {
      username: 'imex',
      password: 'tqX4an5K5bqUWsnz',
      url: 'https://api.belezanaweb.com.br',
      oauthUri: '/uaa/oauth/token',
      postalServiceUri: '/postal-service/addresses'
    }
  },
  qa: {
    splunk: {
      ...qa.splunk,
      port: 5431,
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    port: 3002,
    zipCodeSearch: {
      username: 'imex',
      password: 'tqX4an5K5bqUWsnz',
      url: 'https://api.belezanaweb.com.br',
      oauthUri: '/uaa/oauth/token',
      postalServiceUri: '/postal-service/addresses'
    }
  },
  prod: {
    splunk: {
      ...prod.splunk,
      port: 5432,
    },
    path: '',
    endpoint: `${service}.courier.k8sprod.io`,
    port: 3002,
    zipCodeSearch: {
      username: 'imex',
      password: 'tqX4an5K5bqUWsnz',
      url: 'https://api.belezanaweb.com.br',
      oauthUri: '/uaa/oauth/token',
      postalServiceUri: '/postal-service/addresses'
    }
  }
}

const { endpoint, port, path } = data.test
defaultData.test.api[service] = `${endpoint}:${port}${path}`

module.exports = data
