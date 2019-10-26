const router = require('express').Router()
const { health: { DevopsController } } = require('node-commons')

router.get('/info', DevopsController.info)
router.get('/health', DevopsController.health(Promise.resolve(true)))

module.exports = router
