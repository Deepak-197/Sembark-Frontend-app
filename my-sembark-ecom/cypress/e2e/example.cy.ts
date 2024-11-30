import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Replace with your app's URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



describe('E-Commerce Application Tests', () => {
  
  // Testing the Home Page
  describe('Home Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display the product grid with at least one product', () => {
      cy.get('.product-card').should('have.length.greaterThan', 0);
    });

    it('should filter products by category', () => {
      cy.get('button').contains('electronics').click();
      cy.get('.product-category').each(($el) => {
        expect($el.text().toLowerCase()).to.eq('electronics');
      });
    });

    it('should sort products by price in descending order', () => {
      cy.get('.sort-button').click();
      let lastPrice = Infinity;
      cy.get('.product-price').each(($el) => {
        const price = parseFloat($el.text().replace('$', ''));
        expect(price).to.be.lte(lastPrice);
        lastPrice = price;
      });
    });

    it('should navigate to the product details page when clicking a product', () => {
      cy.get('.product-card').first().click();
      cy.url().should('include', '/product/');
      cy.get('.product-title').should('exist');
    });
  });

  // Testing the Product Details Page
  describe('Product Details Page Tests', () => {
    beforeEach(() => {
      cy.visit('/product/1'); // Replace with a valid product ID
    });

    it('should display product details', () => {
      cy.get('.product-title').should('exist');
      cy.get('.product-description').should('exist');
      cy.get('.product-price').should('exist');
    });

    it('should allow adding a product to the cart', () => {
      cy.get('button').contains('Add to Cart').click();
      cy.get('.cart-icon').click();
      cy.get('.cart-item').should('have.length', 1);
    });

    it('should display a loading message while fetching product details', () => {
      cy.intercept('GET', '**/products/*', { delay: 200 }).as('fetchProduct');
      cy.visit('/product/1');
      cy.get('.loading').should('exist');
      cy.wait('@fetchProduct');
    });

    it('should navigate back to the home page', () => {
      cy.get('button').contains('Back to Home').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  // Testing the Cart Page
  describe('Cart Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.product-card').first().click();
      cy.get('button').contains('Add to Cart').click();
      cy.get('.cart-icon').click();
    });

    it('should display added products in the cart', () => {
      cy.get('.cart-item').should('have.length', 1);
    });

    it('should remove a product from the cart', () => {
      cy.get('.cart-item button').contains('Remove').click();
      cy.get('.cart-item').should('have.length', 0);
    });

    it('should display the correct total price', () => {
      cy.get('.total-price').should(($total) => {
        const price = parseFloat($total.text().replace('Total: $', ''));
        expect(price).to.be.greaterThan(0);
      });
    });

    it('should navigate to the payment process when clicking Pay Now', () => {
      cy.get('button').contains('Pay Now').click();
      cy.url().should('include', '/payment');
    });
  });
});
