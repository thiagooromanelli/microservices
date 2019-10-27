const config = require('courier-config').loadConfig('uaa', 'test')
global.config = config
const app = require('../server/app')
const assert = require('assert')
const nock = require('nock')
const request = require('supertest')(app)

global.assert = assert
global.nock = nock
global.request = request
