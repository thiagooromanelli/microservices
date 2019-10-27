describe('Auth routes', () => {
  it.skip('endpoint / should list all', () => {
    return request
      .get('/users')
      .expect(200)
      .then(result => assert(result.body))
  })

})
