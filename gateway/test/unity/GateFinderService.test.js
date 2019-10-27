const finder = require('../../server/service/GateFinderService')

describe('Unity tests GateFinderService', () => {
  it('Should return right api', () => {
    assert.equal(finder(), false)
    assert.equal(finder('/nevereverland'), null)
    assert.equal(finder('/notifications'), 'notification')
    assert.equal(finder('/available-deliverymen'), 'notification')
    assert.equal(finder('notifications'), 'notification')
    assert.equal(finder('/crates'), 'shipment')
    assert.equal(finder('/packages'), 'shipment')
  })
})