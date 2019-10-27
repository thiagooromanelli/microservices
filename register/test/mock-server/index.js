const app = require('express')()
const bp = require('body-parser')
const debug = require('debug')('courier:listen')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.uaa.replace('localhost:', '')
app.listen(+port, () => debug('UAA mock Server up and running on port', port))

app.post('/signup', (request, response) => {
  const body = request.body

  body.telephone = (body.telephone) ? body.telephone : {}

  if (!(body.telephone.number && body.telephone.type === 'mobile'))
    return response.status(400).json("Mobile required")

  if (typeof request.body.permission !== 'object')
    return response.status(400).json("Permission must be an Object")

  if (body.email)
    body.email = privateFn.validateEmail(body.email)
  return model.create({
    userId: body.userId,
    email: body.email,
    telephone: body.telephone,
    permission: request.body.permission,
    createdAt: new Date,
    lastLogin: new Date,
  }).then(res => {
    console.log(1, res)
    res = JSON.parse(JSON.stringify(res))
    res.token = privateFn.createJwt(body)

    return response.status(200).json(res)
  }).catch(err => {
    console.log(2, err)
    return response.status(400).json(err)
  })
})