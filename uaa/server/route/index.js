const router = require('express').Router()

router.use(require('./devops'))
router.use('/', require('./auth'))

module.exports = router
