const zipCodeSearchTokenService = require('../../server/service/zipCodeSearchTokenService')
const access_token = 'c9dd68fb-0ecf-4827-8f72-19049771f865'
const jwt = require('jsonwebtoken')
const authorization = jwt.sign({ userId: '5d863765be5b5e1fc7a4649c' }, config.jwt.secret)
const {
  username,
  password,
  url,
  oauthUri,
  postalServiceUri
} = config.zipCodeSearch

describe('Endpoint GET /zip-codes tests', () => {

  before(() => {
    nock(url)
      .post(oauthUri)
      .basicAuth({ user: username, pass: password })
      .query({ grant_type: 'client_credentials' })
      .reply(200, {
        access_token,
        token_type: 'bearer',
        expires_in: 913016,
        scope: 'read write',
        guest: false,
        organization: '1'
      })

    nock(url)
      .get(postalServiceUri)
      .query({
        postalCode: '03438030',
        access_token,
      })
      .reply(200, {
        streetAddress: 'Rua Maria Vieira Ribeiro',
        district: 'Vila Carrão',
        postalCode: '03438030',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        localityCode: 3550308,
        links: [
            {
                rel: 'self',
                href: 'https://api.belezanaweb.com.br/postal-service/addresses?postalCode=03438030'
            }
        ]
      })

    nock(url)
      .get(postalServiceUri)
      .query({
        postalCode: '05050000',
        access_token,
      })
      .reply(200, {
        streetAddress: 'Rua Monteiro de Melo',
        district: 'Lapa',
        postalCode: '05050000',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        localityCode: 3550308,
        links: [
            {
                rel: 'self',
                href: 'https://api.belezanaweb.com.br/postal-service/addresses?postalCode=05050000'
            }
        ]
    })
  })

  after(() => zipCodeSearchTokenService.data = {
    token: '',
    expires: Date.now()
  })

  it('Should search zip code with no token data set', () => {
    assert(!zipCodeSearchTokenService.isValid())
    assert.equal(zipCodeSearchTokenService.getToken(), '')

    return request.get('/zip-codes?zipCode=03438-030')
      .set({ authorization })
      .expect(200)
      .then(res => {
        assert(res.body)
        assert.equal(res.body.streetAddress, 'Rua Maria Vieira Ribeiro')
        assert.equal(res.body.localityCode, 3550308)
        assert(zipCodeSearchTokenService.isValid())
        assert.equal(zipCodeSearchTokenService.getToken(), access_token)

        return request.get('/zip-codes?zipCode=05050000')
          .set({ authorization })
          .expect(200)
          .then(res => {
            assert(res.body)
            assert.equal(res.body.streetAddress, 'Rua Monteiro de Melo')
            assert.equal(res.body.localityCode, 3550308)
          })
      })
  })
})
