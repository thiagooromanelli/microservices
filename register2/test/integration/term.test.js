const mongoose = require('mongoose')
const model = require('../../server/repository/TermRepository')
const termFixture = require('../data/terms')

describe('Term routes', () => {
  beforeEach(() => model.create(termFixture.terms))

  afterEach(() => model.deleteMany({}))

  before(() => mongoose.connection.db.dropDatabase())

  it('POST endpoint /terms', () => request.post('/terms')
    .send(termFixture.term)
    .expect(200))

  it('GET endpoint /terms', () => request.get('/terms')
    .expect(200)
    .then(res => assert(res.body.length, 2)))
})