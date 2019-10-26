const defaultData = require('./default')
const { qa, prod } = defaultData

const service = 'notification'

const data = {
  test: {
    port: 8889,
    splunk: {},
    endpoint: 'localhost',
    database: {
      uri: '127.0.0.1:27017',
      name: 'test',
      user: '',
      password: '',
      replicaSet: ''
    },
    path: '',
    defaultRange: 5000,
    maps: {
      url: 'https://maps.googleapis.com/maps/api',
      outputFormat: 'json',
      distanceMatrixKey: 'AIzaSyDL8uTESiyQzJn5G8llIa3OHp8RNEBIe6A',
      directionsKey: 'AIzaSyCOs46POBl89stXeAcAdsWzQLIcGzjAq1U',
    }
  },
  qa: {
    port: 3003,
    splunk: {
      ...qa.splunk,
      port: 5437,
    },
    database: {
      uri: 'mongo1-courier.common.qa.blzlocal.com.br,mongo2-courier.common.qa.blzlocal.com.br:27017',
      name: service,
      user: service,
      password: 'sB4D4YXagMeBeBPUxjXD',
      replicaSet: 'rscourier',
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    defaultRange: 5000,
    maps: {
      url: 'https://maps.googleapis.com/maps/api',
      outputFormat: 'json',
      distanceMatrixKey: 'AIzaSyDL8uTESiyQzJn5G8llIa3OHp8RNEBIe6A',
      directionsKey: 'AIzaSyCOs46POBl89stXeAcAdsWzQLIcGzjAq1U',
    }
  },
  prod: {
    port: 3003,
    splunk: {
      ...prod.splunk,
      port: 5438,
    },
    database: {
      uri: 'mongo1.courier.common.prod.blzlocal.com.br,mongo2.courier.common.prod.blzlocal.com.br:27017',
      name: service,
      user: service,
      password: '20B6qTS8H8YjXFu',
      replicaSet: 'rs-courier-common',
    },
    path: '',
    endpoint: `${service}.courier.k8sqa.io`,
    defaultRange: 5000,
    maps: {
      url: 'https://maps.googleapis.com/maps/api',
      outputFormat: 'json',
      distanceMatrixKey: 'AIzaSyDL8uTESiyQzJn5G8llIa3OHp8RNEBIe6A',
      directionsKey: 'AIzaSyCOs46POBl89stXeAcAdsWzQLIcGzjAq1U',
    },
  },
}

const { endpoint, port, path } = data.test
defaultData.test.api[service] = `${endpoint}:${port}${path}`

module.exports = data
