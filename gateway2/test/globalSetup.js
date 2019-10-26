const config = require('courier-config').loadConfig('gateway', 'test')
global.config = config

const app = require('../server/app')
const assert = require('assert')
const nock = require('nock')
const request = require('supertest')(app)
const jwt = require('jsonwebtoken')

global.assert = assert
global.nock = nock
global.request = request
global.jwt = jwt
