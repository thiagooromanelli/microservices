const debug = require('debug')('courier:controller:user')
const model = require('../repository/UserRepository')
const UaaService = require('../service/UaaService')
const { CrateService } = require('../service/ClientService')
const { Types } = require('mongoose')

const UserController = {

  find(request, response, next) {
    const defaultLimit = 50
    let and = []
    let option = []
    let limit = limitValue(parseInt(request.query.limit || defaultLimit, 10))
    let page = typeof parseInt(request.query.page) === 'number' ? request.query.page : 1

    Object.keys(request.query).forEach(item => {
      switch (item) {
        case 'limit':
        case 'page':
        case 'skip':
          break
        case 'orderAsc':
          option.push({ $sort: { [request.query[item]]: 1 } })
          break
        case 'orderDesc':
          option.push({ $sort: { [request.query[item]]: -1 } })
          break
        case 'telephone':
          and.push({ $match: { 'telephone.number': { $regex: request.query.telephone, $options: 'i' } } })
          break
        case 'areaCode':
          and.push({ $match: { 'telephone.areaCode': request.query.areaCode.toString() } })
          break
        case 'createdStart':
          and.push({ $match: { createdAt: { $gte: new Date(`${request.query[item]} 00:00:00`) } } })
          break
        case 'createdEnd':
          and.push({ $match: { createdAt: { $lte: new Date(`${request.query[item]} 23:59:59`) } } })
          break
        case 'id':
        case '_id':
          and.push({ $match: { _id: Types.ObjectId(request.query[item]) } })
          break
        case 'ids':
          and.push({ $match: { $or: request.query[item].map(i => ({ _id: Types.ObjectId(i) })) } })
          break
        case 'name':
          let name = request.query.name.split(' ')

          and.push({
            $match: {
              $or: [
                { givenName: { $in: name } },
                { familyName: { $in: name } },
              ]
            }
          })
          break
        case 'address':
          and.push({
            $match: {
              $or: [
                { 'address.cep': { $regex: request.query.address, $options: 'i' } },
                { 'address.address': { $regex: request.query.address, $options: 'i' } },
                { 'address.number': { $regex: request.query.address, $options: 'i' } },
                { 'address.complement': { $regex: request.query.address, $options: 'i' } },
                { 'address.state': { $regex: request.query.address, $options: 'i' } },
                { 'address.city': { $regex: request.query.address, $options: 'i' } },
                { 'address.type': { $regex: request.query.address, $options: 'i' } },
              ]
            }
          })
          break
        case 'moto':
          and.push({
            $match: {
              $or: [
                { 'moto.brand': { $regex: request.query.moto, $options: 'i' } },
                { 'moto.year': { $regex: request.query.moto, $options: 'i' } },
                { 'moto.model': { $regex: request.query.moto, $options: 'i' } },
                { 'moto.renavam': { $regex: request.query.moto, $options: 'i' } },
                { 'moto.licenseDate': { $regex: request.query.moto, $options: 'i' } },
                { 'moto.licensePlate': { $regex: request.query.moto, $options: 'i' } },
              ]
            }
          })
          break
        case 'bank':
          and.push({
            $match: {
              $or: [
                { 'bankAccount.number': { $regex: request.query.bank, $options: 'i' } },
                { 'bankAccount.name': { $regex: request.query.bank, $options: 'i' } },
                { 'bankAccount.agency': { $regex: request.query.bank, $options: 'i' } },
                { 'bankAccount.account': { $regex: request.query.bank, $options: 'i' } },
                { 'bankAccount.accountCpf': { $regex: request.query.bank, $options: 'i' } },
                { 'bankAccount.accountName': { $regex: request.query.bank, $options: 'i' } },
              ]
            }
          })
          break
        default:
          and.push({ [item]: { $regex: request.query[item], $options: 'i' } })
          break
      }
    })

    option.push({ $skip: (page - 1) * limit || 0 })
    option.push({ $limit: limit })

    let pipeline = [...and, ...option]

    debug(JSON.stringify(pipeline))

    return Promise.all([
      model.aggregate(pipeline),
      model.aggregate([...and, { $count: 'total' }])
    ])
      .then(res => {
        return response.send({
          items: res[0],
          total: res[1].length === 0 ? 0 : res[1][0].total,
          page: request.query.page || 1,
          size: res[0].length
        })
      })
      .catch(next)
  },

  list(request, response, next) {
    model.find({ deletedAt: null })
      .then(res => {
        response.json(res)
      })
      .catch(next)
  },

  me(request, response, next) {
    let id = request.params.id
    let user = {}

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      response.status(403).send('Invalid ID format')

    model.findById(id)
      .then(res => {
        user = res.toObject()

        return CrateService.get({ deliveryman: res._id.toString(), status: 'DELIVERY_ONGOING' })
      })
      .then(crate => response.json({ ...user, crate: crate.items[0] ? crate.items[0]._id : null }))
      .catch(next)
  },

  byId(request, response, next) {
    let id = request.params.id

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      response.status(403).send('Invalid ID format')

    model.findById(id)
      .then(res => response.json(res))
      .catch(next)
  },

  create(request, response, next) {
    if (!request.body.email && !request.body.mobile)
      return response.status(400).send('Email or mobile required')

    let user

    model.create(request.body)
      .then(created => {
        user = created
        let userData = {
          ...created.toObject(),
          userId: created._id,
          password: request.body.password,
          telephone: request.body.telephones.find(tel => tel.type === 'mobile'),
          permission: request.body.permission,
          email: request.body.email,
          mobile: request.body.mobile
        }
        delete userData._id

        return UaaService.signup(userData)
      })
      .then(res => response.json({ user, token: res.token }))
      .catch(e => {
        const err = (e.response ? (e.response.data || e.response) : e)

        if (user) {
          return model.deleteOne({ _id: user._id })
            .then(() => {
              debug('================ rollback ================', err)
              next(err)
            })
            .catch(next)
        }

        return Promise.reject(err)
      })
      .catch(next)
  },

  update(request, response, next) {
    model.updateOne({ _id: request.params.id }, request.body)
      .then(res => {
        response.json(res)
      })
      .catch(next)
  },

  delete(request, response, next) {
    model.updateOne({ _id: request.params.id }, { deletedAt: new Date(), status: 'inativo' })
      .then(res => {
        response.json(res)
      })
      .catch(next)
  },

  defineMoto(request, response, next) {
    const userId = request.params.id
    const moto = request.params.moto

    model.findById(userId).then(res => {
      res = res.toObject()

      if (res.moto.filter(i => i.active === true && i.licensePlate == moto).length === 1) {
        response.status(200).send('Moto ok')
      } else {
        res.moto.map(i => {
          i.active = (i.licensePlate === moto) ? true : false
        })

        model.findOneAndUpdate({ _id: userId }, { moto: res.moto }).then(ok => {
          response.status(200).send('Moto Updated')
        }).catch(err => {
          response.status(200).send('thats an error')
        })
      }
    })
  },

}

module.exports = UserController

function limitValue(value) {
  if (typeof value !== 'number' || isNaN(value))
    return 50

  return value > 500 ? 500 : value
}
