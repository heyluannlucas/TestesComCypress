/// <reference types="cypress" />

const faker = require('faker-br')
import Factory from '../../fixtures/Factory'
import ServerestResponses from '../../services/responsesValidation.services'

describe('CT-RP 008 - EXCLUSÃO DE DADOS EM /PRODUTOS',() => {

  let tokenAdmin ,token ,admin ,user ,productId ,produto = Factory.newProduct()
 
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

  beforeEach('Criar produto', () => {
    cy.postProduct(tokenAdmin, produto).then(produto => {
      productId = produto.body._id
    })
  })

  afterEach('Deletar Produto', () => {
    cy.deleteProduct(tokenAdmin, productId)
  })

  it('Deve deletar um produto', { tags: '@adm' }, () => {
    cy.deleteProduct(tokenAdmin, productId).should(res => {
      ServerestResponses.deleted(res)
      cy.contractValidation(res, 'DELETE/produtos', 200)
    })
  })

  it('Não deve deletar produto em carrinho', () => {

    cy.postCart(tokenAdmin, productId)

    cy.deleteProduct(tokenAdmin, productId).should(res => {
      ServerestResponses.deleteProductNotAllowed(res)
      cy.contractValidation(res, 'DELETE/produtos', 400)

      cy.buyItOrNot(tokenAdmin, 'cancelar-compra')
    })
  })

  it('Não deve deletar produto com token inválido', () => {
    cy.deleteProduct(faker.random.uuid(), productId).should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'DELETE/produtos', 401)
    })
  })

  it('Não deve deletar produto com token vazio', () => {
    cy.deleteProduct('', productId).should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'DELETE/produtos', 401)
    })
  })

  it('Não deve deletar produto com usuário padrão', () => {
    cy.deleteProduct(token, productId).should(res => {
      ServerestResponses.notAdm(res)
      cy.contractValidation(res, 'DELETE/produtos', 403)
    })
  })
})