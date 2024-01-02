/// <reference types="cypress" />
import ms from 'smtp-tester'; // Assuming smtp-tester has ES6 support

/**
 * @type {Cypress.PluginConfig}
 */
const pluginConfig: Cypress.PluginConfig = (on, config) => {
  // starts the SMTP server at localhost:7777
  const port = 7777;
  const mailServer = ms.init(port);
  console.log(`mail server at port ${port}`);

  // process all emails
  mailServer.bind((addr, id, email) => {
    console.log('--- email ---');
    console.log(addr, id, email);
  });
};

export default pluginConfig;
