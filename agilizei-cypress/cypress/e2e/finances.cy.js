describe('Transações', () => {

    //hooks - trechos de códigos que devem ser executados antes ou depois de cada ou de todos os testes
    //before
    //after
    //beforeEach - executa antes de cada teste
    //afterEach - executa depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
    });

    it('Cadastrar uma entrada', () => {
        criarTransacao("Frelancer Programação", "250.00");
        cy.get("tbody tr td.description").should("have.text", "Frelancer Programação");
    });

    it('Cadastrar uma saída', () => {
        criarTransacao("Cinema", "-65.59");
        cy.get("tbody tr td.description").should("have.text", "Cinema");
    });
});

function criarTransacao( descricao, valor){
    cy.contains("Nova Transação").click();
    cy.get('#description').type(descricao);
    cy.get('#amount').type(valor);
    cy.get('#date').type("2024-12-01"); //YYYY-mm-dd
    cy.contains('button', 'Salvar').click();
}