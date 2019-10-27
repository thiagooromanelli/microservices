const { customErrors: { NotFoundError } } = require('node-commons')
const logger = require('../logger')

const AppController = {

  notFound(request, response, next) {
    const err = new NotFoundError('Not Found')
    next(err)
  },

  handleErrors(err, request, response, next) {
    /* istanbul ignore next */
    const axiosStatus = err.response && err.response.status
    /* istanbul ignore next */
    const status = err.status || axiosStatus || 500
    const message = {
      err: err.message,
      url: request.url,
      status,
    }

    /* istanbul ignore next */
    if (status === 500) {
      message.stack = err.stack
    }

    if (status !== 404) {
      logger.error('AppController', message)
    }

    response
      .status(status)
      .json([
        {
          message: err.message,
          logref: err.logref,
          error_description: err.error_description,
        },
      ])

    next()
  },

}

module.exports = AppController
