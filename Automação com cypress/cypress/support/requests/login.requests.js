import Factory from '../../fixtures/Factory'
const URL_LOGIN = '/login/'

Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: URL_LOGIN,
      body: {
        email: email,
        password: password
      },
      failOnStatusCode: false
    }).as('Login')
  })

  Cypress.Commands.add('loginCodeTrue', (email, password) => {
    cy.request({
      method: 'POST',
      url: URL_LOGIN,
      body: {
        email: email,
        password: password
      },
      failOnStatusCode: true
    }).as('Login')
  })
  
  Cypress.Commands.add('getToken', (admin) => {
    let user = Factory.newUser()
    user.administrador = `${admin.administrador}`
    
    cy.postUser(user).as('userId')
    cy.login(user.email, user.password).then(res => {
      Cypress.env('token', res.body.authorization)
      return res.body.authorization
    })
  })
  
  