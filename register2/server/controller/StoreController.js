const model = require('../repository/StoreRepository')

const StoreController = {
  create(request, response, next) {
    const store = {
      code,
      name,
      latitude,
      longitude,
    } = request.body

    store.address = {
      postalCode,
      address,
      number,
      complement,
      state,
      city,
      type,
      notes,
      ...invalid
    } = request.body.address

    delete store.address.invalid

    if (!store.code
      || !store.latitude
      || !store.longitude
      || !store.address
      || !store.address.address
      || !store.address.postalCode) {
        return response.sendStatus(400)
      }

    model.create(store)
      .then(newStore => {
        //TODO update
        response.json(newStore)
      })
      .catch(next)
  },
  list(request, response, next) {
    model.find({ deletedAt: null })
    .then(list => response.json(list))
    .catch(next)
  },
  byCode(request, response, next) {
    model.findOne({ code: request.params.code })
    .then(store => {
        if (!store) {
          return response.sendStatus(404)
        }

        response.json(store)
      })
      .catch(next)
  },
  update(request, response, next) {
    model.updateOne({ _id: request.params.id, deletedAt: null }, request.body)
      .then(store => {
        // TODO update stores service on notification
        response.json(store)
      })
      .catch(next)
  },
  delete(request, response, next) {
    model.updateOne({ _id: request.params.id }, { deletedAt: new Date() })
      .then(() => {
        // TODO update stores service on notification
        response.sendStatus()
      })
      .catch(next)
  }
}

module.exports = StoreController