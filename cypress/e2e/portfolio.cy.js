/// <reference types="cypress" />

describe('example to-do app', () => {

    // beforeAll(() => {

    //     cy.visit('http://127.0.0.1:5501/');

    // })

    it('Sélection des filtres', () => {

        cy.visit('http://127.0.0.1:5501/');

        cy.get('div.filtre-btn').eq(0).should('be.visible').click();
        cy.get('figure').then(($el) => {
            Cypress.dom.isVisible($el)
        })
        cy.get('div.filtre-btn').eq(1).should('be.visible').click();
        cy.get('figure').then(($el) => {
            Cypress.dom.isVisible($el)
        })
        cy.get('div.filtre-btn').eq(2).should('be.visible').click();
        cy.get('figure').then(($el) => {
            Cypress.dom.isVisible($el)
        })
        cy.get('div.filtre-btn').eq(3).should('be.visible').click();
        cy.get('figure').then(($el) => {
            Cypress.dom.isVisible($el)
        })

    });

    it('Identification', () => {

        cy.visit('http://127.0.0.1:5501/login.html');

        cy.get('#email').should('be.visible').type("sophie.bluel@test.tld");
        cy.get('#password').should('be.visible').type("S0phie");
        cy.get("input").eq(2).should('be.visible').click();

        cy.get('span.edition-boutton').eq(0).should('be.visible').click();

        cy.get('span.modal-btnAjouter').eq(0).should('be.visible').click();

        cy.get('label').contains('+ Ajouter photo').should('be.visible').click();

        cy.get('input[type=file][id=myFile]').should('not.be.visible').selectFile('./assets/images/abajour-tahina.png', {
            force: true
        })

        cy.get('#myTitle').should('be.visible').type("Lampe");

        cy.get('.modalAdd-submit').eq(0).should('be.visible').click();

        cy.wait(2500)

        cy.get(".fa-trash").last().should('be.visible').click();
        
        cy.wait(2500)

        cy.pause()

    });

})