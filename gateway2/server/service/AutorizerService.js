const { customErrors: { UnauthorizedError } } = require('node-commons')
const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))

module.exports = (request, response, next) => {
  const token = request.headers.authorization

  if (!token) {
    return next(new UnauthorizedError('unauthorized'))
  }

  jwt.verifyAsync(token, config.jwt.secret)
    .then(() => next())
    .catch(e => {
      const unauthorizeds = {
        'jwt malformed': true,
        'invalid signature': true
      }

      if (unauthorizeds[e.message]) {
        return next(new UnauthorizedError('unauthorized'))
      }

      next(e)
    })
}
