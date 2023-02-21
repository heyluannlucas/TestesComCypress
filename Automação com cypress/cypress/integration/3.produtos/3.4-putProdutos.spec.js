/// <reference types="cypress" />

const faker = require('faker-br')
import ServerestResponses from '../../services/responsesValidation.services'
import Factory from '../../fixtures/Factory'

describe('CT-RP 009 - ALTERAÇÃO DE DADOS EM /PRODUTOS',() => {

  let tokenAdmin, productId, admin ,token ,user ,produto = Factory.newProduct()

  before('Dados necessários', () => {

    cy.getToken({ administrador: true }).then(token => {
      tokenAdmin = token

      cy.get('@userId').then(admId => {
        admin = admId.body._id

        cy.postProduct(tokenAdmin, produto).then(produto => {
          productId = produto.body._id
        })
      })
    })

    cy.getToken({ administrador: false }).then(normalUser => {
      token = normalUser

      cy.get('@userId').then(userId => {
        user = userId.body._id
      })
    })
  })

  after('Deletar dados', () => {
    cy.deleteProduct(tokenAdmin, productId)
    cy.deleteUser(admin)
    cy.deleteUser(user)
  })

  it('Deve atualizar nome de um produto', { tags: '@adm' }, () => {

    produto.nome = faker.commerce.productName()

    cy.putProduct(tokenAdmin, productId, produto).should(res => {
      ServerestResponses.newData(res)
      cy.contractValidation(res, 'PUT/produtos', 200)
    })
  })

  it('Não deve atualizar dados de um produto com nome existente', () => {

    cy.getAllProducts().then(allProdutcs => {
      produto.nome = allProdutcs.body.produtos[0].nome
    })
    cy.putProduct(tokenAdmin, productId, produto).should(res => {
      ServerestResponses.productAlreadyExist(res)
      cy.contractValidation(res, 'PUT/produtos', 400)
    })
  })

  it('Não deve atualizar dados de produtos sem token de adm', () => {

    cy.putProduct(faker.random.uuid(), productId, produto).should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'PUT/produtos', 401)
    })
  })

  it('Não deve atualizar dados de produtos com token vazio', () => {
    cy.putProduct('', productId, produto).should(res => {
      ServerestResponses.notAccess(res)
      cy.contractValidation(res, 'PUT/produtos', 401)
    })
  })

  it('Não deve atualizar dados de produtos com usuario padrão', () => {
    cy.putProduct(token, productId, produto).should(res => {
      ServerestResponses.notAdm(res)
      cy.contractValidation(res, 'PUT/produtos', 403)
    })
  })
})

