const app = require('express')()
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.uaa.replace('localhost:', '')
app.listen(+port, () => console.log('Mock UAA server up on port', port))

app.post('/login', (req, res) => {
  if (!req.body.mobile && !(req.body.email || req.body.password)) {
    return res.sendStatus(400)
  }

  if (req.body.email === 'test@test.com' && req.body.password === 'q1w2e3r4') {
    return res.json({
      user: 'TEST',
      token: 'asdasd0977a0s7d0a9s7d0a7@#@#$=()_()$$%#$534-3453sdffdb4ij6756523rrg54g42g5'
    })
  }

  res.sendStatus(401)
})