const router = require('express').Router()
const controller = require('../controller/TermController')

router.get('/', controller.list)
router.get('/latest', controller.latest)
router.get('/:version', controller.byVersion)
router.post('/', controller.create)
router.put('/:version', controller.update)

module.exports = router
