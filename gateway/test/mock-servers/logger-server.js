const app = require('express')()
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.logger.replace('localhost:', '')
app.listen(+port, () => console.log('Mock Logger server up on port', port))

app.all('*', (_, res) => res.sendStatus(200))