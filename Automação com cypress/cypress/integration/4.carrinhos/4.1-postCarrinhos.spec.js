/// <reference types="cypress" />

import faker from 'faker-br'
import Factory from '../../fixtures/Factory'
import ServerestResponses from '../../services/responsesValidation.services'

describe('CT-RC 009 - INSERÇÃO DE DADOS EM /CARRINHOS', { tags: 'CT-RC 009' }, () => {

  let tokenAdmin, productId, token, user, admin, produto = Factory.newProduct()

  before('Dados necessários', () => {

    cy.getToken({ administrador: true }).then(token => {
      tokenAdmin = token

      cy.get('@userId').then(user => {
        admin = user.body._id
      })

      cy.postProduct(tokenAdmin, produto).then(newProduct => {
        productId = newProduct.body._id
      })
    })

    cy.getToken({ administrador: false }).then(resToken => {
      token = resToken

      cy.get('@userId').then(userId => {
        user = userId.body._id
      })
    })
  })

  after('Deletar dados', () => {
    cy.buyItOrNot(token, 'concluir-compra')
    cy.deleteProduct(tokenAdmin, productId)
    cy.deleteUser(user)
    cy.deleteUser(admin)
  })

  it('Cadastrar um carrinho', { tags: '@user' }, () => {
    cy.postCart(token, productId).should(res => {
      ServerestResponses.successful(res)
      cy.contractValidation(res, 'POST/carrinhos', 200)
    })
  })
  
  it('Não deve cadastrar mais de um carrinho por usuário', () => {
    cy.postCart(token, productId).should(res => {
      ServerestResponses.justOneCart(res)
      cy.contractValidation(res, 'POST/carrinhos', 400)
    })
  })

  it('Não deve cadastrar carrinho com id de produto inválido', () => {
    cy.buyItOrNot(token, 'concluir-compra')
    cy.postCart(token, faker.random.uuid()).should(res => {
      ServerestResponses.notFound(res)
      cy.contractValidation(res, 'POST/carrinhos', 400)
    })
  })
})

