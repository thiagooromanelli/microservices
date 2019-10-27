const config = require('courier-config').loadConfig('register', 'test')
global.config = config

const app = require('../server/app')
const assert = require('assert')
const nock = require('nock')
const request = require('supertest')(app)
const { expect } = require('chai')
const mongoose = require('mongoose')

global.assert = assert
global.expect = expect
global.nock = nock
global.request = request

/**
 * Avoid drop database on QA enviroment
 */
if (process.env.NODE_ENV !== 'test' || mongoose.connection.name.toLocaleLowerCase() !== 'test') {
  throw new Error('TEST SUIT RUNNING IN WRONG ENVIROMENT OR DATABASE')
}