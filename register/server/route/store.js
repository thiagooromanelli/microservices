const router = require('express').Router()
const controller = require('../controller/StoreController')

router.get('/', controller.list)
router.get('/:code', controller.byCode)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router
