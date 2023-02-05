describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  afterEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Allows user to login", () => {
    const dummyAcc = {
      email: "salt22@gmail.com",
      password: "salt1234",
    };

    cy.get("[data-cy='login-btn']").click();
    cy.get("input[name=email]").type(dummyAcc.email);
    cy.get("input[name=password]").type(dummyAcc.password);
    cy.get("[data-cy='auth-submit-btn']").click();
    cy.get("h1").should("contain", "Grab Notes").end();
  });

  it("Allows user to register", () => {
    const newAcc = {
      email: `salt${Math.floor(Math.random() * 1000) + new Date().getTime()}@gmail.com`,
      password: `salt${Math.floor(Math.random() * 1000) + new Date().getTime()}`,
    };

    cy.get("[data-cy='login-btn']").click();
    cy.get("[data-cy='auth-state-change-btn']").click();
    cy.get("input[name=email]").type(newAcc.email);
    cy.get("input[name=password]").type(newAcc.password);
    cy.get("[data-cy='auth-submit-btn']").click();

    cy.get("h1").should("contain", "Grab Notes").end();
    cy.wait(5000);
    cy.get("[data-cy='settings-btn']").click();

    cy.get("[data-cy='logout-btn']").click();
    cy.wait(3000);
    cy.get("[data-cy='login-btn']").click();
    cy.get("input[name=email]").type(newAcc.email);
    cy.get("input[name=password]").type(newAcc.password);
    cy.get("[data-cy='auth-submit-btn']").click().end();
  });
});
