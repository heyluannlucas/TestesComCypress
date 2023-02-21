/// <reference types="cypress" />
// ***********************************************************
const fs = require('fs-extra');
const path = require('path');

function buscarArquivoDeConfig(arquivo) {
  const caminhoDoArquivo = path.resolve('.', 'cypress', 'config', `${arquivo}.json`)
  return fs.readJson(caminhoDoArquivo)
}
module.exports = (on, config) => {
  const arquivo = config.env.configFile || 'dev'
  return buscarArquivoDeConfig(arquivo)
}
// cypress/plugins/index.js
module.exports = (on, config) => {
  // optional: register cypress-grep plugin code
  // https://github.com/cypress-io/cypress-grep
  require('cypress-grep/src/plugin')(config)
  // make sure to return the config object
  // as it might have been modified by the plugin
  return config
}