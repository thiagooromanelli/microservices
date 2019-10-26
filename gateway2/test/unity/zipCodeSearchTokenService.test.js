const zipCodeSearchTokenService = require('../../server/service/zipCodeSearchTokenService')

describe('Tests zipCodeSearchTokenService', () => {
  after(() => zipCodeSearchTokenService.data = {
    token: '',
    expires: Date.now()
  })

  it('Should have no token', () => {
    assert.equal(zipCodeSearchTokenService.getToken(), '')
  })

  it('Should set a token', () => {
    zipCodeSearchTokenService.setData('c9dd68fb-0ecf-4827-8f72-19049771f865', 999999)

    assert(zipCodeSearchTokenService.isValid())
    assert.equal(zipCodeSearchTokenService.getToken(), 'c9dd68fb-0ecf-4827-8f72-19049771f865')
  })
})
