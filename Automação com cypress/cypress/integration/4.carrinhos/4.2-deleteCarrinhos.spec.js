/// <reference types="cypress" />

import Factory from '../../fixtures/Factory'
import ServerestResponses from '../../services/responsesValidation.services'

describe('CT-RC 010 -  EXCLUSÃO DE DADOS EM /CARRINHOS', { tags: 'CT-RC 010' }, () => {

  let tokenAdmin, productId, normalToken, admin, user, produto = Factory.newProduct()

  beforeEach('Dados necessários', () => {

    cy.getToken({ administrador: true }).then(token => {
      tokenAdmin = token

      cy.get('@userId').then(adm => {
        admin = adm.body._id
      })

      cy.postProduct(tokenAdmin, produto).then(produto => {
        productId = produto.body._id
      })
    })

    cy.getToken({ administrador: false }).then(userToken => {
      normalToken = userToken

      cy.get('@userId').then(normalUser => {
        user = normalUser.body._id
      })

      cy.postCart(normalToken, productId)
    })
  })

  afterEach('Deletar dados', () => {
    cy.deleteProduct(tokenAdmin, productId)
    cy.deleteUser(admin)
    cy.deleteUser(user)
  })

  it('Deve concluir a compra e excluir carrinho', { tags: '@user' }, () => {
    cy.buyItOrNot(normalToken, 'concluir-compra').should(res => {
      ServerestResponses.deleted(res)
      cy.contractValidation(res, 'DELETE/carrinhos', 200)
    })
  })

  it('Deve excluir carrinho e retornar produtos para estoque', { tags: '@user' }, () => {
    cy.buyItOrNot(normalToken, 'cancelar-compra').should(res => {
      ServerestResponses.deleteAndReturnProducts(res)
      cy.contractValidation(res, 'DELETE/carrinhos', 200)
    })
  })

  it('Não deve deletar carrinho sem token de acesso', { tags: '@user' }, () => {
    cy.buyItOrNot('', 'cancelar-compra').should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'DELETE/carrinhos', 401)
    })
  })
})