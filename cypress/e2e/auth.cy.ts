describe("Grab Notes App", () => {
  const dummyAcc = {
    email: "salt22@gmail.com",
    password: "salt1234",
  };
  const newAcc = {
    email: `salt${Math.floor(Math.random() * 1000) + new Date().getTime()}@gmail.com`,
    password: `salt${Math.floor(Math.random() * 1000) + new Date().getTime()}`,
  };
  context("Authentication Tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Allows user to login", () => {
      cy.get("[data-cy='login-btn']").click();
      cy.location("pathname").should("eq", "/auth");

      cy.get("input[name=email]").type(dummyAcc.email);
      cy.get("input[name=password]").type(dummyAcc.password);
      cy.get("[data-cy='auth-submit-btn']").click();
      cy.location("pathname").should("eq", "/");
      cy.get("h1").should("contain", "Grab Notes").end();
    });

    it("Allows user to register", () => {
      cy.get("[data-cy='login-btn']").click();
      cy.location("pathname").should("eq", "/auth");

      cy.get("[data-cy='auth-state-change-btn']").click();
      cy.get("input[name=email]").type(newAcc.email);
      cy.get("input[name=password]").type(newAcc.password);

      cy.get("[data-cy='auth-submit-btn']").click();
      cy.location("pathname").should("eq", "/");

      cy.get("h1").should("contain", "Grab Notes").end();

      cy.get("[data-cy='settings-btn']").click();
      cy.location("pathname").should("eq", "/settings");

      cy.get("[data-cy='logout-btn']").click();
      cy.location("pathname").should("eq", "/");

      cy.get("[data-cy='login-btn']").click();
      cy.location("pathname").should("eq", "/auth");

      cy.get("input[name=email]").type(newAcc.email);
      cy.get("input[name=password]").type(newAcc.password);
      cy.get("[data-cy='auth-submit-btn']").click().end();
    });
  });

  context("Notes Tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Allows user to create a note", () => {
      cy.get("[data-cy='login-btn']").click();
      cy.get("input[name=email]").type(dummyAcc.email);
      cy.get("input[name=password]").type(dummyAcc.password);

      cy.get("[data-cy='auth-submit-btn']").click();
      cy.location("pathname").should("eq", "/");

      cy.get("[data-cy='notes-btn']").click();
      cy.location("pathname").should("eq", "/notes");

      cy.get("[data-cy='create-note-page-btn']").click();
      cy.wait(3000);
      cy.location("pathname").should("eq", "/notes/create").end();

      const title = "Test Note" + new Date().getTime().toString();
      const content = "This is a test note" + new Date().getTime().toString();

      cy.get("[data-cy='note-title-input']").type(title);
      cy.get("[data-cy='note-content-input']").type(content);
      cy.get("[data-cy='note-submit-btn']").click();
      cy.location("pathname").should("eq", "/notes");
      cy.get("body").should("contain", title);
      cy.get("body").should("contain", content).end()
    });
  });
});
