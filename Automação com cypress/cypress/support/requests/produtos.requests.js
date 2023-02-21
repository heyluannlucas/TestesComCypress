const URL_PRODUTOS = '/produtos/'

Cypress.Commands.add('getAllProducts', () => {
    cy.request({
      method: 'GET',
      url: URL_PRODUTOS
    })
  })
  
  Cypress.Commands.add('getProductById', id => {
    cy.request({
      method: 'GET',
      url: URL_PRODUTOS+id,
      failOnStatusCode: false
    })
  })
  
  Cypress.Commands.add('postProduct', (token, produto) => {
    cy.request({
      method: 'POST',
      url: URL_PRODUTOS,
      headers: { Authorization: token },
      body: produto,
      failOnStatusCode: false
    }).as('product')
  })
  
  Cypress.Commands.add('deleteProduct', (token, id) => {
    cy.request({
      method: 'DELETE',
      url: URL_PRODUTOS+id,
      headers: { Authorization: token },
      failOnStatusCode: false
    })
  })
  
  Cypress.Commands.add('putProduct', (token, id, novo) => {
    cy.request({
      method: 'PUT',
      url: URL_PRODUTOS+id,
      body: novo,
      headers: { Authorization: token },
      failOnStatusCode: false
    })
  })
  