const storeFixtures = require('../data/stores')
const model = require('../../server/repository/StoreRepository')
const mongoose = require('mongoose')

describe('Store routes', () => {
  beforeEach(() => model.create(storeFixtures.stores))

  afterEach(() => model.deleteMany({}))

  after((() => mongoose.connection.db.dropDatabase()))

  it('POST endpoint /stores', () => request.post('/stores')
    .send(storeFixtures.store)
    .expect(200))

  it('GET endpoint /stores/BLZ02', () => request.get('/stores/BLZ02')
    .expect(200)
    .then(res => assert.equal(res.body.name, 'lojabeleza')))
})