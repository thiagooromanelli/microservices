const now = new Date()

module.exports = {
  store: {
    code: 'BLZ03',
    name: 'armazembeleza',
    latitude: -23.5512917,
    longitude: -46.8119402,
    address: {
      postalCode: '06172-004',
      address: 'Av. José Barbosa de Siqueira',
      number: '12',
      neighborhood: 'Padroeira',
      city: 'Osasco',
      state: 'SP'
    },
  createdAt: now
  },
  stores: [{
    code: 'Beleza Na Web',
    name: 'belezanaweb',
    latitude: -23.5542146,
    longitude: -46.7429688,
    address: {
      postalCode: '05033-000',
      address: 'Av. Jaguaré',
      number: '818',
      neighborhood: 'Jaguaré',
      city: 'São Paulo',
      state: 'SP'
    },
  createdAt: now
  }, {
    code: 'BLZ02',
    name: 'lojabeleza',
    latitude: -23.6072218,
    longitude: -46.6707367,
    address: {
      postalCode: '04523-015',
      address: 'Alameda Jauaperi', 
      number: 1314,
      neighborhood: 'Moema',
      city: 'São Paulo',
      state: 'SP'
    },
    createdAt: now
  }]
}
