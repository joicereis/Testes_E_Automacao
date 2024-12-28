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
        criarTransacao("Frelancer", "250.00");
        cy.get('tbody tr td.description').should("have.text", "Frelancer");
    });

    it('Cadastrar uma saída', () => {
        criarTransacao("Cinema", "-65.59");
        cy.get('tbody tr td.description').should("have.text", "Cinema");
    });

    it.only('Excluir transação', () => {
        //deve se criar a linha nesse teste para que seja possível localizá-la
        criarTransacao("Frelancer", "250.00");
        criarTransacao("PetSitter", "40.00");

        /*
        //depois de criada a linha, é possível encontrá-la através de um seletor que nesse caso foi o .description que possua o texto "Frelancer"
        cy.contains(".description", "Frelancer")
            .parent() //método que permite encontrar o elemento pai do elemento localizado anteriormente
            .find('img').click(); ////método que permite buscar por um emelento 'img'

        cy.get('tbody tr').should("have.length", 1);
        cy.get('tbody tr td.description').should("have.text", "PetSitter");
        */

        //OUTRA FORMA DE LOCALIZAR SERIA PELOS ELEMENTOS DE MESMO NÍVEL
        cy.contains(".description", "Frelancer")
            .siblings() //encontra elementos de mesmo nível
            .children('img') //dentro desses elementos de mesmo nível, vai buscar pelo "filho" 'img'
            .click();

        cy.get('tbody tr').should("have.length", 1);
        cy.get('tbody tr td.description').should("have.text", "PetSitter");
    });
});

function criarTransacao( descricao, valor){
    cy.contains("Nova Transação").click();
    cy.get('#description').type(descricao);
    cy.get('#amount').type(valor);
    cy.get('#date').type("2024-12-01"); //YYYY-mm-dd
    cy.contains('button', 'Salvar').click();
}
