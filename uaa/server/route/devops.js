const router = require('express').Router()
const { health: { DevopsController } } = require('node-commons')

router.get('/info', DevopsController.info)
router.get('/health', (request, response) => {
  (require('mongoose').connection.readyState !== 1) ?
    response.sendStatus(400) : response.sendStatus(200)
})
module.exports = router
