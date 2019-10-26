const app = require('express')()
const bp = require('body-parser')
const crates = require('../data/crates.json')
const packages = require('../data/packages.json')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.notification.replace('localhost:', '')
app.listen(+port, () => console.log('Mock Notification server up on port', port))

app.post('/notifications', (_, res) => res.status(200).json(res.body))