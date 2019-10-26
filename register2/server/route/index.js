const router = require('express').Router()

router.use(require('./devops'))
router.use('/users', require('./user'))
router.use('/terms', require('./term'))
router.use('/stores', require('./store'))

module.exports = router
  