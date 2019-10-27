describe('DevOps routes', () => {
  it('endpoint /health should return with success', () => {
    return request
      .get('/health')
      .expect(200)
      .then(result => assert.equal(result.body.status, 'UP'))
  })

  it('endpoint /info should return with success', () => {
    return request
      .get('/info')
      .expect(200)
      .then(result => assert(result.body))
  })

})
