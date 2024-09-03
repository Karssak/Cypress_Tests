describe("Login testing", () => {
  const validUsername = "standard_user";
  const validPassword = "secret_sauce";

  const invalidUsername = "invalid_user";
  const invalidPassword = "123";

  beforeEach(() => {
    cy.visit("/");
  });

  it("Login page loads without errors", () => {
    cy.get("form").should("be.visible");
  });

  it("Valid login", () => {
    cy.login(validUsername, validPassword);
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_list").should("be.visible");
  });

  it("Invalid login", () => {
    cy.login(invalidUsername, invalidPassword);
    cy.get(".error-message-container")
      .should("be.visible")
      .find('h3[data-test="error"]')
      .should(
        "contain.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });

  // Extra

  it("Login without a username", () => {
    cy.get("#login-button").click();
    cy.get(".error-message-container")
      .should("be.visible")
      .find('h3[data-test="error"]')
      .should("contain.text", "Epic sadface: Username is required");
  });

  it("Login without a password", () => {
    cy.get("#user-name").type(validUsername);
    cy.get("#login-button").click();
    cy.get(".error-message-container")
      .should("be.visible")
      .find('h3[data-test="error"]')
      .should("contain.text", "Epic sadface: Password is required");
  });

  it("Login bypass (inventory)", () => {
    cy.visit("/inventory.html", { failOnStatusCode: false });
    cy.get(".error-message-container")
      .should("be.visible")
      .find('h3[data-test="error"]')
      .should(
        "contain.text",
        "Epic sadface: You can only access '/inventory.html' when you are logged in."
      );
  });

  it("Login bypass (cart)", () => {
    cy.visit("/cart.html", { failOnStatusCode: false });
    cy.get(".error-message-container")
      .should("be.visible")
      .find('h3[data-test="error"]')
      .should(
        "contain.text",
        "Epic sadface: You can only access '/cart.html' when you are logged in."
      );
  });

  it("Login bypass (checkout)", () => {
    cy.visit("/checkout-complete.html", { failOnStatusCode: false });
    cy.get(".error-message-container")
      .should("be.visible")
      .find('h3[data-test="error"]')
      .should(
        "contain.text",
        "Epic sadface: You can only access '/checkout-complete.html' when you are logged in."
      );
  });
});
