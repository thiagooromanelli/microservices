const userFixtures = require('../data/users')
const model = require('../../server/repository/UserRepository')
const mongoose = require('mongoose')
require('../mock-server')

describe('Users routes', () => {
  let ids
  let queryString

  before(() => model.create(userFixtures.users)
      .then(users => users.filter(u => u.role === 'deliveryman'))
      .then(users => users.map(u => u._id))
      .then(validIds => {
        ids = validIds
        queryString = ids.map(id => `ids[]=${id}`).join('&')
      }))

  after(() => mongoose.connection.db.dropDatabase())

  it('GET endpoint /users should list all', () => request
    .get('/users')
    .expect(200)
    .then(result => assert(result.body.total === 3)))

  it('POST endpoint /users should fail to create new user with same CNH', () => request.post('/users')
    .send(userFixtures.user)
    .expect(500))

  it('GET endpoint /users?ids[]=123123&ids[]=1231321', () => request.get(`/users?${queryString}`)
    .expect(200)
    .then(res => {
      assert.equal(res.body.total, 2)
      assert.equal(res.body.items[0]._id, ids[0])
    }))
  
  it('GET endpoint /users/:id', () => request.get(`/users/${ids[0]}`)
    .expect(200)
    .then(res => {
      assert(res.body)
      assert.equal(res.body._id, ids[0])
    }))

  it('GET endpoint /users?id=id', () => request.get(`/users?id=${ids[0]}`)
    .expect(200)
    .then(res => {
      assert.equal(res.body.total, 1)
      assert.equal(res.body.items[0]._id, ids[0])
    }))
})
