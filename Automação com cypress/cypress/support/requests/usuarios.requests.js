const URL_USUARIOS = '/usuarios/'

Cypress.Commands.add('getAllUsers', () => {
    cy.request({
      method: 'GET',
      url: URL_USUARIOS
    })
  })
  
  Cypress.Commands.add('getUserById', id => {
    cy.request({
      method: 'GET',
      url: URL_USUARIOS+id
    })
  })
  
  Cypress.Commands.add('postUser', user => {
    cy.request({
      method: 'POST',
      url: URL_USUARIOS,
      body: user,
      failOnStatusCode: false
    }).as('userId')
  })

  Cypress.Commands.add('postUserCodeTrue', user => {
    cy.request({
      method: 'POST',
      url: URL_USUARIOS,
      body: user,
      failOnStatusCode: true
    }).as('userId')
  })
  
  Cypress.Commands.add('deleteUser', id => {
    cy.request({
      method: 'DELETE',
      url: URL_USUARIOS+id,
      failOnStatusCode: false
    })
  })
  
  Cypress.Commands.add('putUser', (id, novo) => {
    cy.request({

      method: 'PUT',
      url: URL_USUARIOS+id,
      body: novo,
      failOnStatusCode: false
    })
  })
  