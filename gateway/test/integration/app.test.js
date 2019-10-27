describe('app routes', () => {
  it('GET /not-found should return 401', () => {
    const expected = [{logref: 'UNAUTHORIZED', message: 'unauthorized'}]

    return request
      .get('/')
      .expect(401)
      .then(result => assert.deepEqual(result.body, expected))
  })

})
