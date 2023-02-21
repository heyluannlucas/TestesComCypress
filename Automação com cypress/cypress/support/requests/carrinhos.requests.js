const URL_CARRINHOS = '/carrinhos/'

Cypress.Commands.add('postCart', (token, id) => {

  let produto = { "produtos": [
    {
      "idProduto": id,
      "quantidade": 1
    }]
}
    cy.request({
      method: 'POST',
      url: URL_CARRINHOS,
      headers: { Authorization: token },
      body: produto,
      failOnStatusCode: false
    })
  })

  Cypress.Commands.add('buyItOrNot', (token, tipo) => {
    cy.request({
      method: 'DELETE',
      url: URL_CARRINHOS+tipo,
      headers: { Authorization: token },
      failOnStatusCode: false
    })
  })

  Cypress.Commands.add('getCarts', () => {
    cy.request({
      method: 'GET',
      url: URL_CARRINHOS,
      failOnStatusCode: false
    })
  })

  Cypress.Commands.add('getCartById', (id) => {
    cy.request({
      method: 'GET',
      url: URL_CARRINHOS+id,
      failOnStatusCode: false
    })
  })
