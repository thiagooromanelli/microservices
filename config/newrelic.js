/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: ['courier-config-dev'],
  agent_enabled: false,
  license_key: '3159eea5922c12814989d1e7df3e0eaf9d8a40c7',
  apdex_t: 4,
  logging: {
    level: 'error'
  },
  error_collector: {
    enabled: true,
    ignore_status_codes: [301,302,404,409,410,422]
  }
}
