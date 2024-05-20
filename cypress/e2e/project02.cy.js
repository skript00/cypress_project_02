describe("Login Automation Tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit("https://www.techglobal-training.com/frontend/");
    cy.clickCard("Login Function");
  });

  const validLogin = ["TechGlobal", "Test1234"];
  const testCaseDataEightToTen = [ // 3 objects within an array to use .forEach function on test cases 8-10
    {
      description: "Validate the invalid login with the wrong username",
      user: "John",
      pass: "Test1234",
      message: "Invalid Username entered!",
    },
    {
      description: "Validate the invalid login with the wrong password",
      user: "TechGlobal",
      pass: "1234",
      message: "Invalid Password entered!",
    },
    {
      description: "Validate the invalid login with the wrong username and password",
      user: "John",
      pass: "1234",
      message: "Invalid Username entered!",
    },
  ];

  const loginFormTest = (user, pass) => {
    cy.get('#username').clear().type(user);
    cy.get('#password').clear().type(pass);
    cy.get('#login_btn').click();
  };


  it("Test Case 01 - Validate the login form", () => {
    cy.get('#username, #password, #login_btn').each(($el) => { 
      cy.wrap($el).should('be.visible');
    });

    cy.get('#username, #password').each(($el) => {
      cy.wrap($el).should('not.have.attr', 'required');
    });

    const labelText = ['Please enter your username', 'Please enter your password'];
    cy.get('[for="username"], [for="password"]').each(($el, index) => {
      cy.wrap($el).should('have.text', labelText[index]);
    });

    cy.get('#login_btn').should('be.enabled').and('have.text', 'LOGIN')
      .next().should('be.visible')  // navigating to "Forgot Password?" link locator
      .and('have.attr', 'href', '/frontend/project-2')
        //alternative is clicking link and asserting new element is visible
      .and('have.text', 'Forgot Password?');
  });

  it("Test Case 02 - Validate the valid login", () => {

    loginFormTest(validLogin[0], validLogin[1]); // running function (line 30) with login credentials
    cy.get('#success_lgn').should('be.visible');
    cy.get('#logout').should('be.visible').and('have.text', 'LOGOUT');
  });

  it("Test Case 03 - Validate the logout", () => {
    loginFormTest(validLogin[0], validLogin[1]); // running function (line 30) with login credentials
    cy.get('#logout').click();
    cy.get('.LoginForm_content__GphXn').should('be.visible'); // validating login form is visible again
  });

  it("Test Case 04 - Validate the Forgot Password? Link and Reset Password modal", () => {
    cy.get('#login_btn').next().click(); // clicking "Forgot Password?" link
    cy.get('#modal_title, .delete, #email, #submit').each(($el) => {
      cy.wrap($el).should('be.visible');
    })
    cy.get('[for="email"]').should('have.text', "Enter your email address and we'll send you a link to reset your password. ");
    cy.get('#submit').should('be.enabled').and('have.text', 'SUBMIT');
  });

  it("Test Case 05 - Validate the Reset Password modal close button", () => {
    cy.get('#login_btn').next().click();
    cy.get('#sub_heading').should('be.visible');
    cy.get('.delete').click().then(() => {
      cy.get('.modal-card').should('not.exist') 
        // ask why not.be.visible didn't work & why putting the assertion inside a .then() is better
    })
  });

  it("Test Case 06 - Validate the Reset Password form submission", () => {
    cy.get('#login_btn').next().click();
    cy.get('#email').type('info@techglobalschool.com');
    cy.get('#submit').click();
    cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.');
  });

  it("Test Case 07 - Validate the invalid login with empty credentials", () => {
    cy.get('#login_btn').click();
    cy.get('#error_message').should('have.text', 'Invalid Username entered!');
  });


  testCaseDataEightToTen.forEach((test, index) => {
    it(`Test Case ${index === 2 ? '' : 0}${index + 8} - ${test.description}`, () => {

      loginFormTest(test.user, test.pass);
      cy.get('#error_message').should('have.text', `${test.message}`);
    });
  });


});


/*
  it("Test Case 08 - Validate the invalid login with the wrong username", () => {});

  it("Test Case 09 - Validate the invalid login with the wrong password", () => {});

  it("Test Case 10 - Validate the invalid login with the wrong username and password", () => {});

*/
