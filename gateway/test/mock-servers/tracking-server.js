const app = require('express')()
const bp = require('body-parser')
const crates = require('../data/crates.json')
const packages = require('../data/packages.json')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.tracking.replace('localhost:', '')
app.listen(+port, () => console.log('Mock Tracking server up on port', port))

app.post('/auctions', (_, res) => res.status(200).json(res.body))

app.delete('/packages/:id',  (req, res) => {
  if (req.params.id === '123456789abcdef') {
    return res.sendStatus(200)
  }

  res.sendStatus(404)
})