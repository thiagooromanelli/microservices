const { Schema } = require('mongoose')
const addressSchema = require('./addressSchema')

const validateEmail = email => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const telephoneSchema = Schema({
    type: {
      type: String,
      enum: ['home', 'work', 'mobile'],
      default: 'mobile',
    },
    country: {
      type: String,
      default: '55',
    },
    number: {
      type: String,
      unique: true,
      required: true,
    },
    branch: String,
}, { _id: false })

const motorcycleSchema = Schema({
  brand: String,
  year: String,
  model: String,
  renavam: Number,
  licenseDate: Date,
  licensePlate: String,
  active: {
    type: Boolean,
    default: false,
  },
}, { _id: false })

const termsSchema = Schema({
  idTerm: String,
  acceptedAt: Date,
  version: String,
}, { _id: false })

const rgSchema = Schema({
  number: {
    type: String,
    unique: true,
    required: true,
  },
  issuedAt: Date,
  issuedBy: String,
  state: String,
}, { _id: false })

const bankSchemma = Schema({
  type: String,
  number: Number,
  name: String,
  agency: String,
  account: String,
  accountCpf: String,
  accountName: String,
}, { _id: false })

driversLicenseSchema = Schema({
  number: {
    type: Number,
    unique: true,
    sparse: true,
  },
  type: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'],
    default: 'A',
  },
  expiresAt: Date,
}, { _id: false })

const UserSchema = new Schema({
  email: {
    type: String,
    validate: validateEmail,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ['admin', 'backoffice', 'deliveryman'],
    default: 'deliveryman',
  },
  picture: String,
  givenName: {
    trim: true,
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  familyName: {
    trim: true,
    type: String,
    required: [true, 'Sobrenome é obrigatório'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatório'],
  },
  addresses: [addressSchema],
  telephones: [telephoneSchema],
  cpf: {
    index: true,
    unique: true,
    required: [true, 'CPF é obrigatório'],
    type: String,
  },
  cnpj: String,
  rg: {
    type: rgSchema,
    unique: true,
    sparse: true,
  },
  cnh: driversLicenseSchema,
  status: {
    type: String,
    enum: [
      'active',
      'inactive',
      'pending',
    ],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
  motorcycle: [motorcycleSchema],
  motofreteLicense: String,
  motofreteExpiration: Date,
  condumotoLicense: String,
  condumotoExpiration: Date,
  crateSize: String,
  terms: termsSchema,
  bankAccount: bankSchemma,
  training: Date,
})

module.exports = UserSchema
