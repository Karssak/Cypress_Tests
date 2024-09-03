describe("Checkout testing", () => {
  const validUsername = "standard_user";
  const validPassword = "secret_sauce";

  const firstName = "John";
  const lastName = "Doe";
  const postalCode = "12345";

  beforeEach(() => {
    cy.visit("/");
    cy.login(validUsername, validPassword);
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_list").should("be.visible");
    cy.addToCart(["sauce-labs-bike-light", "sauce-labs-fleece-jacket"]);
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);

    cy.get('[data-test="continue"]').click();
  });

  it("Check items in checkout", () => {
    cy.get(".cart_item").should("have.length", 2);
    cy.get(".cart_item").eq(0).should("contain.text", "Sauce Labs Bike Light");
    cy.get(".cart_item")
      .eq(1)
      .should("contain.text", "Sauce Labs Fleece Jacket");
  });

  it("Check total price", () => {
    cy.get('[data-test="subtotal-label"]')
      .invoke("text")
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace("Item total: $", ""));
        cy.get('[data-test="tax-label"]')
          .invoke("text")
          .then((taxText) => {
            const tax = parseFloat(taxText.replace("Tax: $", ""));
            const expectedTotal = subtotal + tax;
            cy.get('[data-test="total-label"]')
              .invoke("text")
              .then((totalText) => {
                const total = parseFloat(totalText.replace("Total: $", ""));
                expect(total).to.be.closeTo(expectedTotal, 0.01);
              });
          });
      });
  });

  it("Check final checkout", () => {
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should(
      "contain.text",
      "Thank you for your order!"
    );
    cy.get(".complete-text").should(
      "contain.text",
      "Your order has been dispatched"
    );
    cy.get('[data-test="back-to-products"]').should("be.visible");
  });

  // Extra

  it("Checkout without a first name", () => {
    cy.go('back');

    cy.get('[data-test="continue"]').click();
    cy.get(".error-message-container")
    .should("be.visible")
    .find('h3[data-test="error"]')
    .should(
      "contain.text",
      "Error: First Name is required"
    );
  });


  it("Checkout without a last name", () => {
    cy.go('back');

    cy.get('[data-test="firstName"]').type(firstName);

    cy.get('[data-test="continue"]').click();
    cy.get(".error-message-container")
    .should("be.visible")
    .find('h3[data-test="error"]')
    .should(
      "contain.text",
      "Error: Last Name is required"
    );
  });

  it("Checkout without a zip-code", () => {
    cy.go('back');

    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);

    cy.get('[data-test="continue"]').click();
    cy.get(".error-message-container")
    .should("be.visible")
    .find('h3[data-test="error"]')
    .should(
      "contain.text",
      "Error: Postal Code is required"
    );
  });
});
