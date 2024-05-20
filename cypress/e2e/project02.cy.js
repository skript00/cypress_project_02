describe("Login Automation Tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit("https://www.techglobal-training.com/frontend/");
    cy.clickCard("Login Function");
  });

  it("Test Case 01 - Validate the login form", () => {});

  it("Test Case 02 - Validate the valid login", () => {});

  it("Test Case 03 - Validate the logout", () => {});

  it.only("Test Case 04 - Validate the Forgot Password? Link and Reset Password modal", () => {
    cy.get('#login_btn').next().click()
    cy.get('#modal_title, .delete, #email, #submit').each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    cy.get('[for="email"]').should('have.text', "Enter your email address and we'll send you a link to reset your password. ")
    cy.get('#submit').should('be.enabled').and('have.text', 'SUBMIT')
  });

  it("Test Case 05 - Validate the Reset Password modal close button", () => {});

  it("Test Case 06 - Validate the Reset Password form submission", () => {});

  it("Test Case 07 - Validate the invalid login with empty credentials", () => {});

  it("Test Case 08 - Validate the invalid login with the wrong username", () => {});

  it("Test Case 09 - Validate the invalid login with the wrong password", () => {});

  it("Test Case 10 - Validate the invalid login with the wrong username and password", () => {});
});