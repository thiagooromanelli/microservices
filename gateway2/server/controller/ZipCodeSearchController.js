const { zipCodeSearch } = require('../service/ClientService')
const zipCodeSearchTokenService = require('../service/zipCodeSearchTokenService')

const ZipCodeSearchController = {
  search(request, response, next) {
    const isValid = zipCodeSearchTokenService.isValid()
    let {
      zipCode
    } = request.query
    let token = zipCodeSearchTokenService.getToken()
    zipCode = zipCode.replace('-', '')

    const requestMethod = isValid => isValid ?
      zipCodeSearch.search(zipCode, token) : zipCodeSearch.oauth()
        .then(res => {
          zipCodeSearchTokenService.setData(res.data.access_token, res.data.expires_in)
          return zipCodeSearch.search(zipCode, res.data.access_token)
        })

    requestMethod(isValid)
      .then(res => response.json(res.data))
      .catch(e => {
        if (e.response && e.response.status === 401) {
          zipCodeSearchTokenService.setDate('', Date.now() - 1000)

          return ZipCodeSearchController.search(request, response, next)
        }

        next(e)
      })
  }

}

module.exports = ZipCodeSearchController
