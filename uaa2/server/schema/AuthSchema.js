const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const validateEmail = email => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const telephoneSchema = new Schema({
  type: String,
  country: {
    type: String,
    trim: true,
  },
  areaCode: {
    type: String,
    trim: true,
  },
  number: {
    trim: true,
    type: String,
    unique: true,
    required: [true, "Número do telefone é obrigatório"],
  },
}, { _id: false })

const AuthSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, "ID do Usuário é obrigatório"],
  },
  email: {
    type: String,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    set: createHash
  },
  telephone: telephoneSchema,
  permission: {
    type: {},
    trim: true,
    required: [true, "É obrigatório definir permissões"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
})

module.exports = AuthSchema
