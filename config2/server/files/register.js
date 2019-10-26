const defaultData = require('./default')
const { qa, prod } = defaultData

const service = 'register'

const data = {
  test: {
    splunk: {},
    database: {
      uri: 'localhost:27017',
      name: 'test',
      user: '',
      password: '',
      replicaSet: '',
    },
    path: '',
    endpoint: 'localhost',
    port: 8999,
  },
  qa: {
    splunk: {
      ...qa.splunk,
      port: 5439,
    },
    database: {
      uri: 'mongo1-courier.common.qa.blzlocal.com.br,mongo2-courier.common.qa.blzlocal.com.br:27017',
      name: service,
      user: service,
      password: 'XCe76xKXWcFARz37tVZ5',
      replicaSet: 'rscourier',
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    port: 3005,
  },
  prod: {
    splunk: {
      ...prod.splunk,
      port: 5440,
    },
    database: {
      uri: 'mongo1.courier.common.prod.blzlocal.com.br,mongo2.courier.common.prod.blzlocal.com.br:27017',
      name: service,
      user: service,
      password: '1fxshHzmsE138Nf',
      replicaSet: 'rs-courier-common',
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    port: 3005,
  },
}

const { endpoint, port, path } = data.test
defaultData.test.api[service] = `${endpoint}:${port}${path}`

module.exports = data
