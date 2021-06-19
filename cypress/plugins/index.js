/// <reference types="cypress" />
const injectDevServer = require('@cypress/react/plugins/next')

const codeCoverageTask = require('@cypress/code-coverage/task')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  injectDevServer(on, config)
  codeCoverageTask(on, config)
  config.env.codeCoverageTasksRegistered = true
  return config
}
