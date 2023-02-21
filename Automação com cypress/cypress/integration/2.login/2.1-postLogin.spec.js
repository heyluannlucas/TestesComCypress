/// <reference types="cypress" />


import Factory from '../../fixtures/Factory'
import ServerestResponses from '../../services/responsesValidation.services'

describe('CT-RL 005 - INSERÇÃO DE DADOS EM /LOGIN',() => {

  const user = require('../../fixtures/users')
  let newUser = Factory.newUser()

  beforeEach('Dados necessários', () => {
    cy.postUser(newUser)
  })

  afterEach('Deletar dados', () => {
    cy.get('@userId').then(id => {
      cy.deleteUser(id.body._id)
    })
  })

  it('Deve logar com sucesso', { tags: ['@adm', '@user'] }, () => {
    cy.login(newUser.email, newUser.password).should(res => {
      ServerestResponses.successfulLogin(res)
      cy.contractValidation(res, 'POST/login', 200)
    })
  })

  it('Não deve logar com senha e/ou email inválido', () => {
    cy.login(user.incorrect.email, user.incorrect.password).should(res => {
      ServerestResponses.invalidLoginInfos(res)
      cy.contractValidation(res, 'POST/login', 400)
    })
  })

  it('Não deve logar com email inválido', () => {
    cy.login(user.invalid.email, newUser.password).should(res => {
      ServerestResponses.invalidLoginInfos(res)
      cy.contractValidation(res, 'POST/login', 400)
    })
  })

  it('Não deve logar com email em branco', () => {
    cy.loginCodeTrue(user.null.email, newUser.password)
  })

  it('Não deve logar com senha em branco', () => {
    cy.loginCodeTrue(newUser.email, user.null.password)
  })
})
