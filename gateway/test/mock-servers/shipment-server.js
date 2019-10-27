const app = require('express')()
const bp = require('body-parser')
const crates = require('../data/crates.json')
const packages = require('../data/packages.json')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.shipment.replace('localhost:', '')
app.listen(+port, () => console.log('Mock Shipment server up on port', port))

app.get('/packages', (_, res) => res.status(200).json(packages))
app.get('/crates', (_, res) => res.status(200).json(crates))
app.post('/packages', (_, res) => res.status(200).json(res.body))
app.post('/crates', (_, res) => res.status(200).json(res.body))

app.delete('/packages/:id',  (req, res) => {
  if (req.params.id === '123456789abcdef') {
    return res.sendStatus(200)
  }

  res.sendStatus(404)
})