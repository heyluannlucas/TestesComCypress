import Ajv from "ajv"
const ajv = new Ajv({ allErrors: true, verbose: true, strict: false })

Cypress.Commands.add('contractValidation', (res, schema, status) => {
    cy.fixture(`schemas/${schema}/${status}.json`).then(schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if (!valid) {
            var errors = ''
            for (let each in validate.errors) {
                let erro = validate.errors[each]
                errors += `\n${erro.instancePath} ${erro.message}, but received ${typeof erro.data}`
            }
            throw new Error('Erros encontrados na validação de contrato: ' + errors)
        }
        return cy.log('Contrato válido!')
    })
})

