const app = require('express')()
const bp = require('body-parser')
const crates = require('../data/crates.json')
const packages = require('../data/packages.json')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = config.api.settings.replace('localhost:', '')
app.listen(+port, () => console.log('Mock Settings server up on port', port))

app.get('/settings', (_, res) => res.json({
  "auctionOptions": {
     "rangeLimit": 15000,
     "defaultRange": 3000,
     "defaultRangeIncrease": 1000,
     "defaultBonus": 200,
     "bonusLimit": 1000,
     "defaultKmValue": 150
  },
  "primaryPhoneNumber": "11 4142-4344",
  "status": {
     "crates": [
        {
           "value": "PROCESSING",
           "text": "Em processamento"
        },
        {
           "value": "WAITING_PICKUP",
           "text": "Aguardando coleta"
        },
        {
           "value": "DELIVERY_ONGOING",
           "text": "Entrega em andamento"
        },
        {
           "value": "WAITING_RETURN",
           "text": "Aguardando devolução"
        },
        {
           "value": "FINISHED_OK",
           "text": "Concluída com sucesso"
        },
        {
           "value": "FINISHED_NOT_OK",
           "text": "Concluída com pendencias"
        }
     ],
     "packages": [
        {
           "value": "PENDING",
           "text": "Pendente"
        },
        {
           "value": "PENDING_2",
           "text": "Pendente reentrega"
        },
        {
           "value": "PROCESSING",
           "text": "Em processamento"
        },
        {
           "value": "NOT_FOUND",
           "text": "Não encontrado"
        },
        {
           "value": "WAITING_PICKUP",
           "text": "Aguardando coleta"
        },
        {
           "value": "IN_ROUTE",
           "text": "Em rota"
        },
        {
           "value": "DELIVERING",
           "text": "Entregando"
        },
        {
           "value": "DELIVERED",
           "text": "Entrega Realizada"
        },
        {
           "value": "ABSENT_1",
           "text": "Ausente 1a tentativa"
        },
        {
           "value": "ABSENT_2",
           "text": "Ausente 2a tentativa"
        },
        {
           "value": "ABSENT_3",
           "text": "Ausente 3a tentativa"
        },
        {
           "value": "REFUSED",
           "text": "Recusado"
        },
        {
           "value": "ADDRESS_NOT_FOUND",
           "text": "Endereço não localizado"
        },
        {
           "value": "UNKNOWN_RECEIVER",
           "text": "Destinatário desconhecido"
        },
        {
           "value": "MOVED_OUT",
           "text": "Cliente mudou-se"
        },
        {
           "value": "PLACE_CLOSED",
           "text": "Local Fechado"
        },
        {
           "value": "DAMAGED",
           "text": "Avaria"
        },
        {
           "value": "LOST",
           "text": "Extravio"
        },
        {
           "value": "CANCELED",
           "text": "Cancelado"
        }
     ]
  }
}))
