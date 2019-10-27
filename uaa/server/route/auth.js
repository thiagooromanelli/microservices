const router = require('express').Router()
const controller = require('../controller/AuthController')

router.get('/:token', controller.validate)
router.post('/login', controller.login)
router.post('/signup', controller.signup)
router.post('/logout/:token', controller.logout)

module.exports = router
