
export default class ServerestResponses {

    static successful(res) {
        expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static unsuccessful(res) {
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
    }
   
    static obligatoryEmail(res) {
        expect(res.body.email).to.be.eq('email é obrigatório')
    }
    
    static obligatoryName(res) {
        expect(res.body.nome).to.be.eq('nome é obrigatório')
    }
   
    static obligatoryPassword(res) {
        expect(res.body.password).to.be.eq('password é obrigatório')
    }
    
    static obligatoryAdm(res) {
        expect(res.body.administrador).to.be.eq('administrador é obrigatório')
    }

    static invalidEmail(res) {
        expect(res.body.email).to.be.eq('email deve ser um email válido') 
    }

    static nullEmail(res){
        expect(res.body.email).to.be.equal('email não pode ficar em branco')
    }

    static nullPassword(res){
        expect(res.body.password).to.be.equal('password não pode ficar em branco')
    }

    static obligatoryInfos(res) {
        expect(res.body.nome).to.be.eq('nome é obrigatório')
        expect(res.body.email).to.be.eq('email é obrigatório')
        expect(res.body.password).to.be.eq('password é obrigatório')
        expect(res.body.administrador).to.be.eq('administrador é obrigatório')
    }
   
    static userById(res, allUsers) {
        expect(res.body.nome).to.be.eq(allUsers.body.usuarios[0].nome)
        expect(res.body.email).to.be.eq(allUsers.body.usuarios[0].email)
        expect(res.body.password).to.be.eq(allUsers.body.usuarios[0].password)
        expect(res.body.administrador).to.be.eq(allUsers.body.usuarios[0].administrador)
    }

    static cartById(res, id) {
        expect(res.body.precoTotal).to.be.eq(id.body.carrinhos[0].precoTotal)
        expect(res.body.quantidadeTotal).to.be.eq(id.body.carrinhos[0].quantidadeTotal)
        expect(res.body.idUsuario).to.be.eq(id.body.carrinhos[0].idUsuario)
        expect(res.body._id).to.be.eq(id.body.carrinhos[0]._id)
    }

    static productById(res, products) {
        expect(res.body.nome).to.be.eq(products.body.produtos[0].nome)
        expect(res.body.preco).to.be.eq(products.body.produtos[0].preco)
        expect(res.body.descricao).to.be.eq(products.body.produtos[0].descricao)
        expect(res.body.quantidade).to.be.eq(products.body.produtos[0].quantidade)
    }
    
    static successfulLogin(res) {
        expect(res.body.message).to.be.equal('Login realizado com sucesso')
    }

    static invalidLoginInfos(res) {
        expect(res.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    static invalidSearch(res) {
        expect(res.body.message).to.be.eq('Usuário não encontrado')
    }

    static newData(res) {
        expect(res.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static deleted(res) {
        expect(res.body.message).to.be.eq('Registro excluído com sucesso')
    
    }
    static noData(res) {
        expect(res.body.message).to.be.eq('Nenhum registro excluído')
    }

    static notAccess(res) {
        expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static productAlreadyExist(res) {
        expect(res.body.message).to.be.eq('Já existe produto com esse nome')
    }

    static notAdm(res){
        expect(res.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static deleteAndReturnProducts(res) {
        expect(res.body.message).to.be.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
    }

    static noCart(res) {
        expect(res.body.message).to.be.eq('Carrinho não encontrado')
    }

    static deleteProductNotAllowed(res) {
        expect(res.body.message).to.be.eq('Não é permitido excluir produto que faz parte de carrinho')
    }
    
    static deleteUserNotAllowed(res) {
        expect(res.body.message).to.be.eq('Não é permitido excluir usuário com carrinho cadastrado')
    }

    static justOneCart(res){
        expect(res.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
    }
    
    static notFound(res){
        expect(res.body.message).to.be.eq('Produto não encontrado')
    }
}