# Cypress Tests

This repository contains end-to-end (E2E) tests written using Cypress.js. Made by Karssak (Yehor Riabtsev). </br>
Also, bonus tests were made, which were not in the technical specification. </br>


## Table of Contents

- [Installation](#installation)
- [Test Scenarios](#test-scenarios)
  - [Login testing](#login-testing)
  - [Inventory Page Testing](#inventory-page-testing)
  - [Checkout Testing](#checkout-testing)
- [Custom Commands](#custom-commands)

## Installation

```bash
git clone https://github.com/Karssak/Cypress_Tests

cd Cypress_Tests

npm install

npx cypress open
```

**I advise using Electron for tests**

## Test Scenarios

### Login Testing (Login.cy.js)

- Login page loads without errors
- Valid login
- Invalid login
- Login without a username [Bonus]
- Login without a password [Bonus]
- Login bypass attempts [Bonus]

### Inventory Page Testing (Inventory.cy.js)

- Add items to cart
- Check items in the cart
- Logout
- Check sorting [Bonus]

### Checkout Testing (Checkout.cy.js)

- Check items in checkout
- Check total price
- Check final checkout
- Check checkout information imput [Bonus]

## Custom Commands

- Login
- Add to cart
