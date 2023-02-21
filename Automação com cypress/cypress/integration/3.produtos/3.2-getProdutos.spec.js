/// <reference types="cypress" />

import faker from 'faker-br'
import ServerestResponses from '../../services/responsesValidation.services'

describe('CT-RP 007 -  CONSULTA DE DADOS EM /PRODUTOS',() => {

  it('Deve buscar por todos os produtos', { tags: ['@adm', '@user'] }, () => {
    cy.getAllProducts().should(res => {
      cy.contractValidation(res, 'GET/produtos', 200)
      expect(res.body.quantidade).to.be.greaterThan(0)
    })
  })

  it('Deve buscar produtos por id', { tags: ['@adm', '@user'] }, () => {

    cy.getAllProducts().then(allProducts => {

      cy.getProductById(allProducts.body.produtos[0]._id).should(id => {
        ServerestResponses.productById(id, allProducts)
        cy.contractValidation(id, 'GET/produtos', '200-byID')
      })
    })
  })

  it('Deve buscar produto por id inválido', { tags: ['@adm', '@user'] }, () => {
      cy.getProductById(faker.random.uui).should(res => {
        ServerestResponses.notFound(res)
        cy.contractValidation(res, 'GET/produtos', 400)
      })
    })
  })
