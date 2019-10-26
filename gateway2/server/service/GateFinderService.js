module.exports = uri => {
  if (typeof uri !== 'string') {
    return false
  }

  uri = uri.split('/')[1] || uri

  if (!uri) {
    return false
  }

  const library = {
    auctions: 'tracking',
    'available-deliverymen': 'notification',
    crates: 'shipment',
    financial: 'financial',
    login: 'uaa',
    notifications: 'notification',
    packages: 'shipment',
    quotes: 'quote',
    settings: 'settings',
    signup: 'register',
    users: 'register',
    terms: 'register'
  }

  return library[uri]
}
