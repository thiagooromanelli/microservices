const router = require('express').Router()
const controller = require('../controller/GatewayController')

router.use(require('./devops'))
router.post('/login', controller.postParser)
router.post('/signup', controller.postParser)
router.post('/quotes', controller.postParser)
router.get('/settings', controller.getParser)
router.use(require('./gateway'))

module.exports = router
