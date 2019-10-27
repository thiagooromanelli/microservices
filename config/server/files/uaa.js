const defaultData = require('./default')
const { qa, prod } = defaultData

const service = 'uaa'

const data = {
  test: {
    splunk: {},
    database: {
      uri: '127.0.0.1:27017',
      name: 'test',
      user: '',
      password: '',
      replicaSet: '',
    },
    path: '',
    endpoint: 'localhost',
    port: 8880,
  },
  qa: {
    splunk: {
      ...qa.splunk,
      port: 5425,
    },
    database: {
      uri: 'mongo1-courier.common.qa.blzlocal.com.br,mongo2-courier.common.qa.blzlocal.com.br:27017',
      name: service,
      user: service,
      password: 'T4bF383wKy88P8SSfWHV',
      replicaSet: 'rscourier',
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    port: 3010,
  },
  prod: {
    splunk: {
      ...prod.splunk,
      port: 5426,
    },
    database: {
      uri: 'mongo1.courier.common.prod.blzlocal.com.br,mongo2.courier.common.prod.blzlocal.com.br:27017',
      name: service,
      user: service,
      password: '0XPxG3RO4nEyp7n',
      replicaSet: 'rs-courier-common',
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    port: 3010,
  },
}

const { endpoint, port, path } = data.test
defaultData.test.api[service] = `${endpoint}:${port}${path}`

module.exports = data
