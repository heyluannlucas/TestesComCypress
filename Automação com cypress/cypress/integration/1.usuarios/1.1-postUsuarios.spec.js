/// <reference types="cypress" />

import ServerestResponses from '../../services/responsesValidation.services'
import Factory from '../../fixtures/Factory'

describe('CT-RU 001 - INSERÇÃO DE DADOS EM /USUÁRIOS',() => {

  let newUser = Factory.newUser()

  it('Cadastrar um novo usuário com sucesso', { tags: ['@adm', '@user'] }, () => {
    cy.postUser(newUser).as('id').should(res => {
      ServerestResponses.successful(res)
      cy.contractValidation(res, 'POST/usuarios', 201)
    })
    cy.get('@userId').then(id => {
      cy.deleteUser(id.body._id)
    })
  })

  it('Não deve cadastrar com email já existente', () => {

    cy.postUser(newUser).as('firstUser')

    cy.postUser(newUser).should(res => {
      ServerestResponses.unsuccessful(res)
      cy.contractValidation(res, 'POST/usuarios', 400)
    })
    cy.get('@firstUser').then(id => {
      cy.deleteUser(id.body._id)
    })
  })

  it('Não deve cadastrar usuário sem email', () => {

    delete newUser.email

    cy.postUserCodeTrue(newUser)
  })

  it('Não deve cadastrar usuário sem nome', () => {

    delete newUser.nome

    cy.postUserCodeTrue(newUser)
  })

  it('Não deve cadastrar usuário sem senha', () => {

    delete newUser.password

    cy.postUserCodeTrue(newUser)
  })

  it('Não deve cadastrar usuário sem informar administrador', () => {

    delete newUser.administrador

    cy.postUserCodeTrue(newUser)
  })

  it('Não deve cadastrar usuário sem nenhuma informação passada', () => {

    newUser = {}

    cy.postUserCodeTrue(newUser)
  })
})

