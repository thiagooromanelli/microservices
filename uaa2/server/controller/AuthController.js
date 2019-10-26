const debug = require('debug')('courier:controller:auth')
const model = require('../repository/AuthRepository')
const jwt = require('jsonwebtoken')
const RegisterService = require('../service/RegisterService')
const SettingsService = require('../service/SettingsService')
const bcrypt = require('bcrypt')

const AuthController = {

  signup(request, response, next) {
    const body = request.body

    body.telephone = (body.telephone) ? body.telephone : {}

    if (!(body.telephone.number && body.telephone.type === 'mobile'))
      return response.status(400).json("Mobile required")

    if (typeof request.body.permission !== 'object')
      return response.status(400).json("Permission must be an Object")

    if (body.email)
      body.email = privateFn.validateEmail(body.email)

    return model.create(request.body).then(res => {
      res = JSON.parse(JSON.stringify(res))
      res.token = privateFn.createJwt({ userId: body.userId })

      return response.status(200).json(res)
    }).catch(err => {
      return response.status(400).json(err)
    })
  },

  validate(request, response, next) {
    const validation = privateFn.validateJwt(request.params.token)
    response.status(validation ? 200 : 401).json(!!validation)
  },

  login(request, response, next) {
    if (!privateFn.validateEmail(request.body.email) && !request.body.telephone)
      return response.status(400).json("Login method required or mallformed")

    request.body.email = request.body.email ? request.body.email.trim() : ""
    request.body.telephone = request.body.telephone ? request.body.telephone : {}

    const filter = {
      $or: [
        { email: request.body.email },
        {
          $and: [
            { "telephone.areaCode": request.body.telephone.areaCode, },
            { "telephone.number": request.body.telephone.number, },
          ]
        },
      ]
    }

    let combinedData = {}
    let uaaData = {}
    return model.findOne(filter).then(res => {
      if (!res)
        throw "User Not found"

      return res.toObject()
    }).then(data => {
      if (request.body.password)
        if (!privateFn.compareHash(request.body.password, data.password))
          throw "Wrong password"

      return data
    }).then(data => {
      uaaData = data
      model.findOneAndUpdate({ _id: uaaData._id }, { lastLogin: Date.now })

      return RegisterService.users.byId(uaaData.userId)
    }).then(registerData => {
      registerData.token = privateFn.createJwt({ userId: registerData._id })

      delete uaaData._id
      delete uaaData.email
      delete uaaData.mobile
      delete uaaData.password

      return Object.assign(registerData, uaaData)
    }).then(res => {
      combinedData = res
      return SettingsService.get()
    }).then(settings => response.json({
      givenName: combinedData.givenName,
      familyName: combinedData.familyName,
      permission: combinedData.permission,
      _id: combinedData.userId,
      picture: combinedData.picture,
      settings,
      token: combinedData.token,
    })).catch(err => {
      const UnauthorizedMessages = ['User Not found', 'Wrong password']
      if (UnauthorizedMessages.includes(err))
        response.status(401).send(err)

      next(err)
    })
  },

  logout(request, response, next) {
    return response.status(200).json("ok")
    // About JWT expiration
    // https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens/23089839#23089839
  },

}

const privateFn = {
  validatePassword(password) {
    const psw = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})").test(password)

    return psw ? password : false
  },

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validated = re.test(String(email).toLowerCase())

    return validated ? email : false
  },

  createJwt(data) {
    return jwt.sign({ data: data }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  },

  validateJwt(token) {
    return jwt.verify(token, config.jwt.secret, (err, decoded) => decoded ? decoded : false)
  },

  compareHash(password, hash) {
    return bcrypt.compareSync(password, hash)
  },

  createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  getSettings() {
    return SettingsService
  }
}

module.exports = AuthController
