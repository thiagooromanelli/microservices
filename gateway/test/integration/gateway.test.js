require('../mock-servers')

describe('Tests gateway', () => {
    let token

    before(() => token = jwt.sign({ userId: '5d863765be5b5e1fc7a4649c' }, config.jwt.secret))

  it('Should return 404', () => request.get('/test')
    .set('Authorization', token)
    .expect(404))

  it('Should be ok', () => request.get('/packages')
    .set('Authorization', token)
    .expect(200))

  it('Should return 404 trying to delete', () => request.delete('/packages/123456789123456789')
    .set('Authorization', token)
    .expect(404))

  it('Should return req.text on deletion', () => request.delete('/packages/123456789abcdef')
    .set('Authorization', token)
    .expect(200)
    .then(res => assert(res.text, 'OK')))

  it('Should skip authorizer and return 400', () => request.post('/login')
    .send({})
    .expect(400))
  
  it('Should skip authorizer and return 401', () => request.post('/login')
    .send({
      mobile: '11998890099'
    })
    .expect(401))

  it('Should skip authorizer login', () => request.post('/login')
    .send({
      email: 'test@test.com',
      password: 'q1w2e3r4'
    })
    .expect(200)
    .then(res => {
      assert(res.body)
      assert.equal(res.body.user, 'TEST')
      assert.equal(typeof res.body.token, 'string')
    }))

  it('Should return 401 for invalid token', () => request.post('/users')
    .set('authorization', 'asdadq#@@E23453egdss-s}SDFDFsdfSDfsSdfsdf')
    .expect(401))

  it('Should return 401 for invalid secret on token', () => request.post('/stores')
    .set('authorizaTIOn', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEyMzIxMjExMjMxMnF3ZXdhc2Rhc2Rxd2Vxd2UifSwiaWF0IjoxNTY2ODY4MzM1LCJleHAiOjQ3MjI2MjgzMzV9.hQuX2aP7wlrp1S19qTGrxso5Y_CdvjyQSkxdSOxJuTg')
    .send({
      data: 'asdasdasd',
      ass: 'asdasdasqweq3323sdf'
    })
    .expect(401))

  it('Should return 401 for expired token', () => request.post('/users')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEyMzIxMjExMjMxMnF3ZXdhc2Rhc2Rxd2Vxd2UifSwiaWF0IjoxNTY2ODY5MDI4LCJleHAiOjE1NjY4NjkwMjl9.vg49SYGmSzNSWcGVL2LHHAkXrz9xr5Lqbe0rj8Cyq0o')
    .send({
      name: 'Name',
      email: 'email@provider.com'
    })
    .expect(401))

  it('Should skip authorizer to get settings', () => request.get('/settiings')
    .then(res => {
      assert(res.body)
      assert.equal(res.body instanceof Object, true)
    }))
})