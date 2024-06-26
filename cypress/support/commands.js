// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add("clickCard", (link) => {
  cy.get(".cards").contains(link).click();
});

Cypress.Commands.add("selectDropdownOption", (element, option) => {
  cy.get(element).select(option);
});

Cypress.Commands.add("login", (user, pass) => {
  cy.get('#username').type(user);
  cy.get('#password').type(pass);
  cy.get("login_btn").click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })