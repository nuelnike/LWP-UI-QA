describe('Test User Logins', () => {

    it('Confirm user can login using the Standard User Details', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    })

    it('Confirm user cannot login using the Locked Out User Details', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('locked_out_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.contains('Sorry, this user has been locked out.')
        .should('be.visible');
    })
  
    it('Confirm user cannot login using Problem User Details', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('problem_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');

        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('#remove-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

    });

});


describe('End To End Item Purchase.', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    });

    it('Confirm user can add and remove an item from the cart successfully', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('#remove-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-backpack').should('be.visible');
    });


    it('Confirm user can add item to the cart and navigate to the cart page.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        
    });


    it('Confirm user can remove item from the cart page.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get("#remove-sauce-labs-backpack").click();
        cy.get('.cart_item').should('not.exist');
        
    });


    it('Confirm user can navigate to the checkout page.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');
        
    });


    it('Confirm user cannot continue to the final checkout page without filling up their bio data.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');

        cy.get('#continue').click();
        cy.get('.error-message-container').should('be.visible');
        cy.url().should('include', '/checkout-step-one.html');
        
    });


    it('Confirm user can continue to the final checkout page after filling up their bio data.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');

        cy.get('#first-name').type('John');
        cy.get('#last-name').type('Doe');
        cy.get('#postal-code').type('12345');
        cy.get('#continue').click();
        cy.url().should('include', '/checkout-step-two.html');
        
    });


    it('Confirm user can complete their checkout proccess.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');

        cy.get('#first-name').type('John');
        cy.get('#last-name').type('Doe');
        cy.get('#postal-code').type('12345');
        cy.get('#continue').click();
        cy.url().should('include', '/checkout-step-two.html');

        cy.get('#finish').click();
        cy.url().should('include', '/checkout-complete.html');
    });

    


    it('Confirm user can navigate back to the store page.', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');

        cy.get('#first-name').type('John');
        cy.get('#last-name').type('Doe');
        cy.get('#postal-code').type('12345');
        cy.get('#continue').click();
        cy.url().should('include', '/checkout-step-two.html');

        cy.get('#finish').click();
        cy.url().should('include', '/checkout-complete.html');

        cy.get('#back-to-products').click();
        cy.url().should('include', '/inventory.html');
    });



});