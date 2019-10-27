const router = require('express').Router()
const controller = require('../controller/UserController')

router.get('/me/:id', controller.me)
router.get('/:id', controller.byId)
router.get('/', controller.find)

router.post('/', controller.create)

router.put('/:id', controller.update)

router.patch('/moto/:id/:moto', controller.defineMoto)

router.delete('/:id', controller.delete)

module.exports = router
