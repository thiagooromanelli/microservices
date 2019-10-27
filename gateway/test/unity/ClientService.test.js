const clientService  = require('../../server/service/ClientService')
const access_token = 'c9dd68fb-0ecf-4827-8f72-19049771f865'
const {
  username,
  password,
  url,
  oauthUri,
  postalServiceUri
} = config.zipCodeSearch

describe('Tests ClientService', () => {
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
  })

  it('Should get notification client with headers', () => {
    const client = clientService.notification
    assert(client.defaults.headers.Authorization)
  })

  it('Should get a client without authorization headers', () => {
    const client = clientService.shipment
    assert.equal(client.defaults.headers.Authorization, undefined)
  })

  it('Should get zipCodeSerach client token', () => {
    const client = clientService.zipCodeSearch

    return client.oauth()
      .then(res => {
        assert(res.data)
        assert(res.data.access_token)
        assert.equal(res.data.token_type, 'bearer')
      })
  })

  it('Should get zipCodeSerach client address', () => {
    const client = clientService.zipCodeSearch

    return client.search('03438030', access_token)
      .then(res => {
        assert(res.data)
        assert.equal(res.data.streetAddress, 'Rua Maria Vieira Ribeiro')
      })
  })
})
