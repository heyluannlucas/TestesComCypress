/// <reference types="cypress" />

const faker = require('faker-br')
import Factory from '../../fixtures/Factory'
import ServerestResponses from '../../services/responsesValidation.services'

describe('CT-RP 006 - INSERÇÃO DE DADOS EM /PRODUTOS',() => {

  let tokenAdmin, token ,admin, user, produto = Factory.newProduct()
  
  before('Dados necessários', () => {

    cy.getToken({ administrador: true }).then(token => {
      tokenAdmin = token

      cy.get('@userId').then(admId => {
        admin = admId.body._id
      })
    })

    cy.getToken({ administrador: false }).then(res => {
      token = res

      cy.get('@userId').then(userId => {
        user = userId.body._id
      })
    })
  })

  after('Deletar dados', () => {
    cy.deleteUser(admin)
    cy.deleteUser(user)
  })

  it('Deve cadastrar um produto com sucesso', { tags: '@adm' }, () => {
    cy.postProduct(tokenAdmin, produto).should(res => {
      ServerestResponses.successful(res)
      cy.contractValidation(res, 'POST/produtos', 201)
    })
    cy.get('@product').then(produto => {
      cy.deleteProduct(tokenAdmin, produto.body._id)
    })
  })

  it('Não deve cadastrar produto com nome existente', () => {

    cy.postProduct(tokenAdmin, produto)

    cy.postProduct(tokenAdmin, produto).should(res => {
      ServerestResponses.productAlreadyExist(res)
      cy.contractValidation(res, 'POST/produtos', 400)
    })
    cy.get('@product').then(produto => {
      cy.deleteProduct(tokenAdmin, produto.body._id)
    })
  })

  it('Não deve cadastrar produto com token adm inválido', () => {
    cy.postProduct(faker.random.uuid, produto).should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'POST/produtos', 401)
    })
  })

  it('Não deve cadastrar com token adm vazio', () => {
    cy.postProduct('', produto).should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'POST/produtos', 401)
    })
  })

  it('Não deve cadastrar produto sem usuário adm', () => {
    cy.postProduct(token, produto).should(res => {
      ServerestResponses.notAdm(res)
      cy.contractValidation(res, 'POST/produtos', 403)
    })
  })
})

