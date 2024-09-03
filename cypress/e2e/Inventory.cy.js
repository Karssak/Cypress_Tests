describe("Inventory page testing", () => {
  const validUsername = "standard_user";
  const validPassword = "secret_sauce";

  beforeEach(() => {
    cy.visit("/");
    cy.login(validUsername, validPassword);
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_list").should("be.visible");
  });

  it("Add items to cart", () => {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    cy.addToCart(["sauce-labs-backpack", "sauce-labs-bike-light"]);
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");
  });

  it("Check items in the cart", () => {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    cy.addToCart(["sauce-labs-backpack", "sauce-labs-bike-light", "sauce-labs-onesie"]);
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get(".cart_item").should("have.length", 3);
    cy.get(".cart_item").eq(0).should("contain.text", "Sauce Labs Backpack");
    cy.get(".cart_item").eq(1).should("contain.text", "Sauce Labs Bike Light")  ;
  });

  it("Logout", () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.url().should("include", "/");
    cy.get('[data-test="username"]').should("be.visible");
  });

  // Extra

  it("Check sorting", () => {
    cy.get('[data-test="product-sort-container"]').select("az");
    cy.get(".inventory_item_name").then((items) => {
      const itemNames = [...items].map((item) => item.innerText);
      const sortedNames = [...itemNames].sort();
      expect(itemNames).to.deep.equal(sortedNames);
    });

    cy.get('[data-test="product-sort-container"]').select("za");
    cy.get(".inventory_item_name").then((items) => {
      const itemNames = [...items].map((item) => item.innerText);
      const sortedNames = [...itemNames].sort().reverse();
      expect(itemNames).to.deep.equal(sortedNames);
    });

    cy.get('[data-test="product-sort-container"]').select("lohi");
    cy.get(".inventory_item_price").then((items) => {
      const prices = [...items].map((item) =>
        parseFloat(item.innerText.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });

    cy.get('[data-test="product-sort-container"]').select("hilo");
    cy.get(".inventory_item_price").then((items) => {
      const prices = [...items].map((item) =>
        parseFloat(item.innerText.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });
});
