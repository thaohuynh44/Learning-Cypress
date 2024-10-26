/// <reference types="cypress" />

Cypress.Commands.add("openHomePage", () => {
  cy.visit("/");
});
