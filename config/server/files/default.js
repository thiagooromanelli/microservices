module.exports = {
  test: {
    api: {},
    jwt: {
      secret: "aaa",
      expiresIn: "7d",
    },
    protocol: 'http',
  },
  qa: {
    api: {
      financial: 'financial.courier.k8sqa.io',
      gateway: 'gateway.courier.k8sqa.io',
      logger: 'logger.courier.k8sqa.io',
      notification: 'notification.courier.k8sqa.io',
      quote: 'quote.courier.k8sqa.io',
      register: 'register.courier.k8sqa.io',
      settings: 'settings.courier.k8sqa.io',
      shipment: 'shipment.courier.k8sqa.io',
      tracking: 'tracking.courier.k8sqa.io',
      training: 'training.courier.k8sqa.io',
      uaa: 'uaa.courier.k8sqa.io',
    },
    jwt: {
      secret: "bbb",
      expiresIn: "7d",
    },
    protocol: 'https',
  },
  prod: {
    api: {
      financial: 'financial.courier.k8sprod.io',
      gateway: 'api.imediataexpress.com.br',
      logger: 'logger.courier.k8sprod.io',
      notification: 'wss.imediataexpress.com.br',
      quote: 'quote.courier.k8sprod.io',
      register: 'register.courier.k8sprod.io',
      settings: 'settings.courier.k8sprod.io',
      shipment: 'shipment.courier.k8sprod.io',
      tracking: 'tracking.courier.k8sprod.io',
      training: 'training.courier.k8sprod.io',
      uaa: 'uaa.courier.k8sprod.io',
    },
    jwt: {
      secret: "ccc",
      expiresIn: "7d",
    },
    protocol: 'https',
  },

}
