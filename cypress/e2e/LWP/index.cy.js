//This is used for cypres test scenerio
describe('Test DuckDuckGo search', () => {    

    it('Confirm user can visit DuckDuckGo.com', () => {    
        cy.visit('https://duckduckgo.com/');
        cy.contains('Switch to DuckDuckGo').should('be.visible');
        cy.get('#searchbox_input').type('What is LearnWithPride? {enter}');
        cy.title().should('include', 'What is LearnWithPride? at DuckDuckGo');
    })

})