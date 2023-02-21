const faker = require('faker-br')

export default class Factory {

static newUser() {
  return {
    nome: faker.name.findName(),
    email: 'testing.'+faker.internet.email(),
    password: faker.internet.password(),
    administrador: `${faker.random.boolean()}`
  }
  }

static newProduct() {
  return {
    nome: faker.commerce.productName()+' (testing)',
    preco: faker.commerce.price(),
    descricao: faker.commerce.productAdjective(),
    quantidade: faker.random.number()
  }
}
}
